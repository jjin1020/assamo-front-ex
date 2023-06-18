import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";

export default function MemoBbsList() {
    const router = useRouter();

    const { areaSen, bbsSen } = router.query;

    // 지역 정보 조회

    // 게시판 정보 조회

    // 게시판 목록 조회
    
    return (
        <Layout>
            <Head>
                <title>
                    대전우유 메모게시판
                </title>
            </Head>

        </Layout>
    )
}