import { Metadata } from "next";

import RegisterForm from "@/components/form/RegisterForm";

export const metadata: Metadata = {
  title: "Ro`yxatdan o`tish",
  description:
    "Vodiy Parfum | Ro`yxatdan o`tish",
};

const RegisterPage = () => {
  return <div>
    <RegisterForm/>
  </div>;
};

export default RegisterPage;
