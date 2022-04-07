import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../components/auth";
import Navbar from "../components/navbar";
import { Layout } from "../layout/layout";
import { getAuth } from "firebase/auth";
import firebase from "../firebase/clientapp";
import {
  GetDataFromField,
  GetDataFromProfile,
  auth,
} from "../components/fetch";
import { motion } from "framer-motion";
export default function Home(props) {
  const { GetDataFromField, GetDataFromProfile, currentUser } =
    useContext(AuthContext);
  const imgVariants = {
    hidden: { x: "100vw" },
    show: {
      x: "0vw",
      transition: {
        ease: "easeOut",
        duration: 2,
      },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };
  return (
    <div className="pl-4">
      <div id="home"></div>
      <section className="pt-16">
        <h2 className="text-2xl font-bold">Home</h2>
        <motion.div
          className="xxs:w-2/3 xs:w-1/3 sm:w-1/5 h-auto"
          variants={imgVariants}
          animate="show"
          initial="hidden"
        >
          <img className="w-full h-full rounded" src="fillepille.jpg"></img>
        </motion.div>
        <h1>
          Beautiful picture of{" "}
          <a
            href="https://www.instagram.com/filipahlbin/"
            className="hover:text-gray-400"
          >
            Fille
          </a>
        </h1>
      </section>
      <div id="about"></div>
      <motion.div
        className="pt-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold">About</h2>
        <h4 className="text-lg">
          {" "}
          This is roughly how your profile page can look like! <br />
          Sadly i was too ambitious which meant that a bunch of features could
          not be added.
          <br />
          This meant i was dissapointed about the project, but atleast i learnt
          a bunch!
          <br />
          Here is some of the links i used in my project.
          <br />
          Adi, Kukic. (2021, 22 Juli). Next.js 9.3+ Data Fetching Explained:
          getServerSideProps(), getStaticProps() and getStaticPaths(). <br />{" "}
          [Video]. Youtube.{" "}
          <a
            href="https://www.youtube.com/watch?v=eWObYvG0-lI"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>
          . <br /> Hämtad 2021-10-26. <br />
          Auth0. Website. u.å.{" "}
          <a
            href="https://auth0.com/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br /> Dribbble. Website. u.å.
          <a
            href="https://dribbble.com/indieak/collections/5158337-website"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br />
          Firebase. Firebase Documentation.(u.å.)
          <a
            href="https://firebase.google.com/docs"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br /> Framer motion. Examples. u.å.
          <a
            href="https://www.framer.com/docs/examples/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br /> GeeksforGeeks(u.å.)
          <a
            href="https://www.geeksforgeeks.org/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link{" "}
          </a>{" "}
          <br />
          Indeed. u.å{" "}
          <a
            href="https://se.indeed.com/?r=us"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>
          <br />
          Mozilla MDN Web Docs. :autofill.
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/:autofill"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>
          <br /> MongoDB. Website.{" "}
          <a
            href="https://www.mongodb.com/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br />
          Reddit.(u.å.){" "}
          <a
            href="https://www.reddit.com/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br /> Stackoverflow(u.å.)
          <a
            href="https://stackoverflow.com/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            &nbsp;Link
          </a>{" "}
          <br /> Tabnine.(u.å.){" "}
          <a
            href="https://www.tabnine.com/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br /> Tailwindcss(u.å.)
          <a
            href="https://tailwindcss.com/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            {" "}
            Link
          </a>{" "}
          <br />
        </h4>
      </motion.div>
      <div id="portfolio"></div>
      <motion.div
        className="pt-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold">Portfolio</h2>
        <h4 className="text-lg">
          {" "}
          Here you could write about your education, experiences and add a{" "}
          <a
            className="hover:text-gray-400"
            href="https://arbetsformedlingen.se/for-arbetssokande/cv-ansokan-och-intervju/skriva-cv"
          >
            Link{" "}
          </a>
          to companies you've worked for and such.{" "}
        </h4>
      </motion.div>
      <div id="contact"></div>
      <motion.div
        className="pt-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold">Contact</h2>
        <h4 className="text-lg">
          Here you can have your contact details on different social medias.
          <br />
          <a
            href="https://www.instagram.com/adamsluffarliv/"
            className="hover:from-blue-600 hover:to-green from-yellow-600 to-red-600 bg-gradient-to-r text-transparent bg-clip-text"
          >
            Instagram
          </a>
          <br />
          <span className="hover:text-gray-400 text-xl">
            {" "}
            You play fivem?{" "}
            <a
              href="https://discord.gg/glizzy"
              className="from-red-400 to-blue-400 bg-gradient-to-r text-transparent bg-clip-text"
            >
              Join Glizzy RP Discord Server!
            </a>
          </span>
        </h4>
      </motion.div>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      navlinks: [
        { name: "Home", path: "/#home" },
        { name: "About", path: "/#about" },
        { name: "Portfolio", path: "/#portfolio" },
        { name: "Contact", path: "/#contact" },
      ],
    },
  };
}
