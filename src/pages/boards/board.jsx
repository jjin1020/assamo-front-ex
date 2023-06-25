import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { catchError, map, mergeMap, of } from "rxjs";
import { ajax } from 'rxjs/ajax'


export default function Board() {
    const router = useRouter();

    const {bbsSen} = router.query;

    const {register, handleSubmit, setValue, getValues} = useForm({
        defaultValues: {
          bbsTyCd: 'A01001',
          gdniceUseYn: 'N',
          scrtartcFnctYn: 'N',
          anserFnctYn: 'N',
          answerFnctYn: 'N',
          annymtyFnctYn: 'N',
          sttemntFnctYn: 'N',
        }
      });

    const hanleChange = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value === undefined ? '' : event.target.value;
        setValue(targetName,targetValue);
    }

    // Defining fetch function
    const fetchData = (bbsSen) => {
        return ajax.getJSON(`/api/bbs/getBoard/${bbsSen}`).pipe(
            catchError(error => {
                console.error('Error occurred while fetching data', error);
                return of(null);
            })
        );

        // return ajax({
        //     url: `/api/bbs/getBoard/${bbsSen}`
        //     , method: 'GET'
        //     , headers: {
        //         'Accept': 'application/json'
        //     },
        //     responseType: 'json'
        // }).pipe(map(response => response.response));
    };
    
    const saveData = (data) => {
        return ajax.post('/api/bbs/saveBoard', data).pipe(
        catchError(error => {
            console.error('Error occurred while saving data', error);
            return of(null);
        })
        );
    };

    const deleteData = (bbsSen) => {
        return ajax.delete(`/api/bbs/deleteBoard/${bbsSen}`).pipe(
            catchError(error =>{
                console.error('Error occurred while deleting data', error);
                return of(null);
            })
        );
    }

    useEffect(() => {
        if (bbsSen != undefined && bbsSen != null) {

            const sub = fetchData(bbsSen).subscribe(data => {
                for (let field in data) {
                    setValue(field, data[field]);
                  }
            });
    
            return () => {
                sub.unsubscribe();
            }
        }
    }, []);

    const onSubmit = (data) => {
      saveData(data).pipe(
        mergeMap(response => {
          if (response && (response.status === 200)) {
            return fetchData(response.response.bbsSen);
          } else {
            console.error('Error occurred while saving data');
            return of(null);
          }
        })
      ).subscribe(fetchedData => {
        if (fetchedData) {
            for (let field in data) {
                setValue(field, data[field]);
              }
        } else {
          console.error('Error occurred while fetching data');
        }
      });
    };

    const deleteClick = (event) => {
        event.preventDefault();
        deleteData(getValues('bbsSen')).subscribe(() => {
            // router.push('/boards/board-list');
            router.push('/admin', undefined, { shallow: true });
        });
    }
    
    const onMoveList = (event) => {
        event.preventDefault();
        // router.push('/boards/board-list');
        router.push('/admin', undefined, { shallow: true });
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>
                        게시판 설정
                    </title>
                </Head>
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 min-h-screen">
                    <div className="mx-auto max-w-2xl">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">게시판 생성</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="bbsTyCd" className="block text-sm font-medium leading-6 text-gray-900">게시판 유형</label>
                                            <div className="mt-2">
                                                <select id="bbsTyCd" name="bbsTyCd" autoComplete="country-name" {...register('bbsTyCd')} onChange={hanleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                    <option value="A01001">일반 게시판</option>
                                                    <option value="A01002">메모 게시판</option>
                                                    <option value="A01003">사진 게시판</option>
                                                    <option value="A01004">카드 게시판</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="bbsNae" className="block text-sm font-medium leading-6 text-gray-900">게시판 명</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input type="text" name="bbsNae" id="bbsNae" autoComplete="bbsNae" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" {...register('bbsNae')} onChange={hanleChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="bbsDescript" className="block text-sm font-medium leading-6 text-gray-900">게시판 설명</label>
                                            <div className="mt-2">
                                                <textarea id="bbsDescript" name="bbsDescript" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('bbsDescript')} onChange={hanleChange}></textarea>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="bbsNae" className="block text-sm font-medium leading-6 text-gray-900">게시판 순서</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input type="text" name="sortOrd" id="sortOrd" autoComplete="sortOrd" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" {...register('sortOrd')} onChange={hanleChange}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">게시판 옵션 설정</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">좋아요 기능</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="gdniceUseY" name="gdniceUseYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('gdniceUseYn')} onChange={hanleChange}/>
                                                    <label htmlFor="gdniceUseY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="gdniceUseN" name="gdniceUseYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('gdniceUseYn')} onChange={hanleChange}/>
                                                    <label htmlFor="gdniceUseN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">비밀글 기능</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="scrtartcFnctY" name="scrtartcFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('scrtartcFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="scrtartcFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="scrtartcFnctN" name="scrtartcFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('scrtartcFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="scrtartcFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">댓글 기능</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="anserFnctY" name="anserFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('anserFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="anserFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="anserFnctN" name="anserFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('anserFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="anserFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">답글 기능</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="answerFnctY" name="answerFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('answerFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="answerFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="answerFnctN" name="answerFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('answerFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="answerFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">익명 기능</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="annymtyFnctY" name="annymtyFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('annymtyFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="annymtyFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="annymtyFnctN" name="annymtyFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('annymtyFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="annymtyFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">신고 기능</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="sttemntFnctY" name="sttemntFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('sttemntFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="sttemntFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="sttemntFnctN" name="sttemntFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('sttemntFnctYn')} onChange={hanleChange}/>
                                                    <label htmlFor="sttemntFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={deleteClick}>삭제</button>
                                <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">저장</button>
                                <button type="button" onClick={onMoveList} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">목록</button>
                            </div>
                        </form>
                    </div>
                </div>                
            </Layout>
        </>
    )
}