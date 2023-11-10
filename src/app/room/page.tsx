'use client'
import React, { useEffect, useState } from 'react';
import { onValue, ref, update, get, child } from 'firebase/database';
import styles from './page.module.css'

import { db } from '@/firebase';
import { Button } from '@mui/material';
import { useRoomContext } from '@/contexts/RoomContext';

interface IParticipants {
  [key: string]: number
}

const fibo = [1, 2, 3, 5, 8, 13, 21, 34]

export default function Room() {
  const [p, setP] = useState<IParticipants>({})
  const [reveal, setReveal] = useState(false)

  const [selectedCard, setSelectedCard] = useState(0)

  const { roomName, userName } = useRoomContext()

  useEffect(() => {
    const query = ref(db, 'rooms/' + roomName + '/participants');
    const query2 = ref(db, 'rooms/' + roomName + '/reveal');

    const un = onValue(query, (snapshot) => {
      const data = snapshot.val();

      setSelectedCard(data[userName])

      setP(data)
    });

    const un2 = onValue(query2, (snapshot) => {
      const data = snapshot.val();

      setReveal(data)
    });

    return () => {
      un()
      un2()
    }
  }, [roomName])

  const vote = (number: number) => {
    update(ref(db, 'rooms/' + roomName + '/participants'), {
      [userName]: number
    });
  }

  const reset = () => {
    get(child(ref(db), 'rooms/' + roomName + '/participants')).then(snapshot => {
      const data = snapshot.val()

      Object.keys(data).map(key => {
        data[key] = 0
      })

      update(ref(db, 'rooms/' + roomName + '/participants'), data);
    })
  }

  const revealInfo = (flag: boolean) => {
    update(ref(db, 'rooms/' + roomName), {
      reveal: flag
    });
  }

  return (
    <main className={styles.mainContainer}>
      <section className={styles.enterContainer}>
        <ul>
          {p && Object.keys(p).map((i, index) =>
            <li className={styles.itemList} key={index}>
              {i} {reveal ? <span style={{ marginLeft: 'auto' }}>{p[i]}</span> : p[i] === 0 ? <span style={{ marginLeft: 'auto' }}>-</span> : <div className={styles.secret}></div>}
            </li>
          )}
        </ul>
      </section>

      <section className={styles.cardsContainer}>
        {fibo.map((num, index) =>
          <div
            key={index}
            className={num === selectedCard ? styles.activeCard : styles.cards}
            onClick={() => {
              vote(num)
              setSelectedCard(num)
            }}>
            {num}
          </div>)}
      </section>
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
        <Button variant="contained" onClick={() => {
          revealInfo(false)
          setSelectedCard(0)
          reset()
        }} style={{ marginRight: '16px' }}>Nova rodada</Button>
        <Button variant="contained" onClick={() => revealInfo(true)}>Revelar</Button>
      </div>

    </main>
  )
}