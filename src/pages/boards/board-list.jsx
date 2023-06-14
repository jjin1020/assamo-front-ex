import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Layout from "@/components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import getBoardList from "../api/board";

export default function BoardList() {

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        const subscription = getBoardList().pipe(
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
                        <ul role="list" class="divide-y divide-gray-100">
                            {boardList.map((item, idx) => {

                                return(
                                    <li class="flex justify-between gap-x-6 py-5" key={item.bbsSen}>
                                        <div class="flex gap-x-4">
                                            <div class="min-w-0 flex-auto">
                                                <p class="text-sm font-semibold leading-6 text-gray-900">{item.bbsSen}</p>
                                                <p class="mt-1 truncate text-xs leading-5 text-gray-500">{item.bbsNae}</p>
                                            </div>
                                        </div>
                                        <div class="hidden sm:flex sm:flex-col sm:items-end">
                                            <p class="text-sm leading-6 text-gray-900">{item.bbsDescript}</p>
                                            <p class="mt-1 text-xs leading-5 text-gray-500">{item.sortOrd}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div> 
            </Layout>

        </>
    )
}