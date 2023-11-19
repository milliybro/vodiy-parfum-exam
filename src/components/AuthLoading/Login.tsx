import "./Login.scss";
import loading from "@/assets/portfolio-loading.png";
import Image from "next/image";

const Loading = () => {
  return (
    <div id="nima" className="loadingAuth">
      <div className="loading-image">
         <Image src={loading} alt="" />
      </div>
      <div className="loading-text">
         <div className="first">
            <span>M</span>
            <span>i</span>
            <span>l</span>
            <span>l</span>
            <span>i</span>
            <span>y</span>
            <span>B</span>
            <span>r</span>
            <span>o`</span>
            <span>s</span>
         </div>
         <div className="second">
            <span>E</span>
            <span>-</span>
            <span>c</span>
            <span>o</span>
            <span>m</span>
            <span>m</span>
            <span>e</span>
            <span>r</span>
            <span>c</span>
            <span>e</span>
         </div>

      </div>
   </div>
  );
};

export default Loading;