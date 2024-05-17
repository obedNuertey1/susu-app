'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMailForward, faMailReply} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import styles from "./borrowers.module.css";
import "./borrowers.css";
import { useQuery } from 'react-query';
import { chunk } from 'lodash';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import waiting from '@/app/funcs/waiting';

async function getData(key:any){
    try{
        console.log("key");
        console.log(key)
        const res2 = await Promise.all([fetch(`${process.env.REACT_SERVER_API}/borrowers?fields=true`), fetch(`${process.env.REACT_SERVER_API}/borrowers/alldata/?pageIndex=${key?.queryKey[0]}&rowsPerPage=20&searchKey=${key?.queryKey[1]}&searchQuery=${key?.queryKey[2]}`)]);
        if(res2[0].ok == false || res2[1].ok == false){throw new Error("Network response was not ok")}
        const res2data = await Promise.allSettled([res2[0].json(), res2[1].json()]);
        //   @ts-ignore
        const fields = res2data[0]?.value;
        //   @ts-ignore
        const pages = res2data[1]?.value.pages;
        //   @ts-ignore
        const queryResult = res2data[1]?.value.queryResult;
        console.log("__________QueryResult____________");
        console.log(queryResult)
        return[fields, queryResult, pages];
   
    }catch(e){
      console.error(e);
    }
}


