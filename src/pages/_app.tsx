
import "@/styles/globals.css";
<<<<<<< HEAD
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dotenv from "dotenv";
dotenv.config();


export default function App({ Component, pageProps }: AppProps) {


  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true); // بدء اللودينج
    const handleComplete = () => setLoading(false); // إنهاء اللودينج

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // تنظيف الأحداث عند إلغاء المكون
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);


  return (
    <>
      <Head>
        <title>Vf-cash</title>
        <link rel="shortcut icon" href="/mobile-money.png" />
        <meta name="url" content={typeof window !== "undefined" ? window.location.origin : "/"} />
      </Head>
      {loading && <div className="loading-overlay">Loading...</div>}
      <Component {...pageProps} />

    </>
=======
import '@fortawesome/free-solid-svg-icons'




import { AnimatePresence } from "framer-motion";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense} from "react";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { defaultLocale, locale, basePath, ...rest } = router;
  return (
    <>
      
        <Head>
          <title>Vf-cash</title>
          <meta
            name="image"
            content={
              typeof window !== "undefined"
                ? window.location.origin + "/Container.png"
                : "/Container.png"
            }
          />
          <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
          <link rel="shortcut icon" href="/mobile-money.png" />
          <meta
            name="url"
            content={
              typeof window !== "undefined" ? window.location.origin : "/"
            }
          />
        </Head>
        <NextIntlClientProvider
          locale={router.locale}
          timeZone="Egypt/Cairo"
          messages={pageProps.messages}
        >
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </NextIntlClientProvider>
      </>
>>>>>>> 290ede3709e415cc2dfdd9e63c24115e614456d6

  );
}


