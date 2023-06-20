import Layout from "@/components/layout";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // import the styles

export default function GnrBbsDetail() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
  
    const onSubmit = (data) => {
      // handle form submission logic here
      console.log(data)
      router.push('/success')  // redirect to success page
    }

    return (
        <Layout>
            <Head>
                <title>
                    
                </title>
            </Head>
            
            <div className="p-6 mx-48 my-10 max-w-full min-h-screen">
                <form>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full sm:col-span-6">
                            <label htmlFor="nttSubject" className="block text-gray-900">
                                제목
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name="nttSubject"
                                id="nttSubject"
                                autoComplete="nttSubject"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            </div>

                            <div className="col-span-full sm:col-span-6">
                            <label htmlFor="nttContents" className="block text-gray-900">
                                내용
                            </label>
                            <div className="mt-1">
                                <ReactQuill 
                                id="nttContents"
                                name="nttContents"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-80"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                        Save
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}