/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,

    // modularizeImports tells Next.js to import only the specific component file
    // instead of loading the entire primereact package on every page
    modularizeImports: {
        'primereact/!(cjs)': {
            transform: 'primereact/{{member}}',
        },
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/pci/dashboard',
                permanent: false,
            },
            {
                source: '/apps/mail',
                destination: '/apps/mail/inbox',
                permanent: true,
            },
        ];
    },

    webpack(config) {
        // Cache primereact across compilations so it's only processed once
        config.cache = {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename],
            },
        };
        return config;
    },
};

module.exports = nextConfig;
