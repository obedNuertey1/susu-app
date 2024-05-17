import React from 'react';
import ActivateAccountPage from '../components/ActivateAccountPage/ActivateAccountPage';
import { metadata } from '../layout';

function page({params, searchParams}: {params: {email: string}, searchParams?:{[key: string]:string|string[]|undefined},}) {
    metadata.description = "Activate User's account";
    metadata.title = "MSYS - activate account"
    return (
        <>
            {/* @ts-ignore */}
            <ActivateAccountPage params={params} searchParams={searchParams} />
        </>
    )
}

export default page