'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import FormProfile from "../components/FormProfile"
import { useState } from "react"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
    description: "Update your profile information and settings.",
    robots: {
        index: false, 
        follow: false,
    }
}

export default function Profile() {

    const endpoint = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter();
    const [menuBar, setMenubar] = useState(false)
    const [userID, setUserID] = useState(0)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [imageURL, setImageURL] = useState("")

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
            setUsername(data.user.username)
            setEmail(data.user.email)
            setImageURL(data.user.image)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])


    return (
        <main>
            <div className={`h-[100vh] mt-[5rem] bg-[#fafaff] ${menuBar ? "blur-sm" : ""}`}>
                <section className="ml-[14px] mr-[14px] sm:ml-[15rem] sm:mr-[2rem] ">
                    <h1 className="text-[#161616] text-[1.1rem] sm:text-[1.2rem] tracking-[.2px] leading-4 font-semibold mb-2 ">Profile</h1>
                    <p className="text-[14px] text-gray-400 tracking-[.2px] leading-[1.52em] ">Manage your profile here</p>
                    <FormProfile iduser={userID} email={email} username={username} setUsername={setUsername} imageURL={imageURL} setImageURL={setImageURL} />
                </section>
            </div>
            <Header email={email} menuBar={menuBar} setMenubar={setMenubar} />
            <Sidebar />
        </main>
    )
}