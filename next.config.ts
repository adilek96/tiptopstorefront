import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: '194.163.151.112',
        pathname: '/**', 
      },
      {
        protocol: 'https', 
        hostname: 'blob.tiptop.az',
        pathname: '/**', 
      },
    ],
  
  },
};
export default nextConfig;
