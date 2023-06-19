import Layout from "@/components/layout";
import { BookmarkIcon, ChatBubbleOvalLeftIcon, EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useRouter } from "next/router";

export default function GnrBbsList() {
    const router = useRouter();

    const { areaSen, bbsSen } = router.query;

    // 지역 정보 조회

    // 게시판 정보 조회

    // 게시판 목록 조회
    
    
    const products = [
        { id: 1, title: 'Product 1', description: 'This is product 1', price: '$99.99' }
        // add more products here
    ];
    return (
        <Layout>
            <Head>
                <title>
                    대전우유 자유게시판
                </title>
            </Head>
            <div className="p-6 mx-48 my-10 max-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center space-x-4 grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="card rounded overflow-hidden shadow-lg m-2 flex-1 transform transition duration-500 ease-in-out hover:scale-105">
                        <img className="w-full" src="/path/to/image.jpg" alt="Product image" />
                        <div className="px-6 py-4 dark:text-gray-300">
                            <div className="font-bold text-xl mb-2">{product.title}</div>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                            {product.description}
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