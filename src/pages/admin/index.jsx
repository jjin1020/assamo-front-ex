import { Tab } from "@headlessui/react";
import BoardList from "../boards/board-list";
import Layout from "@/components/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AreaList from "../area-mng/area-list";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminSetting() {
    const router = useRouter();

    const { asPath } = router;

    let [categories] = useState(['지역관리', '게시판관리'])
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        console.log(asPath)
        if ('/boards/board' === asPath) {
            
        }
    }, [asPath])

    


    return (

        <Layout>
            <Head>
                <title>
                    관리자
                </title>
            </Head>
            <div className="w-2/3 mx-auto py-4">
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {categories.map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                                >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                                <AreaList />
                        </Tab.Panel>
                        <Tab.Panel>
                            <BoardList />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </Layout>

    )
}