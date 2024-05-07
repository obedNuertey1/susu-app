"use client";
import {useRouter} from 'next/navigation';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const {logout, userCredential}:any = useAuth();
  
  const iLogout = async ()=>{
    try{
      console.log(JSON.stringify(userCredential));
      await logout();
      console.log("It worked this is the user credential");
      console.log(JSON.stringify(userCredential));
    }catch{
      console.log("failed to logout");
    }
  }
  iLogout();
  
  const router = useRouter();
  router.push("/transactions")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
