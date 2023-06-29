import Layout from "@/components/layout";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useRouter } from "next/router";
import BlotFormatter from "quill-blot-formatter";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // import the styles
import { catchError, of } from "rxjs";
import { ajax } from "rxjs/ajax";


import Quill from 'quill';


const fontSizeArr = ['12px', '13px', '15px', '16px', '19px', '24px','28px', '30px','34px', '38px'];

var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;

Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register(Size, true);

let BaseImageFormat = Quill.import('formats/image');

class ImageFormat extends BaseImageFormat  {
  static formats(domNode) {
    return {
      style: domNode.style.cssText,
      width: domNode.getAttribute('width'),
      height: domNode.getAttribute('height')
      // You can add other attributes here as needed
    };
  }

  format(name, value) {
    if (name === 'style') {
      this.domNode.setAttribute('style', value);
    } else if (name === 'width') {
      this.domNode.setAttribute('width', value);
    } else if (name === 'height') {
      this.domNode.setAttribute('height', value);
    } else {
      super.format(name, value);
    }
  }

  formats() {
    let formats = {
      style: this.domNode.getAttribute('style'),
      width: this.domNode.getAttribute('width'),
      height: this.domNode.getAttribute('height')
    };
    return formats;
  }
}

ImageFormat.blotName = 'image';
ImageFormat.tagName = 'img';

Quill.register(ImageFormat, true);

export default function GnrBbsDetail() {
      
    const router = useRouter();
    
    const { areaSen, bbsSen, nttSen } = router.query;

    const { register, control, handleSubmit, formState: { errors }, setValue, getValues } = useForm()

     const onSubmit = (data) => {
      // handle form submission logic here
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

        console.log(content)
        setValue('nttContents',content);
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
        return ajax.getJSON(`/api/bbs/ntt/getNtt?areaSen=${areaSen}&bbsSen=${bbsSen}&nttSen=${nttSen}`).pipe(
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

    }, [areaSen, bbsSen, nttSen, setValue])

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
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md h-80"
                                                {...field}
                                                onChange={(content, delta, source, editor) => {
                                                    console.log('11111', editor.getHTML())
                                                    field.onChange(editor.getHTML()); // this will store the value into react-hook-form
                                                    hanleQuillChange(content, delta, source, editor);
                                                }}
                                                theme="snow"
                                                modules={{
                                                    blotFormatter: {},
                                                    toolbar: [
                                                      ['bold', 'italic', 'underline', 'strike'],
                                                      ['blockquote', 'code-block'],
                                                    //   [{ 'header': 1 }, { 'header': 2 }],
                                                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                      [{ 'indent': '-1'}, { 'indent': '+1' }],
                                                    //   [{ 'direction': 'rtl' }],
                                                      [{ 'size': fontSizeArr }],
                                                    //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                      [{ 'color': [] }, { 'background': [] }],
                                                    //   [{ 'font': [] }],
                                                      [{ 'align': [] }],
                                                    //   ['clean'],
                                                      ['link', 'image'] // link and image, video
                                                    ],
                                                  }}
                                                  formats={[
                                                      'bold', 'italic', 'underline', 'strike'
                                                    , 'blockquote', 'code-block', 'list', 'indent'
                                                    , 'size', 'color', 'background', 'align'
                                                    , 'link'
                                                    , 'image'
                                                    , 'img'
                                                    , 'style'
                                                    , 'width'
                                                    , 'height'
                                                  ]}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">게시판 옵션 설정</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">We'll always let you know about important changes, but you pick what else you want to hear about.</p>

                            <div className="mt-10 space-y-10">
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">비밀글 여부</legend>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input id="scrtartcFnctY" name="scrtartcFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('scrtartcFnctYn')} onChange={hanleChange} disabled={bbsInfo.scrtartcFnctYn === 'Y' ? false : true}/>
                                            <label htmlFor="scrtartcFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input id="scrtartcFnctN" name="scrtartcFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('scrtartcFnctYn')} onChange={hanleChange} disabled={bbsInfo.scrtartcFnctYn === 'Y' ? false : true}/>
                                            <label htmlFor="scrtartcFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend className="text-sm font-semibold leading-6 text-gray-900">익명 여부</legend>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input id="annymtyFnctY" name="annymtyFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Y" {...register('annymtyFnctYn')} onChange={hanleChange} disabled={bbsInfo.annymtyFnctYn === 'Y' ? false : true}/>
                                            <label htmlFor="annymtyFnctY" className="block text-sm font-medium leading-6 text-gray-900">사용</label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input id="annymtyFnctN" name="annymtyFnctYn" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="N" {...register('annymtyFnctYn')} onChange={hanleChange} disabled={bbsInfo.annymtyFnctYn === 'Y' ? false : true}/>
                                            <label htmlFor="annymtyFnctN" className="block text-sm font-medium leading-6 text-gray-900">미사용</label>
                                        </div>
                                    </div>
                                </fieldset>
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