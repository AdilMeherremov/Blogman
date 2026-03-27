'use client'

import Link from "next/link"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "./ui/drawer"
import { Menu } from "lucide-react"
import DrawerNavLoggedin from "./DrawerNavLoggedin"
import DrawerNavNotLoggedin from "./DrawerNavNotLoggedin"
import { useEffect, useState } from "react"
import { CheckIfUserExist, LogOutUser } from "@/app/actions"
import { toast } from "sonner"

function Header() {

  const [checkUserExist, setCheckUserExist] = useState<boolean>(false)

  const LogOutUserCheck = async () => {
    const { message } = await LogOutUser()

    if (message) {
      toast.error(message)
    }
    toast.success('Logged out successfully')
    window.location.reload()
  }

  useEffect(() => {
    const VerifyUserExist = async () => {
      const { userExist } = await CheckIfUserExist()

      if (!userExist) {
        setCheckUserExist(false)
        return
      }
      setCheckUserExist(true)
    }

    VerifyUserExist()
  })

  return (
    <header className="flex w-full h-[8vh] justify-between items-center px-5 text-white bg-blue-500">
      <Link href={'/'} className="text-2xl font-semibold tracking-wide">Blogman</Link>

      {screen.width >= 1024 ?
        <nav className="flex gap-x-5 text-lg">
          {checkUserExist ?
            <>
              <Link className="hover:text-gray-200" href={'/protected/create-post'}>Create new post</Link>
              <Link className="hover:text-gray-200" href={'/protected/profile'}>Profile</Link>
              <button onClick={LogOutUserCheck} className="hover:text-gray-200">Log out</button>
            </> :
            <>
              <Link className="hover:text-gray-200" href={'/auth/sign-up'}>Sign Up</Link>
              <Link className="hover:text-gray-200" href={'/auth/login'}>Log in</Link>
            </>}
        </nav> :
        <Drawer direction="top">
          <DrawerTrigger>
            <Menu size={35} />
          </DrawerTrigger>
          <DrawerContent className="flex py-3 gap-y-5">
            {checkUserExist ? <DrawerNavLoggedin /> : <DrawerNavNotLoggedin />}
          </DrawerContent>
        </Drawer>}

    </header>
  )
}

export default Header