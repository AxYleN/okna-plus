import React from 'react';
import Navbar from '../Navbar/Navbar';

import './PageLayout.css';

export default function PageLayout(props) {
  const { children, backLink = '/' } = props;

  return (
    <>
      <Navbar backLink={backLink} />
      <main className="page-layout-container">{children}</main>
    </>
  );
}
