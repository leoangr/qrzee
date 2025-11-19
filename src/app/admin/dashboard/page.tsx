'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ListQR from "../components/ListQr";

export default function Dashboard() {

  const endpoint = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter();
  const [menuBar, setMenubar] = useState(false)
  const [userID, setUserID] = useState(0)
  const [email, setEmail] = useState("")

  const checkAuth = async () => {
    try {

      const response = await fetch(`${endpoint}/api/auth/me`, {
        method: 'GET',
        credentials: 'include'
      })

      if (response.status !== 200) {
        router.push('/login')
      }

      const data = await response.json()
      setUserID(data.user.id_user)
      setEmail(data.user.email)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <main className="relative ">
      <div className={`h-[100vh] mt-[5rem] bg-[#fafaff] ${menuBar ? "blur-sm" : ""}`}>
        <section className="ml-[14px] mr-[14px] sm:ml-[15rem] sm:mr-[2rem] ">
          <h1 className="text-[#161616] text-[1.1rem] sm:text-[1.2rem] tracking-[.2px] leading-4 font-semibold mb-2 ">Dashboard</h1>
          <p className="text-[14px] text-gray-400 tracking-[.2px] leading-[1.52em] ">Manage all your QR codes in one place</p>
          <ListQR iduser={userID} />
        </section>
      </div>
      <Sidebar />
      <Header email={email} menuBar={menuBar} setMenubar={setMenubar} />
    </main>
  )
}