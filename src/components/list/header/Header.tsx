"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useScreenSize from "@/utils/useScreen";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import Cookies from "js-cookie";

import useCart from "@/store/cart";
import useFav from "@/store/fav";
import useAuth from "@/store/auth";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import Image from "next/image";

import uzb from "@/assets/flagInUzb.png";
import leaf from "@/assets/leaf.png";
import logo from "@/assets/logo.png";

import { USER_DATA, USER_TOKEN } from "@/constants";


import "./style.scss";

const Header = () => {
  const screenSize = useScreenSize();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [totalFav, setTotalFav] = useState(0);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [ordersTotal, setOrdersTotal] = useState(0);

  const {isAuthenticated, user, setIsAuthenticated} = useAuth();
  const { cart, orders, getOrders } = useCart();
  const { cart: favCart } = useFav();

  const router = useRouter();

  useEffect(() => {
    if (screenSize > 650) {
      setIsNavOpen(false);
    }

  }, [screenSize]);

  const controlNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    isAuthenticated && getOrders();
  }, [getOrders, isAuthenticated])

  const logout = () => {
    localStorage.removeItem(USER_DATA);
    Cookies.remove(USER_TOKEN);
    setIsAuthenticated(user);
    handleClose();
    toast.info("You are logged out")
    router.push("/")
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    setTotalCart(cart.length);
    setTotalFav(favCart.length)
    setAuthenticated(isAuthenticated)
    setOrdersTotal(orders.length);
  }, [cart.length, favCart.length, isAuthenticated, orders.length])

  return (
    <header>
      <nav className="up-nav">
        <div className="container up-nav-container">
          <p style={{ display: "flex" }}>
            {" "}
            Maqsadimiz insonlar salomatligi
            <Image src={leaf} alt="" width={20} />
          </p>
          <p>Buyurtmangizni 1-3 kunda bepul yetkazib beramiz!</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link href="/orders">Buyurtmalarim</Link>
            <p className="language">
              <Image src={uzb} alt="" />
              O`zbekcha
            </p>
          </div>
        </div>
      </nav>
      <nav className="nav">
        <div className="container nav__container">
          <div
            className="nav__logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Image src={logo} alt="" width={42} />
            <Link href="/">Vodiy Parfum</Link>
          </div>
          <ul className="nav__menu">
            <li className="nav__item">
              <Link className="nav__cart" href="/allproducts">
                <p>Mahsulotlar</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/about">
                <p>Biz haqimizda</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/contact">
                <p>Bog`lanish</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__cart"
                href="/favourite"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Badge badgeContent={favCart.length} color="primary">
                  <FavoriteBorderOutlinedIcon />
                </Badge>
                <p>Saralanganlar</p>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__cart" href="/cart">
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingBagOutlinedIcon />
                </Badge>
                <p>Savat</p>
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav__item">
                <Link className="nav__login" href="/account">
                  Account
                </Link>
              </li>
            ) : (
              <li className="nav__item">
                <Link className="nav__login" href="/login">
                  Kirish
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              <li className="nav__item">
                <button onClick={logout} className="nav__register__btn">
                  <LogoutIcon />
                </button>
              </li>
            ) : (
              <li className="nav__item">
                <Link
                  className="nav__register"
                  href="/register"
                  style={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center"}}
                >
                  Ro`yxatdan o`tish
                </Link>
              </li>
            )}
          </ul>
          {isNavOpen ? (
            <ul className="nav__res__menu">
              <li className="nav__item">
                <Link className="nav__cart" href="/allproducts">
                  <p>Mahsulotlar</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/about">
                  <p>Biz haqimizda</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/contact">
                  <p>Bog`lanish</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  className="nav__cart"
                  href="/favourite"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <p>Saralanganlar</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__cart" href="/cart">
                  <p>Savat</p>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__login" href="/login">
                  Kirish
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="hamburger">
          <button onClick={controlNav} className="nav__menu__btn">
            <MenuIcon fontSize="large" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
