'use client';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMailForward, faMailReply} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import {Animated} from "react-animated-css";
import styles from "./borrowers.module.css";
import "./borrowers.css";

interface ItableArr {
    name: String;
    job: String;
    company: String;
    location: String;
    "Last Login": String;
    "Favorite Color": String;
}

function Borrowers() {
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

    const tableData = tableArr.map((elem:ItableArr, i:number)=>{
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
                    <td>{elem.name}</td> 
                    <td>{elem.job}</td> 
                    <td>{elem.company}</td> 
                    <td>{elem.location}</td> 
                    <td>{elem['Last Login']}</td> 
                    <td>{elem['Favorite Color']}</td>
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
                    <td>{elem.name}</td> 
                    <td>{elem.job}</td> 
                    <td>{elem.company}</td> 
                    <td>{elem.location}</td> 
                    <td>{elem['Last Login']}</td> 
                    <td>{elem['Favorite Color']}</td>
                </tr>
            );
        }
    })

  return (
    <>
        <div className='flex flex-col gap-3 w-full justify-center items-center fixed left-0 right-0 top-11 pt-8 pb-1 bg-white z-20'>
            <div className='flex flex-row justify-between w-full px-5'>
                <Link href="/transactions" className='shadow-md h-16 w-16 bg-orangered text-white rounded-full self-start justify-self-start flex flex-col justify-center items-center hover:contrast-75 active:scale-95'>
                    <FontAwesomeIcon icon={faMailReply} className='w-5 h-5' />
                    <span className='text-xs font-semibold truncate'>Go Back</span>
                </Link>
                <h1 className='text-3xl font-bold self-center justify-center text-center'>Borrowers</h1>
                <div className='h-16 w-16'></div>
            </div>
            <div className='join scale-75 sm:scale-75'>
                <label className="tooltip tooltip-top join-item border border-gray-300 flex items-center px-2 py-1 outline-none focus:outline-offset-0 focus:outline-none" data-tip={`Search for an \n item in the table`}>
                    <input type="text" className="grow outline-none focus:outline-none focus:outline-offset-0" placeholder="Search" />
                </label>
                <div className="btn join-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </div>
                <div className='tooltip tooltip-top ' data-tip={`Pick a keyword to search`}>
                    <select name='filter' id='filter' className="tooltip tooltip-top select select-bordered join-item w-15 h-10" data-tip={`Pick a keyword to search`}>
                        <option selected disabled className='text-xs'>Search By</option>
                        <option value='val2' className='text-xs'>val1</option>
                        <option value='val2' className='text-xs'>val2</option>
                    </select>
                </div>
                <div className='px-3 border-y border-r  text-gray-700 w-9 join-item flex flex-row justify-center text-center items-center'>
                    <FontAwesomeIcon icon={faFilter} className="" />
                </div>
            </div>
        </div>
        <div className='h-auto w-full py-2 px-2 mt-52 mb-8'>
            <div className='mx-auto sm:w-10/12 flex flex-col'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra-zebra sm:table-xs">
                        <thead>
                            <tr>
                                <th></th> 
                                <th>Name</th> 
                                <th>Job</th> 
                                <th>company</th> 
                                <th>location</th> 
                                <th>Last Login</th> 
                                <th>Favorite Color</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {tableData}
                        </tbody> 
                        <tfoot>
                        <tr>
                            <th></th> 
                            <th>Name</th> 
                            <th>Job</th> 
                            <th>company</th> 
                            <th>location</th> 
                            <th>Last Login</th> 
                            <th>Favorite Color</th>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <div id="button-wrapper" className='mt-4 w-full flex flex-col-reverse items-center justify-center sm:scale-75'>
                    <div className="join">
                        <button className="join-item btn active:bg-project-blue tooltip tooltip-top" data-tip="Previous Page">«</button>
                        <div className='tooltip tooltip-top' data-tip="Enter a page number">
                            <input id='page-input' className="tooltip tooltip-top join-item text-center w-16 py-3 border-y border-y-gray-300 sm:border-y-gray-300 focus:outline-none grow" value={2} data-tip={`Enter a page number`} />
                        </div>
                        <button className="join-item btn active:bg-project-blue tooltip tooltip-top" data-tip="Next Page">»</button>
                    </div>
                    <div className='join tooltip tooltip-top' data-tip="Total number of pages">
                        <span className='join-item sm:text-xs'>4 pages</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Borrowers