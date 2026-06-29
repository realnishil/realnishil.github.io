import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Nishil Bhimani Portfolio - Cybersecurity Engineering Student</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Nishil Bhimani Portfolio - Cybersecurity Engineering Student" />
            <meta name="description"
                content="Nishil Bhimani's (realnishil) Personal Portfolio Website. A Linux desktop simulation made with Next.js and Tailwind CSS." />
            <meta name="author" content="Nishil Bhimani (realnishil)" />
            <meta name="keywords"
                content="realnishil, nishil bhimani portfolio, nishil bhimani macos, nishil bhimani cybersecurity, nishil bhimani, nishil bhimani developer portfolio, nishil bhimani osint" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#9966FF" />

            {/* PWA */}
            <link rel="manifest" href="manifest.json" />

            {/* Search Engine */}
            <meta name="image" content="images/logos/logo_1200.png" />
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Nishil Bhimani Portfolio - Cybersecurity Engineering Student" />
            <meta itemProp="description"
                content="Nishil Bhimani's (realnishil) Personal Portfolio Website. A Linux desktop simulation made with Next.js and Tailwind CSS." />
            <meta itemProp="image" content="images/logos/logo_1200.png" />
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Nishil Bhimani Portfolio - Cybersecurity Engineering Student" />
            <meta name="twitter:description"
                content="Nishil Bhimani's (realnishil) Personal Portfolio Website. A Linux desktop simulation made with Next.js and Tailwind CSS." />
            <meta name="twitter:site" content="@notnishil" />
            <meta name="twitter:creator" content="@notnishil" />
            <meta name="twitter:image" content="images/logos/logo_1200.png" />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content="Nishil Bhimani Portfolio - Cybersecurity Engineering Student" />
            <meta name="og:description"
                content="Nishil Bhimani's (realnishil) Personal Portfolio Website. A Linux desktop simulation made with Next.js and Tailwind CSS." />
            <meta name="og:image" content="images/logos/logo_1200.png" />
            <meta name="og:image:width" content="1200" />
            <meta name="og:image:height" content="630" />
            <meta name="og:url" content="https://realnishil.github.io/" />
            <meta name="og:site_name" content="Nishil Bhimani Personal Portfolio" />
            <meta name="og:locale" content="en_IN" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="favicon.ico" sizes="any" />
            <link rel="icon" type="image/png" sizes="32x32" href="images/logos/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="images/logos/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="images/logos/apple-touch-icon.png" />
            <meta name="msapplication-TileColor" content="#9966FF" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        </Head>
    )
}
