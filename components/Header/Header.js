import React from "react";
import Menu from "./Menu";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
  breakpointUpXl,
} from "../../utils/breakpoints";
import MenuMovil from "./MenuMovil";

export default function Header() {
  const { width } = useWindowSize();

  return (
    <div className="header">
      {width > breakpointUpLg ? <Menu /> : <MenuMovil />}
    </div>
  );
}
