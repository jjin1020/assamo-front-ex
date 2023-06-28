import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // import the styles
import { catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import TextareaAutosize from 'react-textarea-autosize';

export default function GnrBbsView() {
    const router = useRouter();
    
    const { areaSen, bbsSen, nttSen } = router.query;

    const { register, control, handleSubmit, formState: { errors }, setValue, getValues } = useForm()

     const onSubmit = (data) => {
      // handle form submission logic here
      console.log(data);

      saveData(data).subscribe(() => {
          router.push(`/bbs/gnr-bbs/gnr-bbs-list?areaSen=${areaSen}&bbsSen=${bbsSen}`)  // redirect to success page
      })
    }

    const hanleChange = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value === undefined ? '' : event.target.value;
        setValue(targetName,targetValue);
    }

    const hanleQuillChange = (content, delta, source, editor) => {
        setValue('nttContents',editor.getHTML());
        setValue('nttTextContents',editor.getText());
    }
    
    const saveData = (data) => {
        return ajax.post('/api/bbs/ntt/save', data).pipe(
        catchError(error => {
            console.error('Error occurred while saving data', error);
            return of(null);
        })
        );
    };

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

    // 게시판 상세조회
    const fetchData = (areaSen, bbsSen, nttSen) => {
        return ajax.getJSON(`/api/bbs/ntt/getNtt?areaSen=${areaSen}&bbsSen=${bbsSen}&nttSen=${nttSen}`, ).pipe(
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

        if (nttSen != undefined && nttSen != null) {
            fetchData(areaSen, bbsSen, nttSen)
                .subscribe((data) => {
                    for (let field in data) {
                        setValue(field, data[field]);
                      }
                })

        } else {

            setValue('areaSen',areaSen);
            setValue('bbsSen',bbsSen);
            setValue('ncnmNae','jjin');
            setValue('writerNam','정진룡');
            setValue('inpId','8811');
        }


    }, [areaSen, bbsSen, nttSen])
    
    const onMoveList = (event) => {
        event.preventDefault();
        // router.push('/boards/board-list');
        router.push(`/bbs/gnr-bbs/gnr-bbs-list?areaSen=${areaSen}&bbsSen=${bbsSen}`, undefined, { shallow: true });
    }
    
    const onMoveDetail = (event) => {
        event.preventDefault();
        // router.push('/boards/board-list');
        router.push(`/bbs/gnr-bbs/gnr-bbs-detail?areaSen=${areaSen}&bbsSen=${bbsSen}&nttSen=${nttSen}`, undefined, { shallow: true });
    }

    return (
        <Layout>
            <Head>
                <title>
                    
                </title>
            </Head>
            
            <div className="p-6 mx-48 my-10 max-w-full min-h-screen">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
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
                                        {...register('nttSubject')} onChange={hanleChange}
                                        readOnly={true}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full sm:col-span-6">
                                    <label htmlFor="nttContents" className="block text-gray-900">
                                        내용
                                    </label>
                                    <div className="mt-1">
                                        <Controller 
                                            name="nttContents"
                                            control={control}  // useForm에서 반환되는 control 사용
                                            defaultValue=""  // 초기 값 설정
                                            render={({ field }) => (
                                        
                                                <ReactQuill 
                                                id="nttContents"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md h-80"
                                                {...field}
                                                readOnly={true}
                                                modules={{ toolbar: false }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pb-6 border-b col-span-full gap-x-6">
                        <label htmlFor="nttContents" className="block text-gray-900 mb-3">
                            댓글
                        </label>
                        <div className="p-3 border-0 ring-1 ring-inset ring-gray-300 rounded-lg">
                            <label className="block text-gray-900">
                                정진룡
                            </label>
                            <TextareaAutosize 
                                id="anserContents" 
                                name="anserContents" 
                                className="block w-full rounded-md border-0 p-1.5 placeholder:text-gray-400 focus:placeholder:text-gray-200 focus-visible:outline-0 resize-none"
                                placeholder="댓글을 입력해 주세요"
                                {...register('anserContents')} onChange={hanleChange}
                            ></TextareaAutosize>
                            <div className="flex justify-end">
                                <button className="text-gray-400">
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <button 
                            type="button" 
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            onClick={onMoveList}
                            >
                            목록
                        </button>
                        <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={onMoveDetail}
                        >
                            수정
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}