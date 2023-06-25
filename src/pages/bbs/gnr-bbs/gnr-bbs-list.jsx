import Layout from "@/components/layout";
import { Menu, Switch, Transition } from "@headlessui/react";
import { BookmarkIcon, BriefcaseIcon, CalendarIcon, ChatBubbleOvalLeftIcon, CheckIcon, ChevronDownIcon, CurrencyDollarIcon, EyeIcon, HandThumbUpIcon, LinkIcon, MapPinIcon, PencilIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GnrBbsList() {
    const router = useRouter();

    const { areaSen, bbsSen } = router.query;
    
    const [enabled, setEnabled] = useState(false)

    
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

        if (areaSen != undefined && areaSen != null && bbsSen != undefined && bbsSen != null) {
        
            listNtt(areaSen, bbsSen).subscribe(data => {
                if (data == null) {
                    setNttList([]);
                } else {
    
                    setNttList(data);
                }
            })
        }

    }, [areaSen, bbsSen])
    

    const handleReqBtn = (event) => {
        event.preventDefault();

        router.push(`/bbs/gnr-bbs/gnr-bbs-detail?areaSen=${areaSen}&bbsSen=${bbsSen}`, undefined, { shallow: true });

    }
    
    return (
        <Layout>
            <Head>
                <title>
                    {areaInfo.areaNae} {bbsInfo.bbsNae}
                </title>
            </Head>
                
            <div className="lg:flex lg:items-center lg:justify-between p-6 mx-48 my-10 max-w-full">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {bbsInfo.bbsNae}
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            Full-time
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            Remote
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            $120k &ndash; $140k
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            Closing on January 9, 2020
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:ml-4 lg:mt-0">

                    <span className="flex mr-3 pt-2">
                        <p className="mr-1">새글구독</p>
                        <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${
                            enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                        <span className="sr-only">Enable subscribe</span>
                        <span
                            className={`${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                        </Switch>
                    </span>
                    <span className="hidden sm:block">
                        <button
                            type="button" onClick={handleReqBtn}
                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            글쓰기
                        </button>
                    </span>

                    {/* Dropdown */}
                    <Menu as="div" className="relative ml-3 sm:hidden">
                        <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                            More
                            <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Edit
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    View
                                </a>
                                )}
                            </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            <div className="p-6 mx-48 my-10 max-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md items-center space-x-4 grid grid-cols-3 gap-4">
                {nttList.map((ntt) => (
                    
                    <Link key={ntt.nttSen} href={{ pathname: '/bbs/gnr-bbs/gnr-bbs-view', query: {areaSen: `${ntt.areaSen}`, bbsSen: `${ntt.bbsSen}`, nttSen: `${ntt.nttSen}` } }}>
                        <div key={ntt.nttSen} className="card rounded overflow-hidden shadow-lg m-2 flex-1 transform transition duration-500 ease-in-out hover:scale-105">
                            <div className="px-6 py-4 dark:text-gray-300">
                                <div className="font-bold text-xl mb-2">{ntt.nttSubject}</div>
                                <p className="text-gray-700 dark:text-gray-300 text-base">
                                {ntt.nttTextContents}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                                <div className="flex items-center">
                                    <EyeIcon className="h-4 w-4 mr-1"/>
                                    <p className="text-sm mr-4">{ntt.serchNum}</p>
                                    <HandThumbUpIcon className="h-4 w-4 mr-1" />
                                    <p className="text-sm mr-4">{ntt.niceNum}</p>
                                    <ChatBubbleOvalLeftIcon className="h-4 w-4 mr-1" />
                                    <p className="text-sm mr-4">{ntt.anserNum}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm">방금전</p>
                                    <BookmarkIcon className="h-4 w-4 ml-1" />
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>

        </Layout>
    )
}