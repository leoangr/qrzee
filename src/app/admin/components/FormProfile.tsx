import AlertModal from "../../../components/AlertModal";
import React, { useState } from "react";
import { LiaUploadSolid } from "react-icons/lia";

interface FormProfileProps {
    iduser: number,
    email: string,
    username: string,
    imageURL: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setImageURL: React.Dispatch<React.SetStateAction<string>>
}

export default function FormProfile({ iduser, email, username, setUsername, imageURL, setImageURL }: FormProfileProps) {

    const endpoint = process.env.NEXT_PUBLIC_API_URL
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const handleUpdateUsername = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {

            const response = await fetch(`${endpoint}/api/username-profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    iduser,
                    username
                })
            })

            const data = await response.json()
            setAlertOpen(true)
            setAlertMessage(data.message)

        } catch (error) {
            console.error(error)
        }

    }

    const handleUploadImage = async (file: File) => {
        const formData = new FormData()
        formData.append("image", file)

        try {
            
            const response = await fetch(`${endpoint}/api/upload-image`, {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (response.status === 200) {
                const newImageUrl = `${data.imageUrl}?t=${new Date().getTime()}`;
                handleUpdateImage(newImageUrl)
                setImageURL(newImageUrl)
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateImage = async (image: string) => {

        try {
            
            const response = await fetch(`${endpoint}/api/image-profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    iduser,
                    image
                })
            })

            const data = await response.json()
            setAlertOpen(true)
            setAlertMessage(data.message)

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form className="flex flex-col mt-[2rem] gap-[1rem] ">
            <div className="flex flex-col gap-1 max-w-full sm:max-w-[500px] ">
                <label
                    className="text-[14px] font-semibold "
                    htmlFor="username">
                    Username
                </label>
                <div className="flex gap-2 inp-data ">
                    <input
                        className="px-3 py-[10px] sm:max-w-[412px] w-full text-[14px] text-gray-600 border border-gray-300 rounded-lg bg-[#fafaff] outline-none focus:border-2 focus:border-primary "
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    <button
                        onClick={handleUpdateUsername}
                        className="p-[10px] max-w-[80px] bg-primary text-[14px] text-[#fafaff] rounded-lg min-w-[90px] hover:brightness-90 "
                        type="button">
                        Update
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-1 max-w-full sm:max-w-[500px] ">
                <label
                    className="text-[14px] font-semibold "
                    htmlFor="email">
                    Email
                </label>
                <div className="flex gap-2 inp-data">
                    <input
                        className="px-3 py-[10px] sm:max-w-[412px] w-full text-[14px] text-gray-600 border border-gray-300 rounded-lg bg-[#fafaff] outline-none focus:border-2 focus:border-primary "
                        type="text"
                        id="email"
                        value={email}
                        readOnly />
                </div>
            </div>
            <div className="flex flex-col gap-1 max-w-[500px] ">
                <h4 className="text-[14px] font-semibold ">
                    Profile Picture
                </h4>
                <p className="text-gray-400 tracking-[.2px] leading-[1.52em] text-[12px] ">We support only JPG, PNG and WEBP under 2MB</p>
                <div className="flex items-center gap-4 mt-[1.5rem]">
                    <img
                        className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] border border-gray-200 rounded-full object-cover "
                        src={imageURL
                            ? imageURL
                            : "/images/Sample_User_Icon.png"
                        } alt="user image" />
                        <div className="flex items-center gap-2">
                            <label
                                className="flex items-center gap-2 p-[10px] border border-gray-300 rounded-lg text-[12px] w-fit text-gray-600 hover:text-[#161616] cursor-pointer "
                                htmlFor="profile-image">
                                <span>
                                    <LiaUploadSolid size={16} />
                                </span>
                                Upload
                            </label>
                        </div>
                </div>
                <div className="hidden inp-data">
                    <input
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                const selectedFile = e.target.files[0];
                                handleUploadImage(selectedFile);
                            }
                        }}
                        className="px-3 py-[10px] max-w-[412px] w-full text-[14px] text-gray-600 border border-gray-300 rounded-lg bg-[#fafaff] outline-none "
                        type="file"
                        id="profile-image"
                    />
                </div>
            </div>
            <AlertModal
                open={alertOpen}
                message={alertMessage}
                onClose={() => setAlertOpen(false)}
            />
        </form>
    )
}