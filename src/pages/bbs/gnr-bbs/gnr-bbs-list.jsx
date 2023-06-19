import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";

export default function GnrBbsList() {
    const router = useRouter();

    const { areaSen, bbsSen } = router.query;

    // 지역 정보 조회

    // 게시판 정보 조회

    // 게시판 목록 조회
    
    
    const products = [
        { id: 1, title: 'Product 1', description: 'This is product 1', price: '$99.99' },
        { id: 2, title: 'Product 2', description: 'This is product 2', price: '$89.99' },
        { id: 3, title: 'Product 3', description: 'This is product 3', price: '$79.99' },
        { id: 5, title: 'Product 3', description: 'This is product 3', price: '$79.99' },
        { id: 6, title: 'Product 3', description: 'This is product 3', price: '$79.99' },
        { id: 7, title: 'Product 3', description: 'This is product 3', price: '$79.99' },
        { id: 8, title: 'Product 3', description: 'This is product 3', price: '$79.99' },
        { id: 9, title: 'Product 3', description: 'This is product 3', price: '$79.99' }
        // add more products here
    ];
    return (
        <Layout>
            <Head>
                <title>
                    대전우유 자유게시판
                </title>
            </Head>
            <div className="p-6 mx-48 my-10 max-w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center space-x-4 grid grid-cols-2 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="card rounded overflow-hidden shadow-lg m-2 flex-1 transform transition duration-500 ease-in-out hover:scale-105">
                        <img className="w-full" src="/path/to/image.jpg" alt="Product image" />
                        <div className="px-6 py-4 dark:text-gray-300">
                            <div className="font-bold text-xl mb-2">{product.title}</div>
                            <p className="text-gray-700 dark:text-gray-300 text-base">
                            {product.description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>

        </Layout>
    )
}