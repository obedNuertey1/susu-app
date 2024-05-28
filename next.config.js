/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{NEXT_PUBLIC_REACT_FIREBASE_APIKEY:"AIzaSyBSEsKC8GWFEHpnOD2hhTisEM1Cr7SaLvQ",
    NEXT_PUBLIC_REACT_FIREBASE_AUTHDOMAIN:"susu-app-dev-1d33a.firebaseapp.com",
    NEXT_PUBLIC_REACT_FIREBASE_PROJECTID:"susu-app-dev-1d33a",
    NEXT_PUBLIC_REACT_FIREBASE_STORAGEBUCKET:"susu-app-dev-1d33a.appspot.com",
    NEXT_PUBLIC_REACT_FIREBASE_MESSAGINGSENDERID:"143378439351",
    NEXT_PUBLIC_REACT_FIREBASE_APPID:"1:143378439351:web:4e39ecc3449cdd2d738132",
    NEXT_PUBLIC_REACT_SERVER_API:"https://ec2-13-48-3-253.eu-north-1.compute.amazonaws.com/api/v1",
    NEXT_PUBLIC_CONTINUE_URL:"https://msys-susu.netlify.app/transactions",
    NEXT_PUBLIC_STORAGE_SERVICE_URL: "https://firebasestorage.googleapis.com",
    NEXT_PUBLIC_REACT_SSR_SERVER_API:"http://13.48.3.253:4000/api/v1",
},
    async redirects(){
        return [
            {
                source: '/',
                destination: '/transactions',
                permanent: true, // 308 Permanent Redirect
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com'
            }
        ]
    }
}

module.exports = nextConfig
