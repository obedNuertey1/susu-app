import React from 'react'

function page({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    const {email}:any = searchParams
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='max-w-sm m-auto w-10/12 items-center justify-center flex flex-col'>
                <div className="card card-bordered card-normal shadow-lg rounded-md p-4">
                    <div className="card-title"><h1 className='text-center w-full text-primary'>Activate your account</h1></div>
                    <div className="card-body">
                    <p className='text-center'>You need to activate your account. An email has been sent to {email}. Visit your email to activate your account and continue</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page