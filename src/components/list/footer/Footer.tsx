import Link from "next/link";
import React from "react";

import "./style.scss";

const Footer = () => {
  return (
    <footer>
    <div className="container footer__container">
      <div className="footer__nav">
        <ul>
          <Link href="/about">Biz haqimizda</Link>
          <li>Toshshirish punktlari</li>
        </ul>
        <ul>
          <Link href="/contact">Bog`lanish</Link>
          <li>Telefon raqam: +998904969007</li>
          <li>Email: shohrux-rustamov@mail.ru</li>
        </ul>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
