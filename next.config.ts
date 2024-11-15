import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: '194.163.151.112',
        port: '9002', 
        pathname: '/**', 
      },
    ],
    domains: ['194.163.151.112'],
  },
};
export default nextConfig;
