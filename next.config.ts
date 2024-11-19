import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  webpack: config => {
    config.externals.push({
      "utf-8-validate":"commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });
    config.externals.push('bcryptjs');
    return config;
  },
  images:{
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.iconfinder.com'
      },
    ]
  },
};

export default nextConfig;
