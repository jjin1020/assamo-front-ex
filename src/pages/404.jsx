import Layout from "@/components/layout"
import Animation404 from "../components/animation404"
import Head from "next/head"
export default function PageNotFound() {

    return (
        <Layout>
          <Head>
            <title>
              404
            </title>
            <meta name="description" content='404'></meta>
            <link rel="icon" href='/favicon.ico'></link>
          </Head>
          
          <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:w-full">
                    <Animation404></Animation404>
                </div>
            </div>
          </section>
        </Layout>
    )
}