
import "@/styles/globals.css";
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

  );
}


