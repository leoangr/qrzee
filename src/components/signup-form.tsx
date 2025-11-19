"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HtmlHTMLAttributes, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AlertModal from "./AlertModal"

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const endpoint = process.env.NEXT_PUBLIC_API_URL
    const [typePassword, setTypePassword] = useState(false)
    const [typeConfirmPassword, setTypeConfirmPassword] = useState(false)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {

            if (password !== confirmPassword) {
                setAlertOpen(true)
                setAlertMessage("Password and Confirm Password Do not match")
                return 
            }

            const response = await fetch(`${endpoint}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await response.json()
            setAlertOpen(true)
            setAlertMessage(data.message)

            if (response.status === 200) {
                router.push('/login')
            }


        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={cn("flex flex-col max-w-[500px] w-full gap-6 ", className)} {...props}>
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  className="py-5 text-[14px] border focus:border-primary"
                  id="username"
                  type="text"
                  placeholder="john12"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="py-5 text-[14px] border focus:border-primary"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="flex items-center relative ">
                    <Input
                    className="py-5 text-[14px] border focus:border-primary"
                    id="password"
                    type={typePassword ? "text" : "password"}
                    placeholder="•••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                    <span className="absolute top-[50%] text-gray-500 hover:text-gray-700 right-[1px] rounded-sm translate-y-[-50%] cursor-pointer bg-[#fafaff] ">
                        {typePassword ? 
                            <AiOutlineEye
                            onClick={() => setTypePassword(false)}
                            className="h-[37px] w-[30px] p-[5px]"
                            size={20}
                            />
                        :
                            <AiOutlineEyeInvisible
                            onClick={() => setTypePassword(true)}
                            className="h-[37px] w-[30px] p-[5px]"
                            size={20}
                            />
                        }
                    </span>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <div className="flex items-center relative ">
                    <Input
                    className="py-5 text-[14px] border focus:border-primary"
                    id="confirm-password"
                    type={typeConfirmPassword ? "text" : "password"}
                    placeholder="•••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />
                    <span className="absolute top-[50%] text-gray-500 hover:text-gray-700 right-[1px] rounded-sm translate-y-[-50%] cursor-pointer bg-[#fafaff] ">
                        {typeConfirmPassword ?
                            <AiOutlineEye
                            onClick={() => setTypeConfirmPassword(false)}
                            className="h-[37px] w-[30px] p-[5px]"
                            size={20}
                            />
                        : 
                            <AiOutlineEyeInvisible
                            onClick={() => setTypeConfirmPassword(true)}
                            className="h-[37px] w-[30px] p-[5px]"
                            size={20}
                            />
                        }
                    </span>
                </div>
              </div>
              <Button
              type="submit"
              className="w-full text-white mt-6 "
              >
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-[13px] txt-[#161616] tracking-[.2px] ">
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <AlertModal
          open={alertOpen}
          message={alertMessage}
          onClose={() => setAlertOpen(false)}
      />
    </div>
  )
}
