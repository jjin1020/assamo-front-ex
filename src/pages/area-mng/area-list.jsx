import AreaListItem from "@/components/area-mng-comp/area-list-item";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ajax } from "rxjs/ajax";

export default function AreaList() {
    const router = useRouter();

    const [areaList, setAreaList] = useState([]);

    useEffect(() => {
        const subscription = ajax.getJSON('/api/bbs/listArea').pipe(
            map((data) => {
                setAreaList(data);
            }),
            catchError((error) => {
                console.log('Error', error);

                return of(error);
            })
        ).subscribe();

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    const handleReqBtn = (event) => {
        event.preventDefault();

        router.push('/area-mng/area-detail');

    }

    return (
        <>
            <Head>
                <title>
                    지역 목록
                </title>
            </Head>
            <div className="px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
                <div className="mx-auto max-w-4xl">
                    <button type="button" onClick={handleReqBtn} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">신규</button>
                    <ul role="list" className="divide-y divide-gray-100">
                        {areaList && <AreaListItem areaList={areaList}/>}
                    </ul>
                </div>
            </div> 
        </>
    )
}