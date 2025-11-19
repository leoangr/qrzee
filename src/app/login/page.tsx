import { LoginForm } from "../../components/login-form"
import Navbar from "../../components/Navbar"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to access your QRzee account and manage QR codes.",
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center items-center mt-20 ">
        <LoginForm />
      </div>
    </main>
  )
}

