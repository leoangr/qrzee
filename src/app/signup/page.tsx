import { SignupForm } from "../../components/signup-form"
import Navbar from "../../components/Navbar"

export default function Page() {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center items-center mt-[2rem] ">
      <SignupForm />
      </div>
    </main>
  )
}

