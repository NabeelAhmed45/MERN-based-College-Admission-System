import React, { useState } from "react";
import "./tabe.css";

const Tabs = ({ tab, setTab, tabs }) => {
  return (
    <div className="tabs">
      {tabs.map((t, index) => (
        <div
          key={index}
          className={t === tab ? "selectedtab" : "tab"}
          onClick={() => setTab(t)}
        >
          {t}
        </div>
      ))}
    </div>
  );
};
export default Tabs;
