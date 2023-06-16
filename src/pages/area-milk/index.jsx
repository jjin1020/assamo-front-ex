import AreaLayout from "@/components/area-milk-comp/area-layout";
import AreaSection from "@/components/area-milk-comp/area-section";
import Head from "next/head";

export default function AreaHome(){

    return(
        <AreaLayout>
            <Head>
                <title>
                    지역우유
                </title>
                <meta name="description" content='지역우유'></meta>
                <link rel="icon" href='/favicon.ico'></link>
            </Head>
            <AreaSection />
        
        </AreaLayout>
    )
}