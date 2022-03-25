import { AuthContext } from "../components/auth";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Circleloader from "../components/circleloader";
export default function Signout() {
  const router = useRouter();
  const { SIGNOUT } = useContext(AuthContext);
  useEffect(() => {
    SIGNOUT();
  }, []);
  return <Circleloader />;
}
