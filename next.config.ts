import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const domain = process.env.DOMAIN;
const remotePatterns: RemotePattern[] = [
	{
		protocol: "https",
		hostname: "res.cloudinary.com",
		pathname: "/**"
	},
	{
		protocol: "http",
		hostname: "localhost",
		port: "3000",
		pathname: "/img/**"
	},
	{
		protocol: "http",
		hostname: "127.0.0.1",
		port: "3000",
		pathname: "/img/**"
	}
];

if (domain) {
	remotePatterns.unshift({
		protocol: "http",
		hostname: domain,
		pathname: "/img/**"
	});
}

const nextConfig: NextConfig = {
	images: {
		remotePatterns,
		unoptimized: process.env.NODE_ENV === 'development'
	}
};

export default nextConfig;
