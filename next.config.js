/** @type {import('next').NextConfig} */
const nextConfig = {
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
