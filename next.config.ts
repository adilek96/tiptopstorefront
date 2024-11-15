import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: '194.163.151.112',
        pathname: '/**', 
      },
    ],
  
  },
};
export default nextConfig;
