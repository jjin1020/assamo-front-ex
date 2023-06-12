import Layout from "@/components/layout";
import Head from "next/head";

export default function BoardList() {

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
                            <li class="flex justify-between gap-x-6 py-5">
                                <div class="flex gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                                </div>
                                </div>
                                <div class="hidden sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                                <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
                                </div>
                            </li>
                            <li class="flex justify-between gap-x-6 py-5">
                                <div class="flex gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm font-semibold leading-6 text-gray-900">Michael Foster</p>
                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">michael.foster@example.com</p>
                                </div>
                                </div>
                                <div class="hidden sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm leading-6 text-gray-900">Co-Founder / CTO</p>
                                <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
                                </div>
                            </li>
                            <li class="flex justify-between gap-x-6 py-5">
                                <div class="flex gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm font-semibold leading-6 text-gray-900">Dries Vincent</p>
                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">dries.vincent@example.com</p>
                                </div>
                                </div>
                                <div class="hidden sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm leading-6 text-gray-900">Business Relations</p>
                                <div class="mt-1 flex items-center gap-x-1.5">
                                    <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                                </div>
                            </li>
                            <li class="flex justify-between gap-x-6 py-5">
                                <div class="flex gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm font-semibold leading-6 text-gray-900">Lindsay Walton</p>
                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">lindsay.walton@example.com</p>
                                </div>
                                </div>
                                <div class="hidden sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm leading-6 text-gray-900">Front-end Developer</p>
                                <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
                                </div>
                            </li>
                            <li class="flex justify-between gap-x-6 py-5">
                                <div class="flex gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm font-semibold leading-6 text-gray-900">Courtney Henry</p>
                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">courtney.henry@example.com</p>
                                </div>
                                </div>
                                <div class="hidden sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm leading-6 text-gray-900">Designer</p>
                                <p class="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
                                </div>
                            </li>
                            <li class="flex justify-between gap-x-6 py-5">
                                <div class="flex gap-x-4">
                                <div class="min-w-0 flex-auto">
                                    <p class="text-sm font-semibold leading-6 text-gray-900">Tom Cook</p>
                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">tom.cook@example.com</p>
                                </div>
                                </div>
                                <div class="hidden sm:flex sm:flex-col sm:items-end">
                                <p class="text-sm leading-6 text-gray-900">Director of Product</p>
                                <div class="mt-1 flex items-center gap-x-1.5">
                                    <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div> 
            </Layout>

        </>
    )
}