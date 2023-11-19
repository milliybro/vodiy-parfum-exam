import { Metadata } from "next";

import "./style.scss";
import CheckClient from "@/components/contact/contact";

export const metadata: Metadata = {
  title: "Bog`lanish",
  description:
    "Vodiy Parfum | Bog`lanish",
};

const ContactPage = () => {
  return <div id="contact" className="container">Biz bilan bog`lanish
    <CheckClient />
  </div>;
};

export default ContactPage;
