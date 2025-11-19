'use client'

import Link from "next/link";
import { FiGrid } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";
import { useEffect, useState } from "react";
import { logout } from "../../../actions/logout";
import { usePathname, useRouter } from "next/navigation";
import ConfirmModal from "../../../components/ConfirmModal";

export default function Sidebar() {

    const pathname = usePathname()
    const [menuActive, setMenuActive] = useState('dashboard')
    const [confirmOpen, setConfirmOpen] = useState(false);
    const router = useRouter()
    
    const handleLogout = () => {
        setConfirmOpen(true);
    }

    const onConfirmLogout = () => {
        logout();
        router.push('/');
        setConfirmOpen(false);
    };

    const onCancelLogout = () => {
        setConfirmOpen(false);
    };

    useEffect(() => {
        const parts = pathname.split('/')
        const current = parts[parts.length - 1] || 'dashboard'
        setMenuActive(current)
    })

    return (
        <aside className="hidden sm:flex w-[200px] bg-[#fafaff] border border-r-gray-200 h-[100vh] fixed top-0 left-0 z-10">
            <div className="py-4">
                <a href="/">
                    <img
                    className="w-[115px] object-contain px-4 mb-10"
                    src="/images/QRzee.png"
                    alt="logo" />
                </a>
                <div className="flex flex-col">
                    <span className="text-[11px] tracking-[.2px] leading-[1.52em] text-gray-400 mb-2 px-4  ">MAIN</span>
                    <nav className="flex flex-col">
                        <Link href="/admin/dashboard" className={`flex gap-[10px] text-gray-400 transition-all items-center text-[13px] tracking-[.2px] py-2 px-4 ${menuActive === "dashboard" ? "text-primary hover:text-primary" : "hover:text-gray-700" } `}>
                            <FiGrid size={20} />
                            Dashboard
                        </Link>
                        <Link href="/admin/profile" className={`flex gap-[10px] text-gray-400 transition-all items-center text-[13px] tracking-[.2px] py-2 px-4 ${menuActive === "profile" ? "text-primary hover:text-primary" : "hover:text-gray-700" } `}>
                            <FiUser size={20} />
                            Profile
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-col">
                    <span className="text-[11px] tracking-[.2px] leading-[1.52em] text-gray-400 mb-2 px-4 mt-6 ">OPTIONS</span>
                    <nav className="flex flex-col">
                        <button
                        className={`flex gap-[10px] text-gray-400 hover:text-gray-700 transition-all items-center text-[13px] tracking-[.2px] py-2 px-4 `}
                        onClick={handleLogout}
                        >
                            <PiSignOut size={20} />
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
            <ConfirmModal
                open={confirmOpen}
                message="Are you sure you want to logout?"
                onConfirm={onConfirmLogout}
                onCancel={onCancelLogout}
            />
        </aside>
    )
}