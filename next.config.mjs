const basePath = process.env.BASE_PATH;

/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
