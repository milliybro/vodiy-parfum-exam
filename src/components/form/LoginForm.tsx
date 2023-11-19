"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from "@/server/request";
import Cookies from "js-cookie";

import useAuth from "@/store/auth";
import { USER_DATA, USER_TOKEN } from "@/constants";
import { useRouter } from "next/navigation";
import ROLES from "@/types/roles";

import "./login.scss";
import google from "../../assets/google.png"
import apple from "../../assets/apple.png"
import facebook from "../../assets/facebook.png"
import Image from "next/image";

const defaultTheme = createTheme();

export default function LoginForm() {
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData = {
        username: data.get("username"),
        password: data.get("password"),
      };

      const {
        data: { accesstoken, user },
      } = await request.post("auth/login", userData);
      toast.success("Muvaffaqiyatli kirish!");
      setIsAuthenticated(user);
      localStorage.setItem(USER_DATA, JSON.stringify(user));
      Cookies.set(USER_TOKEN, accesstoken);
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
      if (user.role === ROLES.ADMIN) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <section
      style={{ backgroundColor: "#ffc700", height: "100%" }}
      className="login-section"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="login-title">Vodiy Parfum</h2>
          <Typography component="h1" variant="h5">
            Kirish
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Eslab qoling"
              style={{ display: "flex", justifyContent: "end" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#ffc700", color: "#000" }}
            >
              Kirish
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  {/* Home Page */}
                </Link>
              </Grid>
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
                color: "#000",
              }}
              item
            >
              <Link style={{ color: "#000" }} href="/register" variant="body2">
                {"Accountingiz yo`qmi? Ro`yxatdan o`tish"}
              </Link>
            </Grid>
            <div className="social-media">
              <button>
              <Image src={google} alt="" />
              </button>
              <button>
              <Image src={apple} alt="" />
              </button>
              <button>
              <Image src={facebook} alt="" />
              </button>
            </div>
          </Box>
        </Box>
      </Container>
    </section>
    // </ThemeProvider>
  );
}
