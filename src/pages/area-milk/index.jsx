import AreaSection from "@/components/area-milk-comp/area-section";
import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";

export default function AreaHome(){

    const router = useRouter();
      
    const {areaSen} = router.query;

    const [areaInfo, setAreaInfo] = useState({});

    // 지역정보 조회
    const fetchData = (areaSen) => {
        return ajax.getJSON(`/api/bbs/getArea/${areaSen}`).pipe(
            catchError(error => {
                console.error('Error occurred while fetching data', error);
                return of(null);
            })
        );
    };

    useEffect(() => {
        if (areaSen != undefined && areaSen != null) {

            const sub = fetchData(areaSen).subscribe(data => {
                setAreaInfo(data)
            });
    
            return () => {
                sub.unsubscribe();
            }
        }

    }, [areaSen])

    return(
        <Layout>
            <Head>
                <title>
                    {areaInfo.areaNae}
                </title>
                <meta name="description" content={areaInfo.areaNae}></meta>
                <link rel="icon" href='/favicon.ico'></link>
            </Head>
            <AreaSection areaInfo={areaInfo} />
        
        </Layout>
    )
}