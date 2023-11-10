import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css'
import { RoomProvider } from '@/contexts/RoomContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <RoomProvider>
        <body>{children}</body>
      </RoomProvider>
    </html>
  )
}
