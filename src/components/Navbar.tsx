'use client'

import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

export default function Navbar() {

    const [menu, setMenu] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const endpoint = process.env.NEXT_PUBLIC_API_URL

    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLSpanElement | null>(null);

    const checkAuth = async () => {
        try {
            
            const response = await fetch(`${endpoint}/api/auth/me`, {
                method: 'GET',
                credentials: 'include'
            })

            if (response.status === 200) {
                setIsLogin(true)
            }

        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        window.onscroll = () => {
            setMenu(false)
        }
    }, [])

     useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menu &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu]);

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <section className="border border-b-gray-200">
            <header className="flex items-center gap-4 justify-between max-w-[1240px] mx-auto p-3 py-4 ">
                <Link href="/">
                    <img
                    src="/images/QRzee.png"
                    alt="logo"
                    className="w-[90px] sm:w-[100px] object-contain"
                    />
                </Link>
                {isLogin ?
                    <div className="hidden sm:flex gap-3 items-center text-gray-500">
                        <p className="text-[12px] tracking-[.2px] ">leoanggoro@gmail.com</p>
                        <Link href={"/admin/dashboard"} className="flex cursor-pointer items-center justify-center p-2 border border-gray-200 rounded-full">
                            <FiUser
                            size={16}
                            />
                        </Link>
                    </div>
                : <div className="hidden sm:flex items-center gap-4">
                        <Link
                        href="/login"
                        className="text-[14px] text-[#161616] tracking-[.3px] p-2 px-1 transition-all hover:text-primary "
                        >Login</Link>
                        <Link
                        href="/signup"
                        className="text-[14px] text-[#fafaff] tracking-[.3px] p-2 px-3 rounded-md transition-all bg-primary hover:brightness-90 "
                        >Signup</Link>
                    </div>
                }
                <div className="relative block sm:hidden">
                    {isLogin ? 
                        <div className="flex gap-3 items-center text-gray-500">
                            <p className="text-[12px] tracking-[.2px] ">leoanggoro@gmail.com</p>
                            <Link href={"/admin/dashboard"} className="flex cursor-pointer items-center justify-center p-2 border border-gray-200 rounded-full">
                                <FiUser
                                size={16}
                                />
                            </Link>
                        </div>
                        : 
                        <span
                            className="flex items-center justify-center cursor-pointer sm:hidden"
                            ref={buttonRef}
                            onClick={() => setMenu(prev => !prev)}>
                            <HiOutlineBars3BottomRight size={22} />
                        </span>
                    }
                    {menu && (
                        <div 
                        ref={menuRef}
                        className="flex flex-col sm:hidden absolute top-6 right-2 z-10 w-[125px] bg-[#fafaff] bx-shadow rounded-md ">
                            <Link
                            href="/login"
                            className="flex items-center p-[8px] text-[14px] text-nowrap tracking-[.2px] w-full text-gray-400 hover:text-[#161616] ">
                                <span className="flex items-center justify-center mr-2">
                                    <FiUser size={18} />
                                </span>
                                Login
                            </Link>
                            <Link
                            href="/signup"
                            className="flex items-center p-[8px] text-[14px] text-nowrap tracking-[.2px] w-full text-gray-400 hover:text-[#161616] ">
                                <span className="flex items-center justify-center mr-2">
                                    <FiUserPlus size={18} />
                                </span>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </section>
    )
}