import AreaSection from "@/components/area-milk-comp/area-section";
import Layout from "@/components/layout";
import Head from "next/head";

export default function AreaHome(){

    return(
        <Layout>
            <Head>
                <title>
                    지역우유
                </title>
                <meta name="description" content='지역우유'></meta>
                <link rel="icon" href='/favicon.ico'></link>
            </Head>
            <AreaSection />
        
        </Layout>
    )
}