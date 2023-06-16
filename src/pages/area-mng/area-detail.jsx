import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { catchError, map, mergeMap, of } from "rxjs";
import { ajax } from 'rxjs/ajax'


export default function AreaDetail() {
    const router = useRouter();

    const {areaSen} = router.query;

    const {register, handleSubmit, setValue, getValues} = useForm({});

    const hanleChange = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value === undefined ? '' : event.target.value;
        setValue(targetName,targetValue);
    }

    // Defining fetch function
    const fetchData = (areaSen) => {
        return ajax.getJSON(`/api/bbs/getArea/${areaSen}`).pipe(
            catchError(error => {
                console.error('Error occurred while fetching data', error);
                return of(null);
            })
        );
    };
    
    const saveData = (data) => {
        return ajax.post('/api/bbs/saveArea', data).pipe(
        catchError(error => {
            console.error('Error occurred while saving data', error);
            return of(null);
        })
        );
    };

    const deleteData = (areaSen) => {
        return ajax.delete(`/api/bbs/deleteArea/${areaSen}`).pipe(
            catchError(error =>{
                console.error('Error occurred while deleting data', error);
                return of(null);
            })
        );
    }

    useEffect(() => {
        if (areaSen != undefined && areaSen != null) {

            const sub = fetchData(areaSen).subscribe(data => {
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
            return fetchData(response.response.areaSen);
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
        deleteData(getValues('areaSen')).subscribe(() => {
            // router.push('/boards/board-list');
            router.push('/admin');
        });
    }
    
    const onMoveList = (event) => {
        event.preventDefault();
        // router.push('/boards/board-list');
        router.push('/admin');
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>
                        지역 설정
                    </title>
                </Head>
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 min-h-screen">
                    <div className="mx-auto max-w-2xl">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">지역 생성</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="areaNae" className="block text-sm font-medium leading-6 text-gray-900">지역 명</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input type="text" name="areaNae" id="areaNae" autoComplete="areaNae" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" {...register('areaNae')} onChange={hanleChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="areaDescript" className="block text-sm font-medium leading-6 text-gray-900">지역 설명</label>
                                            <div className="mt-2">
                                                <textarea id="areaDescript" name="areaDescript" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('areaDescript')} onChange={hanleChange}></textarea>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                        </div>

                                        <div className="sm:col-span-full">
                                            <label htmlFor="sortOrd" className="block text-sm font-medium leading-6 text-gray-900">지역 순서</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <input type="text" name="sortOrd" id="sortOrd" autoComplete="sortOrd" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" {...register('sortOrd')} onChange={hanleChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        <fieldset>
                                            <legend className="flex text-sm leading-6 text-gray-900">사용여부</legend>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input id="useY" name="useYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('useYn')} onChange={hanleChange}/>
                                                    <label htmlFor="useY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input id="useN" name="useYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('useYn')} onChange={hanleChange}/>
                                                    <label htmlFor="useN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
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