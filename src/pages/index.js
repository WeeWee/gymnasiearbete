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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          pharetra eget nulla at vehicula. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Donec a quam non
          erat mollis accumsan in non magna. Etiam vitae risus vel justo
          malesuada aliquet non eu sem. Donec ut facilisis urna. Etiam malesuada
          convallis erat at condimentum. Donec iaculis rhoncus laoreet. Sed sed
          quam a eros vestibulum egestas. Nam sollicitudin id nisi at gravida.
          Duis ut consequat lorem. Sed a purus id lectus fringilla placerat non
          at eros. Etiam nulla justo, viverra et risus vel, hendrerit maximus
          est. Donec mi elit, placerat et ipsum at, condimentum ullamcorper
          sapien. Suspendisse potenti. Fusce porta elementum urna a blandit. Sed
          porta ligula tortor, viverra bibendum enim dictum id. Sed id orci
          lectus. Ut vitae dignissim ex, quis lacinia odio. Morbi sollicitudin
          nunc a nibh viverra iaculis. Sed nec tincidunt arcu, vel lobortis
          augue. Duis sed tortor sed nulla scelerisque posuere. Mauris sagittis
          sodales quam eu sagittis. Vivamus odio nulla, efficitur at posuere at,
          facilisis at mi. Nulla malesuada diam vel arcu pulvinar efficitur.
          Proin non lacus erat. Vestibulum eu tortor at magna pulvinar commodo.
          Duis eget semper felis.{" "}
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          pharetra eget nulla at vehicula. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Donec a quam non
          erat mollis accumsan in non magna. Etiam vitae risus vel justo
          malesuada aliquet non eu sem. Donec ut facilisis urna. Etiam malesuada
          convallis erat at condimentum. Donec iaculis rhoncus laoreet. Sed sed
          quam a eros vestibulum egestas. Nam sollicitudin id nisi at gravida.
          Duis ut consequat lorem. Sed a purus id lectus fringilla placerat non
          at eros. Etiam nulla justo, viverra et risus vel, hendrerit maximus
          est. Donec mi elit, placerat et ipsum at, condimentum ullamcorper
          sapien. Suspendisse potenti. Fusce porta elementum urna a blandit. Sed
          porta ligula tortor, viverra bibendum enim dictum id. Sed id orci
          lectus. Ut vitae dignissim ex, quis lacinia odio. Morbi sollicitudin
          nunc a nibh viverra iaculis. Sed nec tincidunt arcu, vel lobortis
          augue. Duis sed tortor sed nulla scelerisque posuere. Mauris sagittis
          sodales quam eu sagittis. Vivamus odio nulla, efficitur at posuere at,
          facilisis at mi. Nulla malesuada diam vel arcu pulvinar efficitur.
          Proin non lacus erat. Vestibulum eu tortor at magna pulvinar commodo.
          Duis eget semper felis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Pellentesque pharetra eget nulla at vehicula. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Donec a quam non erat mollis accumsan in non magna.
          Etiam vitae risus vel justo malesuada aliquet non eu sem. Donec ut
          facilisis urna. Etiam malesuada convallis erat at condimentum. Donec
          iaculis rhoncus laoreet. Sed sed quam a eros vestibulum egestas. Nam
          sollicitudin id nisi at gravida. Duis ut consequat lorem. Sed a purus
          id lectus fringilla placerat non at eros. Etiam nulla justo, viverra
          et risus vel, hendrerit maximus est. Donec mi elit, placerat et ipsum
          at, condimentum ullamcorper sapien. Suspendisse potenti. Fusce porta
          elementum urna a blandit. Sed porta ligula tortor, viverra bibendum
          enim dictum id. Sed id orci lectus. Ut vitae dignissim ex, quis
          lacinia odio. Morbi sollicitudin nunc a nibh viverra iaculis. Sed nec
          tincidunt arcu, vel lobortis augue. Duis sed tortor sed nulla
          scelerisque posuere. Mauris sagittis sodales quam eu sagittis. Vivamus
          odio nulla, efficitur at posuere at, facilisis at mi. Nulla malesuada
          diam vel arcu pulvinar efficitur. Proin non lacus erat. Vestibulum eu
          tortor at magna pulvinar commodo. Duis eget semper felis.{" "}
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
          Etiam nulla justo, viverra et risus vel, hendrerit maximus est. Donec
          mi elit, placerat et ipsum at, condimentum ullamcorper sapien.
          Suspendisse potenti. Fusce porta elementum urna a blandit. Sed porta
          ligula tortor, viverra bibendum enim dictum id. Sed id orci lectus. Ut
          vitae dignissim ex, quis lacinia odio. Morbi sollicitudin nunc a nibh
          viverra iaculis. Sed nec tincidunt arcu, vel lobortis augue. Duis sed
          tortor sed nulla scelerisque posuere. Mauris sagittis sodales quam eu
          sagittis. Vivamus odio nulla, efficitur at posuere at, facilisis at
          mi. Nulla malesuada diam vel arcu pulvinar efficitur. Proin non lacus
          erat. Vestibulum eu tortor at magna pulvinar commodo. Duis eget semper
          felis. Curabitur sed hendrerit sapien. Aenean varius tortor vel
          maximus efficitur. In magna nunc, finibus at ultrices a, blandit vel
          justo. Pellentesque justo massa, suscipit in est sollicitudin, posuere
          gravida est. In eu luctus turpis. Maecenas a viverra erat. Curabitur
          et porta libero, nec lacinia mauris. Etiam id est elit. Sed eget orci
          non augue sagittis eleifend. Phasellus ultrices dapibus ante, ac
          vulputate lorem pretium ac. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Pellentesque pharetra eget nulla at vehicula. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Donec a quam non erat mollis accumsan in non magna.
          Etiam vitae risus vel justo malesuada aliquet non eu sem. Donec ut
          facilisis urna. Etiam malesuada convallis erat at condimentum. Donec
          iaculis rhoncus laoreet. Sed sed quam a eros vestibulum egestas. Nam
          sollicitudin id nisi at gravida. Duis ut consequat lorem. Sed a purus
          id lectus fringilla placerat non at eros. Etiam nulla justo, viverra
          et risus vel, hendrerit maximus est. Donec mi elit, placerat et ipsum
          at, condimentum ullamcorper sapien. Suspendisse potenti. Fusce porta
          elementum urna a blandit. Sed porta ligula tortor, viverra bibendum
          enim dictum id. Sed id orci lectus. Ut vitae dignissim ex, quis
          lacinia odio. Morbi sollicitudin nunc a nibh viverra iaculis. Sed nec
          tincidunt arcu, vel lobortis augue. Duis sed tortor sed nulla
          scelerisque posuere. Mauris sagittis sodales quam eu sagittis. Vivamus
          odio nulla, efficitur at posuere at, facilisis at mi. Nulla malesuada
          diam vel arcu pulvinar efficitur. Proin non lacus erat. Vestibulum eu
          tortor at magna pulvinar commodo. Duis eget semper felis. Nulla
          malesuada diam vel arcu pulvinar efficitur. Proin non lacus erat.
          Vestibulum eu tortor at magna pulvinar commodo. Duis eget semper
          felis.
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
