'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMailForward, faMailReply} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import styles from "./borrowers.module.css";
import "./borrowers.css";
import { useQuery } from 'react-query';
import { chunk } from 'lodash';

async function getData(key:any){
    try{
      const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
      if(!res.ok){
        throw new Error("Network response was not ok");
      }
  
      const obj1 = await res.json();
      const obj0 = obj1.map((elem:any)=>{
        return {
            "id": elem.id,
            "name": elem.name,
            "username": elem.username,
            "email": elem.email,
            "address street": elem.address.street,
            "address suite": elem.address.suite,
            "address city": elem.address.city,
            "address zipcode": elem.address.zipcode,
            "address geo lat": elem.address.geo.lat,
            "address geo lng": elem.address.geo.lng,
            "phone": elem.phone,
            "website": elem.website,
            "company name": elem.company.name,
            "company catchPhrase": elem.company.catchPhrase,
            "company bs": elem.company.bs
        }
      });
      let obj2 = obj1.map((elem:any)=>{
        return {
            "id": elem.id,
            "name": elem.name,
            "username": elem.username,
            "email": elem.email,
            "address street": elem.address.street,
            "address suite": elem.address.suite,
            "address city": elem.address.city,
            "address zipcode": elem.address.zipcode,
            "address geo lat": elem.address.geo.lat,
            "address geo lng": elem.address.geo.lng,
            "phone": elem.phone,
            "website": elem.website,
            "company name": elem.company.name,
            "company catchPhrase": elem.company.catchPhrase,
            "company bs": elem.company.bs
        }
      });

      if(key?.queryKey[1] === "" && key?.queryKey[2] !== ""){
        obj2 = obj2.filter((elem:any)=>(
            String(elem.id).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem.name).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem.username).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem.email).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["address street"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["address suite"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["address city"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["address zipcode"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["address geo lat"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["address geo lng"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem.phone).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem.website).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["company name"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["company catchPhrase"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["company catchPhrase"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase()) ||
            String(elem["company bs"]).toLowerCase().includes((key?.queryKey[2]).toLowerCase())
        ))
      }else if(key?.queryKey[1] !== "" && key?.queryKey[2] !== ""){
        obj2 = obj2.filter((elem:any)=>(String(elem[`${key?.queryKey[1]}`]).toLowerCase().includes((key?.queryKey[2]).toLowerCase())))
      }else{
        obj2 = obj1.map((elem:any)=>{
            return {
                "id": elem.id,
                "name": elem.name,
                "username": elem.username,
                "email": elem.email,
                "address street": elem.address.street,
                "address suite": elem.address.suite,
                "address city": elem.address.city,
                "address zipcode": elem.address.zipcode,
                "address geo lat": elem.address.geo.lat,
                "address geo lng": elem.address.geo.lng,
                "phone": elem.phone,
                "website": elem.website,
                "company name": elem.company.name,
                "company catchPhrase": elem.company.catchPhrase,
                "company bs": elem.company.bs
            }
          });
      }

      const obj3 = chunk(obj2, 3);

      const keysAndEntries = [Object?.keys(obj0[0]), obj3[key?.queryKey[0]], obj3.length];
      return keysAndEntries;
   
    }catch(e){
      console.error(e);
    }
}

interface ItableArr {
    name: String;
    job: String;
    company: String;
    location: String;
    "Last Login": String;
    "Favorite Color": String;
}

interface Itabledata{
    id: string;
    name: string;
    username: string;
    email: string;
    "address street": string;
    "address suite": string;
    "address city": string;
    "address zipcode": string;
    "address geo lat": string;
    "address geo lng": string;
    phone: string;
    website: string;
    "company name": string;
    "company catchPhrase": string;
    "company bs": string;
}

function BorrowersPage() {
    const [pageNum, setPageNum] = useState(1);
    const [searchByFilter, setSearchByFilter] = useState("");
    const [searchSpace, setSearchSpace] = useState("");
    const [searchByFilterValue, setSearchByFilterValue] = useState("");
    const [searchSpaceValue, setSearchSpaceValue] = useState("");
    const {status, data, refetch} = useQuery([pageNum-1, searchByFilterValue, searchSpaceValue], getData);
    const tableRef = useRef(null);
    const loadRef = useRef(null);
    const refreshRef = useRef(null);
    const noDataRef = useRef(null);

    const tableArr:ItableArr[] = [
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
        {
            name: "Cy Ganderton",
            job: "Quality Control Specialist",
            location: "Canada",
            "Last Login": "12/16/2020",
            "Favorite Color": "Blue",
            company: "Littel, Schaden and Vandervort"
        },
    ];

    let tableData:any = [];
    let fieldNames:any = [];
    let searchBy:any = [];

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
                searchBy = data[0]?.map((elem)=>{return <option value={elem} className='text-xs'>{elem}</option>})
                // @ts-ignore
                if(data[2] == 0){
                    dataDisplayStates("no data");
                    // @ts-ignore
                }else if(data[2] > 0){
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
                            return (
                                <tr style={{...translateRight, ...animateFadeInRight}}>
                                    <th>{i+1}</th> 
                                    <td>{elem.id}</td> 
                                    <td>{elem.name}</td> 
                                    <td>{elem.username}</td> 
                                    <td>{elem.email}</td> 
                                    <td>{elem['address street']}</td> 
                                    <td>{elem['address suite']}</td>
                                    <td>{elem['address city']}</td>
                                    <td>{elem['address zipcode']}</td>
                                    <td>{elem['address geo lat']}</td>
                                    <td>{elem['address geo lng']}</td>
                                    <td>{elem.phone}</td>
                                    <td>{elem.website}</td>
                                    <td>{elem['company name']}</td>
                                    <td>{elem['company catchPhrase']}</td>
                                    <td>{elem['company bs']}</td>
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
                            return (
                                <tr style={{...translateLeft, ...animateFadeInLeft}}>
                                    <th>{i+1}</th> 
                                    <td>{elem.id}</td> 
                                    <td>{elem.name}</td> 
                                    <td>{elem.username}</td> 
                                    <td>{elem.email}</td> 
                                    <td>{elem['address street']}</td> 
                                    <td>{elem['address suite']}</td>
                                    <td>{elem['address city']}</td>
                                    <td>{elem['address zipcode']}</td>
                                    <td>{elem['address geo lat']}</td>
                                    <td>{elem['address geo lng']}</td>
                                    <td>{elem.phone}</td>
                                    <td>{elem.website}</td>
                                    <td>{elem['company name']}</td>
                                    <td>{elem['company catchPhrase']}</td>
                                    <td>{elem['company bs']}</td>
                                </tr>
                            );
                        }
                    })
                }
                }else{
                    dataDisplayStates("loading");
                }
            }else if(status === "loading"){
                dataDisplayStates("loading");
            }else if(status == "error" || status == "idle"){
                 dataDisplayStates("refresh");
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


  return (
    <>
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
                                        if(Number(e.target.value) > data[2]){
                                            // @ts-ignore
                                            setPageNum(Number(data[2]))
                                        }else if(Number(e.target.value) < 1){
                                            setPageNum(1);
                                        }else if(isNaN(Number(e.target.value))){
                                            // setPageNum(1);
                                        }else{
                                            setPageNum(Number(e.target.value));
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