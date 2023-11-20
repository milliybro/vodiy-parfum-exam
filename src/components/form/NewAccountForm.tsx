"use client";

import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from "@/server/request";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/user";
import "./AccountForm.scss";
import Loading from "../loading/Loading";

const defaultTheme = createTheme();

export default function AccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("auth/me");
        setUserInfo(data);
        setFormValues({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          phoneNumber: data.phoneNumber || "",
        });
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [setUserInfo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        username: data.get("username"),
        phoneNumber: data.get("phoneNumber"),
      };

      await request.put("auth/update", userData);
      toast.success("Saqlandi!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Fragment>
      {loading ? <Loading/> : <div className="profile">
        <h1>Shaxsiy ma`lumotlarim</h1>
        <div className="profile__main">
          <form onSubmit={handleSubmit} className="admin__account">
            <div className="profile__row">
              <div className="profile__input">
                <label htmlFor="firstName">Ismi</label>
                <input value={formValues.firstName} onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })} type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="profile__input">
                <label htmlFor="lastName">Familiyasi</label>
                <input value={formValues.lastName} onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })} type="text" id="lastName" placeholder="Last name" />
              </div>
              <div className="profile__input">
                <label htmlFor="username">Username</label>
                <input value={formValues.username} onChange={(e) => setFormValues({ ...formValues, username: e.target.value })} type="text" id="username" placeholder="Username" />
              </div>
              <div className="profile__input">
                <label htmlFor="phoneNumber">Telefon raqami</label>
                <input value={formValues.phoneNumber} onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })} type="text" id="phoneNumber" placeholder="Phone number" />
              </div>
            </div>
            <div className="profile__row">
            </div>
            <div className="profile__footer">
              <button type="submit" className="profile__save__btn">
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </div>}
    </Fragment>
      
    </ThemeProvider>
  );
}
