"use client";
import { useState } from "react";
import "./contact.scss";
import Image from "next/image";

import telegram from "@/assets/telegram.png"
import facebook from "@/assets/facebook.png"


const CheckClient = () => {
  const adminEmail = "shohrux-rustamov@mail.ru";

  const [text, setText] = useState<string>("");

  const messageAdmin = () => {
    const subject = "Admin uchun xabar";
    const body = "Salom Admin";
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };
  const textMessage = (str: string) => {
    setText(str);
  };
  return (
    <div className="modal-overlay">
      <div
        className="modal client_checking"
        style={{
          maxWidth: "700px",
          backgroundColor: "#ffa700",
          color: "black",
        }}
      >
         <div className="telegram">
            <Image src={telegram} alt="" />
            <h2>@milliyBro</h2>
         </div>
         <div className="facebook">
            <Image src={facebook} alt="" />
            <h2>@milliyBro</h2>
         </div>
        <div className="modal-actions">
          <button onClick={messageAdmin}>Xabar yuborish</button>
        </div>
      </div>
    </div>
  );
};

export default CheckClient;
