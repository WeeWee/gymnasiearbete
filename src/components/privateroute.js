import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./auth";
import Link from "next/link";
const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  return (routeProps) =>
    !!currentUser ? <RouteComponent {...routeProps} /> : router.push("/login");
};

export default PrivateRoute;
