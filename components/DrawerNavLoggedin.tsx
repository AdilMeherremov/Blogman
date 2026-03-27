'use client'

import { useRouter } from "next/navigation"
import { DrawerClose } from "./ui/drawer"
import { LogOutUser } from "@/app/actions"
import { toast } from "sonner"

function DrawerNavLoggedin() {
    const router = useRouter()

    const UserLogOutCheck = async () => {
        const { success, message } = await LogOutUser()

        if (success) {
            toast.success('Logged out successfully', {
                position: 'top-right'
            })
            router.push('/')
        }
        else {
            toast.error('Logging out failed with the error: ' + message, {
                position: 'top-right'
            })
        }
    }

    return (
        <>
            <DrawerClose>
                <button onClick={() => router.push('/')} className="w-[90%] h-full p-2 border rounded-lg hover:bg-gray-100">
                    Home
                </button>
            </DrawerClose>
            <DrawerClose>
                <button onClick={() => router.push('/protected/profile')} className="w-[90%] h-full p-2 border rounded-lg hover:bg-gray-100">
                    Profile
                </button>
            </DrawerClose>
            <DrawerClose>
                <button onClick={() => router.push('/protected/create-post')} className="w-[90%] h-full p-2 border rounded-lg hover:bg-gray-100">
                    Create post
                </button>
            </DrawerClose>
            <DrawerClose>
                <button onClick={UserLogOutCheck} className="w-[90%] h-full p-2 border rounded-lg bg-red-500 hover:bg-red-600 text-white">
                    Log out
                </button>
            </DrawerClose>
        </>
    )
}

export default DrawerNavLoggedin