function BorrowersPage() {
    const router = useRouter();
    const {currentUser}:any = useAuth();
    if(!currentUser){
      return router.push("/login");
    }
    const [pageNum, setPageNum] = useState(1);
    const [searchByFilter, setSearchByFilter] = useState("");
    const [searchSpace, setSearchSpace] = useState("");
    const [searchByFilterValue, setSearchByFilterValue] = useState("");
    const [searchSpaceValue, setSearchSpaceValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {status, data, refetch} = useQuery([pageNum, searchByFilterValue, searchSpaceValue], getData);
    const tableRef = useRef(null);
    const loadRef = useRef(null);
    const refreshRef = useRef(null);
    const noDataRef = useRef(null);
    let tableData:any = [];
    let fieldNames:any = [];
    let searchBy:any = [];
    const [searchByField, setSearchByField] = useState<string[]>([]);


    useEffect(()=>{
        getFieldData();
        if(!currentUser.emailVerified){
            (async ()=>{
                await waiting(4000);
                setErrorMessage("Please verify your email - go to settings to start the process");
                await waiting(4000);
                setErrorMessage("");
            })();
        }

        return ()=>{}
    }, []);

    const getFieldData = async ()=>{
        try{
            const res = await fetch(`${process.env.REACT_SERVER_API}/borrowers?fields=true`);
            if(!res.ok) throw new Error("Failed to fetch data");
            const data = await res.json();
            // console.log("_________data_________");
            // console.log(data);
            setSearchByField(data);
        }catch{}
    };


    type stateType = "display data" | "no data" | "loading" | "refresh";

    const dataDisplayStates = (state:stateType)=>{
        if(state=="display data"){
            // @ts-ignore
            if(!noDataRef.current.classList.contains("hidden")){noDataRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!refreshRef.current.classList.contains("hidden")){refreshRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!loadRef.current.classList.contains("hidden")){loadRef.current.classList.add("hidden")}
            // @ts-ignore
            if(tableRef.current.classList.contains("hidden")){tableRef.current.classList.remove("hidden")}
        }else if(state=="no data"){
            // @ts-ignore
            if(noDataRef.current.classList.contains("hidden")){noDataRef.current.classList.remove("hidden")}
            // @ts-ignore
            if(!tableRef.current.classList.contains("hidden")){tableRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!loadRef.current.classList.contains("hidden")){loadRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!refreshRef.current.classList.contains("hidden")){refreshRef.current.classList.add("hidden")}
        }else if(state=="loading"){
            // @ts-ignore
            if(!noDataRef.current.classList.contains("hidden")){noDataRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!tableRef.current.classList.contains("hidden")){tableRef.current.classList.add("hidden")}
            // @ts-ignore
            if(loadRef.current.classList.contains("hidden")){loadRef.current.classList.remove("hidden")}
            // @ts-ignore
            if(!refreshRef.current.classList.contains("hidden")){refreshRef.current.classList.add("hidden")}
        }else if(state=="refresh"){
            // @ts-ignore
            if(!noDataRef.current.classList.contains("hidden")){noDataRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!tableRef.current.classList.contains("hidden")){tableRef.current.classList.add("hidden")}
            // @ts-ignore
            if(!loadRef.current.classList.contains("hidden")){loadRef.current.classList.add("hidden")}
            // @ts-ignore
            if(refreshRef.current.classList.contains("hidden")){refreshRef.current.classList.remove("hidden")}
        }
    }


    const dataDisplayOperations = ()=>{
        try{
            if(status === "success"){
                // @ts-ignore
                searchBy = searchByField.map((elem)=>{return <option value={elem} className='text-xs'>{elem}</option>})
                // @ts-ignore
                if(data[2] == 0){
                    dataDisplayStates("no data");
                    // @ts-ignore
                }else if(data[2] > 0){
                    // @ts-ignore
                   dataDisplayStates('display data');
                // @ts-ignore
                if(data[0] !== undefined || data[0] !== null || Boolean(data[0]) === true){
                    // @ts-ignore
                    fieldNames = data[0]?.map((elem)=>{return<th>{elem}</th>});
                    // @ts-ignore
                    tableData = data[1]?.map((elem:ItableData, i:number)=>{
                        if(i%2 === 0){
                            const translateRight = {
                                transform: "translateX(200px)",
                                opacity: 0
                            }
                            const animateFadeInRight = {
                                transform: `translateX(200px)`,
                                animation: `fadeInRight 0.1s linear ${0.1*i}s 1 forwards`
                            }

                            let fieldVals = Object.values(elem).map((elem2:any)=><td>{elem2}</td>);
                            return (
                                <tr style={{...translateRight, ...animateFadeInRight}}>
                                    <th>{i+1}</th> 
                                    {fieldVals}
                                </tr>
                            );
                        }else{
                            const translateLeft = {
                                transform: "translateX(-200px)",
                                opacity: 0
                            }
                            const animateFadeInLeft = {
                                transform: "translateX(-200px)",
                                animation: `fadeInLeft 0.1s linear ${0.1*i}s 1 forwards`
                            }
                            let fieldVals = Object.values(elem).map((elem2:any)=><td>{elem2}</td>);
                            return (
                                <tr style={{...translateLeft, ...animateFadeInLeft}}>
                                    <th>{i+1}</th>
                                    {fieldVals}
                                </tr>
                            );
                        }
                    })
                }
                }else{
                    dataDisplayStates("loading");
                }
            }else if(status === "loading" || status == "error" || status == "idle"){
                dataDisplayStates("loading");
            }else{
                dataDisplayStates("no data");
            }
        }catch(e){
            try{
                dataDisplayStates("refresh");
            }catch(e){
                // console.log(e);
            }
            // console.error(e);
        }
    }
    dataDisplayOperations();
    

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        if(searchSpace !== ""){
            setSearchByFilterValue(searchByFilter);
            setSearchSpaceValue(searchSpace);
        }else{
            setSearchByFilterValue("");
            setSearchSpaceValue("");

        }
    }

    useLayoutEffect(()=>{
        try{
            // @ts-ignore
            if(data[2] > 1 && pageNum == 0){
                setPageNum(1);
            }
        }catch(e){}
    },[pageNum]);

  return (
    <>
            {
      errorMessage && 
      <>
        <div role="alert" className="alert alert-error fixed left-0 z-50 right-0 top-[0vh] w-[90vw] justify-self-center self-center gap-1 flex-row prompt-anime">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </>
      }
        <div
        className='flex flex-col gap-3 w-full justify-center items-center fixed left-0 right-0 top-11 pt-8 pb-1 bg-base-100 z-20'>
            <div className='flex flex-row justify-between w-full px-5 bg-base-100'>
                <Link href="/transactions" className='shadow-md h-16 w-16 bg-orangered text-white rounded-full self-start justify-self-start flex flex-col justify-center items-center hover:contrast-75 active:scale-95'>
                    <FontAwesomeIcon icon={faMailReply} className='w-5 h-5' />
                    <span className='text-xs font-semibold truncate'>Go Back</span>
                </Link>
                <h1 className='text-3xl font-bold self-center justify-center text-center'>Borrowers</h1>
                <div className='h-16 w-16'></div>
            </div>
            <form onSubmit={handleSubmit} className={`join scale-[75%] sm:scale-75 ${styles.smallScreenSize}`}>
                <label className="tooltip tooltip-top join-item border border-gray-300 flex items-center px-2 py-1 outline-none focus:outline-offset-0 focus:outline-none" data-tip={`Search for an \n item in the table`}>
                    <input type="text" value={searchSpace} onChange={(e)=>setSearchSpace(e.target.value)} className="grow outline-none focus:outline-none bg-base-100 focus:outline-offset-0" placeholder="Search" />
                </label>
                <div >
                </div>
                <button type='submit' className="btn btn-active join-item bg-base-100"
                    // Add tabIndex to make the <div> focusable  
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
                <div className='tooltip tooltip-top ' data-tip={`Pick a keyword to search`}>
                    <select name='filter' id='filter' value={searchByFilter} onChange={(e)=>setSearchByFilter(e.target.value)} className="tooltip tooltip-top select select-bordered join-item w-15 h-10" data-tip={`Pick a keyword to search`}>
                        <option selected value="" className='text-xs'>Search By</option>
                        {searchBy}
                    </select>
                </div>
                <div className='px-3 border-y border-r  w-9 join-item flex flex-row justify-center text-center items-center'>
                    <FontAwesomeIcon icon={faFilter} className="" />
                </div>
            </form>
        </div>
        <div className='h-auto w-full py-2 px-2 mt-52 mb-8'>
            <div className='mx-auto sm:w-10/12 flex flex-col'>
                <div className='w-full h-screen hidden loading-part' ref={loadRef}>
                    <div className='w-full h-[50vh] flex flex-row items-center justify-center'>
                    <span className="loading loading-bars loading-lg"></span>
                    </div>
                </div>
                <div className='w-full h-[70vh] refresh-part relative hidden' ref={refreshRef}>
                    <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full my-auto flex flex-col items-center justify-center'>
                        <h1 className='text-3xl text-center font-extrabold'>Page Failed To Load</h1>
                        <button 
                        className="btn btn-wide" 
                        onClick={()=>{
                            window.location.reload();
                            refetch()
                        }}
                        >Refresh</button>
                    </div>
                </div>
                <div className='w-full h-[70vh] no-data-part relative hidden' ref={noDataRef} >
                    <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full my-auto flex flex-col items-center justify-center'>
                        <h1 className='text-3xl text-center font-extrabold w-3/4 whitespace-break-spaces'>No Data To Display</h1>
                        <button 
                        className="btn btn-wide" 
                        onClick={()=>{
                            refetch()
                            window.location.reload();
                        }}
                        >Refresh</button>
                    </div>
                </div>
                <div className="overflow-x-auto hidden main-data" ref={tableRef}>
                    <table className="table table-zebra-zebra sm:table-xs">
                        <thead>
                            <tr>
                                <th></th> 
                                {fieldNames}
                            </tr>
                        </thead> 
                        <tbody>
                            {tableData}
                        </tbody> 
                        <tfoot>
                        <tr>
                            <th></th> 
                            {fieldNames}
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div id="button-wrapper" className='mt-4 w-full flex flex-col-reverse items-center justify-center sm:scale-75'>
                    <div className="join">
                        <button onClick={()=>{
                            if(pageNum > 1){
                                setPageNum((prev)=> prev - 1);
                            }
                        }} className="join-item btn active:bg-project-blue tooltip tooltip-top" data-tip="Previous Page">«</button>
                        <div className='tooltip tooltip-top' data-tip="Enter a page number">
                            <input id='page-input' className="tooltip tooltip-top join-item text-center w-16 py-3 border-y btn focus:outline-none grow" value={pageNum}
                            onChange={
                                (e)=>{
                                    try{
                                        // @ts-ignore
                                        if(!isNaN(Number(e.target.value)) && Number(e.target.value) < data[2]){
                                            setPageNum(Number(e.target.value));
                                        }
                                        // @ts-ignore
                                        if(!isNaN(Number(e.target.value)) && Number(e.target.value) > data[2]){
                                            // @ts-ignore
                                            setPageNum(data[2])
                                        }
                                    }catch(e){
                                        // console.log(e);
                                    }
                                }
                            }
                            data-tip={`Enter a page number`} />
                        </div>
                        <button
                        onClick={()=>{
                            try{
                                // @ts-ignore
                                if(Boolean(data[2])){
                                    // @ts-ignore
                                    if(pageNum < data[2]){
                                        setPageNum((prev)=>prev+1);
                                    }
                                }
                            }catch(e){
                                // console.log(e);
                            }
                        }}
                        className="join-item btn active:bg-project-blue tooltip tooltip-top" data-tip="Next Page">»</button>
                    </div>
                    <div className='join tooltip tooltip-top' data-tip="Total number of pages">
                        {/* @ts-ignore */}
                        <span className='join-item sm:text-xs'>{
                            (()=>{
                                try{
                                    // @ts-ignore
                                    if(status == "loading" || status == "error" || status == "idle"){
                                        return "0";
                                    }else if(status == "success"){
                                        // @ts-ignore
                                        return data[2];
                                    }
                                }catch(e){
                                    // console.log(e);
                                }
                                
                            })()
                        } pages</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BorrowersPage;