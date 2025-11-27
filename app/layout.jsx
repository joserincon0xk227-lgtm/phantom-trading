import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';

export const metadata = {
  title: 'NYX Cipher',
  description: 'NYX Cipher - Trading Bot Manager',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href='https://fonts.googleapis.com/css?family=Roboto Mono' rel='stylesheet' />
      </head>
      <body>
        <Providers>{children}</Providers>
        {/* Preline script - copy node_modules/preline/dist/preline.js to public/preline.js or use CDN */}
        <Script src="https://cdn.jsdelivr.net/npm/preline@2.0.3/dist/preline.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

