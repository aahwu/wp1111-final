import Head from 'next/head'
import App from '../containers/App'
import AuthPage from './AuthPage'
import Loading from '../components/Loading'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.push('/MainPage')
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Loading />
      </main>
    </>
  )
}