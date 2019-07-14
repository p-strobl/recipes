import React from "react";

import Navigation from "../c-003-Navigation";
import Routes from "../../routes";
import Footer from "../c-004-Footer";

export default function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}