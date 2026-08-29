import type { NextConfig } from "next";

// Хосты, с которых разрешено грузить картинки товаров. Задаются через
// NEXT_PUBLIC_IMAGE_HOSTS (через запятую) — при переезде на другой домен
// или другое хранилище пересобирать образ с правкой кода не нужно.
const imageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  // Нужен для докер-образа: сборка кладёт самодостаточный сервер
  // в .next/standalone, без него в контейнер пришлось бы тащить node_modules.
  output: "standalone",

  images: {
    remotePatterns: imageHosts.flatMap((hostname) => [
      { protocol: "https" as const, hostname, pathname: "/**" },
      { protocol: "http" as const, hostname, pathname: "/**" },
    ]),
  },
};

export default nextConfig;
