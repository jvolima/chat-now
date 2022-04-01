import Head from 'next/head'
import { Header } from '../components/Header'
import { Container } from '../styles/signIn'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sign In | chat-now</title>
      </Head>
      <Container>
        <h1>Welcome to chat-now</h1>
        
      </Container>
    </>
  )
}
