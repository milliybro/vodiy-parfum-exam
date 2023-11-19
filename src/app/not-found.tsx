import errorGif from "../assets/error.gif"
import Image from "next/image";
import "./not-found.scss"
import Link from "next/link";


const NotFoundPage: React.FC<{ error: string }> = ({ error }) => {
  return <section className="page_404">
  <div className="containerr">
    <div className="row">
      <div className="col-sm-12 ">
        <div className="not-found col-sm-10 col-sm-offset-1  text-center">
          <div className="not-found-image">

          <Image  src={errorGif} alt="error" />
          </div>
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>
          <div className="contant_box_404">
            <h3 className="h2">Nimadir xato ketdi</h3>

            <p>{error}!</p>

            <Link href="/" className="link_404">
              Bosh sahifaga o`tish
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>;
};

export default NotFoundPage;
