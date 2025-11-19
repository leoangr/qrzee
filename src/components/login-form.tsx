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
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AlertModal from "./AlertModal"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const endpoint = process.env.NEXT_PUBLIC_API_URL
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const checkAuth = async () => {
      try {
        
        const response = await fetch(`${endpoint}/api/auth/me`, {
          method: 'GET',
          credentials: 'include'
        })

        if (response.status === 200) {
          router.push('/admin/dashboard')
        }

      } catch (error) {
        console.error(error)
      }
    }

  useEffect(() => {
    checkAuth()
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      
      const response = await fetch(`${endpoint}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json()
      
      if (response.status === 200) {
        router.push('/admin/dashboard')
      } else {
        setAlertOpen(true)
        setAlertMessage(data.message)
      }

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className={cn("flex flex-col max-w-[500px] w-full gap-6 ", className)} {...props}>
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
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
                <Input
                  className="py-5 text-[14px] border focus:border-primary"
                  id="password"
                  type="password"
                  placeholder="•••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              <a
                href="#"
                className="ml-auto mt-[-15px] inline-block text-[13px] tracking-[.2px] text-primary"
              >
                Forgot password?
              </a>
              <Button
              type="submit"
              className="w-full text-white mt-6 "
              >
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-[13px] txt-[#161616] tracking-[.2px] ">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-primary">
                Sign up
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
