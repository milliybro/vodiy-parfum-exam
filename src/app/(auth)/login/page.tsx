import { Metadata } from "next";

import LoginForm from "@/components/form/LoginForm";

import "./style.scss";

export const metadata: Metadata = {
  title: "Accountga kirish",
  description:
    "Vodiy Parfum | Kirish",
};

const LoginPage = () => {
  return <div>
    <LoginForm/>
  </div>;
};

export default LoginPage;
