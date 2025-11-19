'use client'

import AlertModal from "../../../components/AlertModal"
import { useEffect, useState } from "react"

interface ListQRProps {
    iduser: number
}

export default function ListQR({ iduser }: ListQRProps) {

    const endpoint = process.env.NEXT_PUBLIC_API_URL
    const [dataQr, setDataQr] = useState<any[]>([])
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const getDataQr = async () => {
        try {

            const response = await fetch(`${endpoint}/api/all-qr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    iduser
                })
            })

            const data = await response.json()
            setDataQr(data.data || [])

        } catch (error) {
            console.error(error)
        }
    }

    const handleDownload = async (urlqr: any) => {

        try {
            const response = await fetch(urlqr);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "qr-code.png";
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    }

    const handleShare = async (urlqr: any) => {

        try {
            const response = await fetch(urlqr);
            const blob = await response.blob();
            const file = new File([blob], "qr-code.png", { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "QRzee",
                    text: "Check out my QR code!",
                });
            } else {
                setAlertOpen(true)
                setAlertMessage("Sorry, your browser does not support sharing files")
            }
        } catch (error) {
            console.error("Share failed:", error);
        }
    }

    useEffect(() => {
        getDataQr()
    }, [iduser])

    return (
        <div>
            <div className="mb-[2rem] mt-[3rem]">
                <div className="max-w-[250px] p-3 rounded-lg bx-shadow ">
                    <h4 className="text-[14px] text-[#161616] tracking-[.2px] leading-[1.52em] mb-2 ">Total QR</h4>
                    <span className="text-[1rem] sm:text-[1.1rem] tracking-[.2px] leading-4 font-[500] ">{dataQr.length ?? 0}</span>
                </div>
            </div>
            <h4 className="text-[#161616] text-[1rem] tracking-[.2px] leading-4 font-semibold mb-4 ">Recent QR Codes</h4>
            <div className="w-[100%] border border-gray-200 rounded-lg over-x-scroll ">
                <table className="table-fixed w-[100%] min-w-[600px]">
                    <thead>
                        <tr className="px-2">
                            <th className="w-[1rem] text-[14px] p-2">#</th>
                            <th className="w-[1.5rem] text-[14px] p-2">QR</th>
                            <th className="w-[1.5rem] text-[14px] p-2">Value</th>
                            <th className="w-[1.5rem] text-[14px] p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataQr && Array.isArray(dataQr) && dataQr.map((item, index) => {
                                return (
                                    <tr key={index} className="border-t px-2 ">
                                        <td className="w-[1rem] text-center text-[14px] text-[#161616] p-2">{index + 1}</td>
                                        <td className="w-[1.5rem] p-2">
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src={item.url_qr}
                                                    alt="qr"
                                                    className="w-10 h-10 object-contain"
                                                />
                                            </div>
                                        </td>
                                        <td className="w-[1.5rem] p-2 text-center text-[14px] text-[#161616] ">
                                            <p className="elipsis">{item.value_qr}</p>
                                        </td>
                                        <td className="w-[1.5rem] p-2">
                                            <div className="flex items-center justify-center gap-2 ">
                                                <button
                                                    onClick={() => handleDownload(item.url_qr)}
                                                    className="text-[12px] p-[7px] py-[8px] rounded-md bg-primary text-[#fafaff] min-w-[80px] hover:brightness-90 ">
                                                    Download
                                                </button>
                                                <button
                                                    onClick={() => handleShare(item.url_qr)}
                                                    className="text-[12px] p-[7px] py-[8px] rounded-md bg-[#fafaff] border border-primary text-primary min-w-[80px] hover:brightness-90 ">
                                                    Share
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <AlertModal
                open={alertOpen}
                message={alertMessage}
                onClose={() => setAlertOpen(false)}
            />
        </div>
    )
}