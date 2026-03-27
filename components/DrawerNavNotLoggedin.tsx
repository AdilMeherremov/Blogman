'use client'

import { useRouter } from "next/navigation"
import { DrawerClose } from "./ui/drawer"

function DrawerNavNotLoggedin() {
    const router = useRouter()

    return (
        <>
            <DrawerClose>
                <button onClick={() => router.push('/')} className="w-[90%] h-full p-2 border rounded-lg hover:bg-gray-100">
                    Home
                </button>
            </DrawerClose>
            <DrawerClose>
                <button onClick={() => router.push('/auth/login')} className="w-[90%] h-full p-2 border rounded-lg hover:bg-gray-100">
                    Log in
                </button>
            </DrawerClose>
            <DrawerClose>
                <button onClick={() => router.push('/auth/sign-up')} className="w-[90%] h-full p-2 border rounded-lg hover:bg-gray-100">
                    Sign up
                </button>
            </DrawerClose>
        </>
    )
}

export default DrawerNavNotLoggedin
