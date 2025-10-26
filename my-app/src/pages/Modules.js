import React from "react";
import styles from "./Modules.module.css";
import looping from "./Modules/looping"; // import module descriptors

// Only include title & pdfUrl
const moduleList = [
  { title: looping.title, pdfUrl: looping.pdfUrl },
  // add more modules here
];

export default function Modules({ onNavigate }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>List of Modules</h1>

      <ul className={styles.moduleList}>
        {moduleList.map((mod, index) => (
          <li
            key={index}
            className={styles.moduleLink}
            onClick={() => onNavigate("module", { module: mod })} // navigate to builder
          >
            {mod.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
