import { Metadata } from "next";
import Image from "next/image";

import about from "@/assets/about-main.jpg";

import "./style.scss";

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description: "Vodiy Parfum | Biz haqimizda",
};

const AboutPage = () => {
  return (
    <section className="about">
      <div className="container about__container">
        <div className="about__main">
          <div className="about__img">
            <Image src={about} alt="about" fill objectFit="cover" />
          </div>
          <div className="about__desc">
            <h2>Biz haqimizda</h2>
            <p>
              “Vodiy Parfum” – elektron tijorat shaklida faoliyat yurituvchi
              O‘zbekistondagi ilk kompaniyalardan biridir. Unga 2023-yilda Shohruh Rustamov tomonidan asos solingan va bugungi
              kunga kelib 100 dan ortiq xodim ishlaydigan, 8 ta offlayn do‘konga
              va hamkor sifatida ishlovchi 9 ta bo‘limga ega.
            </p>
            <p>
              Kompaniya asoschi Shohruh Rustamov bakalavr bosqichidagi
              ta’limni yakunlagach, magistraturani Fransiyada davom ettiradi.
              Fotograflikka qiziqqan bo‘lajak tadbirkor Fransiyadagi
              internet-do‘konlardan qurilmalar narxini aniqlash jarayonida
              elektron tijorat faoliyatiga ham qiziqib qoladi va yaqindan
              o‘rganib chiqadi. Bu esa, keyinchalik Vodiy Parfum kompaniyasiga asos
              solinishida ahamiyat kasb etadi.
            </p>
            <p>
              400 AQSH dollari bilan ish boshlagan ushbu kompaniya bir yildan
              so‘ng o‘zining elektron tijoriy sahifasiga ega bo‘ldi. Faoliyati
              davomida turli qiyinchiliklarni boshidan o‘ tkazgan kompaniya o‘z
              taraqqiyoti davomida 2 marta jiddiy moliyaviy inqiroz arafasiga
              kelgan. Shundan so‘ng, vujudga kelgan holatlardan samarali xulosa
              chiqargan holda, kompaniyaning strategiyasi qayta ko‘rib chiqiladi
              hamda tizim bosqichma-bosqich avtomatlashtiriladi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
