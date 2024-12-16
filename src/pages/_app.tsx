
import "@/styles/globals.css";
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

  );
}


