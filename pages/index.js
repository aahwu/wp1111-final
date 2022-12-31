import Head from 'next/head'
import AuthPage from './AuthPage'
import Loading from '../components/Common/Loading'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../lib/dbConnect'

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
        <style>
          {`
            /* Other global styles such as 'html, body' etc... */

            #__next {
              height: 100%;
            }
          `}
        </style>
      </Head>
      <main style={{
        flex: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
      }}>
        <Loading />
      </main>
    </>
  )
}
