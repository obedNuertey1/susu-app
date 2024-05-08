export default function waiting(ms:number):Promise<any>{
    return new Promise((res)=>{
        return setTimeout(res, ms);
    })
}