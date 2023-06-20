import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Layout from "@/components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import BbsList from '@/components/bbs/bbs-list';
import { ajax } from 'rxjs/ajax'
import { useRouter } from 'next/router';

export default function BoardList() {
    const router = useRouter();

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        const subscription = ajax.getJSON('/api/bbs/list').pipe(
            map((data) => {
                setBoardList(data);
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

        router.push('/boards/board', undefined, { shallow: true });

    }

    return (
        <>
            <Head>
                <title>
                    게시판 목록
                </title>
            </Head>
            <div className="px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
                <div className="mx-auto max-w-4xl">
                    <button type="button" onClick={handleReqBtn} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">신규</button>
                    <ul role="list" className="divide-y divide-gray-100">
                        {boardList && <BbsList bbsList={boardList}/>}
                    </ul>
                </div>
            </div> 
        </>
    )
}