import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Можно указать 'https' или оставить пустым для обоих
        hostname: '194.163.151.112',
        port: '9002', // Укажите порт, если он используется
        pathname: '/**', // Разрешает любые пути на этом домене и порту
      },
    ],
  },
};
export default nextConfig;
