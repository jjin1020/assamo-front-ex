import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Layout from "@/components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import BbsList from '@/components/bbs/bbs-list';
import { ajax } from 'rxjs/ajax'

export default function BoardList() {

    
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        const subscription = ajax.getJSON('/api/bbs/list').pipe(
            map((data) => {
                console.log(data);
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

    return (
        <>
            <Layout>
                <Head>
                    <title>
                        익명게시판 목록
                    </title>
                </Head>
                <div className="px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
                    <div className="mx-auto max-w-4xl">
                        <ul role="list" className="divide-y divide-gray-100">
                            {boardList && <BbsList bbsList={boardList}/>}
                        </ul>
                    </div>
                </div> 
            </Layout>

        </>
    )
}