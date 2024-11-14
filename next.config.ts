import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{hostname:'http://194.163.151.112:9002/'}], // Замените на свои домены
  },
};

export default nextConfig;
