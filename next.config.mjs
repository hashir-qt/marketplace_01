/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https", // Protocol of the remote source
          hostname: "cdn.sanity.io", // The domain of the remote source
          port: "", // Leave empty for default ports (80 for HTTP, 443 for HTTPS)
        },
      ],
    },
  };
  
  export default nextConfig;
  