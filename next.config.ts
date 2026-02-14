import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const remotePatterns: RemotePattern[] = [
	{
		protocol: "https",
		hostname: "res.cloudinary.com",
		pathname: "/**"
	}
];

// Derive backend image pattern from API_URL
const apiUrl = process.env.API_URL;
if (apiUrl) {
	try {
		const parsed = new URL(apiUrl);
		remotePatterns.push({
			protocol: parsed.protocol.replace(":", "") as "http" | "https",
			hostname: parsed.hostname,
			...(parsed.port ? { port: parsed.port } : {}),
			pathname: "/img/**"
		});
	} catch {
		// ignore invalid URL
	}
}

const nextConfig: NextConfig = {
	images: {
		remotePatterns,
		unoptimized: process.env.NODE_ENV === 'development'
	}
};

export default nextConfig;
