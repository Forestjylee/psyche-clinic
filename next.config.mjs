/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 静态导出可部署到 Cloudflare Pages（后续启用）
  // output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
