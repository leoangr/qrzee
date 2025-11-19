'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { FiGrid } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import ConfirmModal from "../../../components/ConfirmModal";

interface HeaderProps {
    email: string,
    menuBar: boolean;
    setMenubar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({email, menuBar, setMenubar} : HeaderProps ) {

    const pathname = usePathname()
    const router = useRouter()
    const [menuActive, setMenuActive] = useState('dashboard')
    const [confirmOpen, setConfirmOpen] = useState(false);
    const endpoint = process.env.NEXT_PUBLIC_API_URL

    const handleLogout = () => {
        setConfirmOpen(true);
    }

    const onConfirmLogout = async () => {
        
        try {
            await fetch(`${endpoint}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            router.push('/');
            setConfirmOpen(false);
        } catch (error) {
            console.error(error)
        }
    };

    const onCancelLogout = () => {
        setConfirmOpen(false);
    };

    useEffect(() => {
        const parts = pathname.split('/')
        const current = parts[parts.length -1] || 'dashboard'
        setMenuActive(current)
    })

    return (
        <header className="bg-[#fafaff] fixed top-0 left-0 w-full z-1">
            <div className="flex items-center justify-between py-4 px-3 sm:px-6">
                <div className={`flex gap-3 items-center justify-between w-full ${menuBar ? "blur-sm" : "" }`}>
                    <a href="/">
                        <img
                        src="/images/QRzee.png"
                        alt="logo"
                        className="w-[70px] object-contain"
                        />
                    </a>
                    <div className="hidden sm:flex gap-3 items-center text-gray-500">
                        <p className="text-[12px] tracking-[.2px] ">{email}</p>
                        <span className="flex items-center justify-center p-2 border border-gray-200 rounded-full">
                            <FiUser size={16} />
                        </span>
                    </div>
                </div>
                <div className="flex sm:hidden relative">
                    <span>
                        <HiOutlineBars3BottomRight
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setMenubar(true)}
                        />
                    </span>
                    <div className={`fixed top-0 w-[200px] bg-[#fafaff] border-l border-l-gray-200 h-[100vh] transition-all ${menuBar ? "right-0" : "right-[-100rem]" } `}>
                        <div className="flex items-center justify-between gap-2 p-2 pr-5  mt-2 ">
                            <span className="text-[12.5px] tracking-[.2px] leading-[1.52em] text-gray-600 font-semibold ">MENU</span>
                            <IoCloseOutline
                                size={24}
                                className="text-gray-600 cursor-pointer"
                                onClick={() => setMenubar(false)}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <div className="flex flex-col">
                                <span className="text-[11px] tracking-[.2px] leading-[1.52em] text-gray-400 mb-1 px-2  ">MAIN</span>
                                <Link href="/admin/dashboard" className={`flex items-center gap-3 p-2 text-[13px] text-gray-400 hover:text-[#161616] ${menuActive === "dashboard" ? "text-primary hover:text-primary" : "hover:text-gray-700" }`}>
                                    <FiGrid size={16} />
                                    Dashboard
                                </Link>
                                <Link href="/admin/profile" className={`flex items-center gap-3 p-2 text-[13px] text-gray-400 hover:text-[#161616] ${menuActive === "profile" ? "text-primary hover:text-primary" : "hover:text-gray-700" }`}>
                                    <FiUser size={16} />
                                    Profile
                                </Link>
                            </div>
                            <div className="flex flex-col mt-4">
                                <span className="text-[11px] tracking-[.2px] leading-[1.52em] text-gray-400 mb-1 px-2  ">OPTIONS</span>
                                <button
                                className="flex items-center gap-3 p-2 text-[13px] text-gray-400 hover:text-[#161616] "
                                onClick={handleLogout}
                                >
                                    <PiSignOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                open={confirmOpen}
                message="Are you sure you want to logout?"
                onConfirm={onConfirmLogout}
                onCancel={onCancelLogout}
            />
        </header>
    )
}