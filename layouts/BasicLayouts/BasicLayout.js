import Header from "@/components/Header";
import classNames from "classnames";
import React from "react";

export default function BasicLayout({ children, className }) {
  return (
    <div
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <div className="content">{children}</div>
    </div>
  );
}
