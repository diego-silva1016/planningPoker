'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { TextField, Button } from '@mui/material'
import styles from './page.module.css'
import { db } from '@/firebase'
import { set, ref, update } from "firebase/database";
import { useRouter } from 'next/navigation';
import { useRoomContext } from '@/contexts/RoomContext'

interface ISectionOneProps {
  setActiveSection: Function
}

function SectionOne({ setActiveSection }: ISectionOneProps) {
  const { userName ,setUserName } = useRoomContext()

  return (
    <>
      <h2>Mix Poker Osvaldo</h2>
      <TextField
        id="outlined-basic"
        label="Digite seu nome"
        variant="outlined"
        onChange={e => setUserName(e.target.value)}
        value={userName}
      />
      <Button
        style={{ marginTop: '1rem', width: '13rem' }}
        variant="contained"
        onClick={() => setActiveSection('two')}
      >
        Prosseguir
      </Button>
    </>
  )
}

interface ISectionTwoProps {
  setIsCreate: Dispatch<SetStateAction<boolean>>
  setActiveSection: Dispatch<SetStateAction<string>>
}

function SectionTwo({ setIsCreate, setActiveSection }: ISectionTwoProps) {
  return (
    <>
      <h2>Mix Poker</h2>
      <Button style={{ marginTop: '1rem', width: '13rem' }} variant="contained" onClick={() => {
        setIsCreate(false)
        setActiveSection('three')
      }}>Entrar em uma sala</Button>
      <Button style={{ marginTop: '1rem', width: '13rem' }} variant="contained" onClick={() => {
        setIsCreate(true)
        setActiveSection('three')
      }}>Criar sala</Button>
    </>
  )
}

interface ISectionThreeProps {
  isCreate: boolean
}

function SectionThree({ isCreate }: ISectionThreeProps) {
  const { push } = useRouter();
  const { roomName ,setRoomName, userName } = useRoomContext()

  const createRoom = () => {
    set(ref(db, 'rooms/' + roomName), {
      participants: { [userName]: 0 }
    });

    push(`/room`)
  }

  const enterRoom = () => {
    update(ref(db, 'rooms/' + roomName + '/participants'), {
      [userName]: 0
    });

    push(`/room`, {

    })
  }

  return (
    <>
      <h2>Mix Poker</h2>
      <TextField
        id="outlined-basic"
        label="Digite o nome da sala"
        variant="outlined"
        onChange={e => setRoomName(e.target.value)}
        value={roomName}
      />
      <Button style={{ marginTop: '1rem', width: '13rem' }} variant="contained" onClick={isCreate ? createRoom : enterRoom}>{isCreate ? 'Criar' : 'Entrar'}</Button>
    </>
  )
}

interface ISection {
  [key: string]: JSX.Element
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('one')

  const [isCreate, setIsCreate] = useState(false)

  const sections: ISection = {
    one: <SectionOne setActiveSection={setActiveSection} />,
    two: <SectionTwo setIsCreate={setIsCreate} setActiveSection={setActiveSection}/>,
    three: <SectionThree isCreate={isCreate}/>
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.enterContainer}>
        {sections[activeSection]}
      </section>
    </main>
  )
}
