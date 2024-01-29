
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TagsLinks from '@/components/TagsLinks'
import Container from '@/components/Container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conecta Peças',
  description: 'Encontre as informações que necessita sobre sua peça aqui!',

}

export default function RootLayout({
  children,
}: {

  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <TagsLinks/>
      </head>

      <Container>
        {children}
      </Container>
    </html>
  )
}
