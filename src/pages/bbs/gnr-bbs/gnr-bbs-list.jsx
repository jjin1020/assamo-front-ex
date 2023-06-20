import Layout from "@/components/layout";
import { BookmarkIcon, ChatBubbleOvalLeftIcon, EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";

export default function GnrBbsList() {
    const router = useRouter();

    const { areaSen, bbsSen } = router.query;

    
    // 지역정보 조회
    const [areaInfo, setAreaInfo] = useState({});

    const getAreaInfo = (areaSen) => {
        return ajax.getJSON(`/api/bbs/getArea/${areaSen}`).pipe(
            catchError(error => {
                console.error('Error occurred while fetching data', error);
                return of(null);
            })
        );
    };

    // 게시판 정보 조회
    const [bbsInfo, setBbsInfo] = useState({});

    const getBbsInfo = (bbsSen) => {
        return ajax.getJSON(`/api/bbs/getBoard/${bbsSen}`).pipe(
            catchError(error => {
                console.error('Error occurred while fetching data', error);
                return of(null);
            })
        );
    };

    // 게시판 목록 조회
    const [nttList, setNttList] = useState([]);

    const listNtt = (areaSen, bbsSen) => {
        return ajax.getJSON(`/api/bbs/ntt/list?areaSen=${areaSen}&bbsSen=${bbsSen}`).pipe(
            catchError(error => {
                console.error('Error occurred while fetching data', error);
                return of(null);
            })
        );
    };


    useEffect(() => {
        if (areaSen != undefined && areaSen != null) {

            getAreaInfo(areaSen).subscribe(data => {
                setAreaInfo(data)
            });
        }

        if (bbsSen != undefined && bbsSen != null) {
            getBbsInfo(bbsSen).subscribe(data => {
                setBbsInfo(data);
            })
        }

        listNtt(areaSen, bbsSen).subscribe(data => {
            if (data == null) {
                setNttList([]);
            } else {

                setNttList(data);
            }
        })

    }, [areaSen, bbsSen])
    
    
    return (
        <Layout>
            <Head>
                <title>
                    {areaInfo.areaNae} {bbsInfo.bbsNae}
                </title>
            </Head>
            <div className="p-6 mx-48 my-10 max-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md items-center space-x-4 grid grid-cols-2 gap-4">
                {nttList.map((ntt) => (
                    <div key={ntt.nttSen} className="card rounded overflow-hidden shadow-lg m-2 flex-1 transform transition duration-500 ease-in-out hover:scale-105">
                        <img className="w-full" src="/path/to/image.jpg" alt="Product image" />
                        <div className="px-6 py-4 dark:text-gray-300">
                            <div className="font-bold text-xl mb-2">{ntt.nttSubject}</div>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                            {ntt.nttTextContents}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                            <div className="flex items-center">
                                <EyeIcon className="h-4 w-4 mr-1"/>
                                <p className="text-sm mr-4">10K</p>
                                <HandThumbUpIcon className="h-4 w-4 mr-1" />
                                <p className="text-sm mr-4">100</p>
                                <ChatBubbleOvalLeftIcon className="h-4 w-4 mr-1" />
                                <p className="text-sm mr-4">10</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-sm">방금전</p>
                                <BookmarkIcon className="h-4 w-4 ml-1" />
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </Layout>
    )
}