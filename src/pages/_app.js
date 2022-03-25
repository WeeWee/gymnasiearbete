import "../../styles/main.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import NavbarTest from "../components/navbar";
import Searchbar from "../components/searchbar";
import { AuthProvider } from "../components/auth";
import PrivateRoute from "../components/privateroute";
import Account from "./settings/account";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Circleloader from "../components/circleloader";
import { motion } from "framer-motion";
function MyApp({ Component, pageProps }) {
  const [loaded, SetLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => SetLoaded(true), 2000);
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeIn",
      },
    },
  };
  return (
    <motion.div
      className="font-roboto z-0 min-h-screen overflow-hidden"
      variants={variants}
      animate="show"
      initial="hidden"
    >
      <Head>
        <title>Adam Kindberg</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Gymnasie arbete" />
        <meta name="application-name" content="Gymnasie arbete" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <AuthProvider>
        <NavbarTest navlinks={pageProps.navlinks} />
        <Component {...pageProps} />
      </AuthProvider>
    </motion.div>
  );
}

export default MyApp;
