import { Inter } from 'next/font/google'
import Hero from '@/components/home/hero'
import Layout from '@/components/layout'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          우유
        </title>
        <meta name="description" content='우유'></meta>
        <link rel="icon" href='/favicon.ico'></link>
      </Head>
      
      <section className="flex min-h-screen flex-col items-center justify-center body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <Hero/>
        </div>
      </section>
    </Layout>
  )
}
