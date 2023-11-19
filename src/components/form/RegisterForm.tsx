"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { request } from "@/server/request";
import { useRouter } from "next/navigation";
import "./login.scss"
import Image from "next/image";
import google from "../../assets/google.png"
import apple from "../../assets/apple.png"
import facebook from "../../assets/facebook.png"

const defaultTheme = createTheme();

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        password: data.get("password"),
      };

      await request.post("auth/register", userData);
      toast.success("You are registered !");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Ro`yxatdan o`tish
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
              id="firstName"
              label="Firstname"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Lastname"
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />
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
              id="phoneNumber"
              label="Phone number"
              name="phoneNumber"
              autoComplete="phoneNumber"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#ffc700", color: "#000" }}
            >
              Ro`yxatdan o`tish
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="/" variant="body2">
                  Home Page
                </Link> */}
              </Grid>
            </Grid>
              <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
                color: "#000",
              }}
               item>
                <Link style={{ color: "#000" }} href="/login" variant="body2">
                  {"Accountingiz bormi? Kirish"}
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
    {/* // </ThemeProvider> */}
    </section>

  );
}
