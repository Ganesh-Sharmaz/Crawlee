/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push(
                "crawlee",
                "puppeteer",
                "playwright",
                "puppeteer-core",
                "playwright-core"
            );
        }
        return config;
    },
    eslint: {
        // Warning: Disabling this can make your app less secure or miss important issues.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
