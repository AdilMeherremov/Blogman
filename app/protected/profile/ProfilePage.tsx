'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import DefaultProfile from '@/app/images/DefaultImage.jpg'
import { Button } from "@/components/ui/button"
import { DeleteAccount, fetchProfileData, LogOutUser } from "@/app/actions"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingComponent from "@/components/LoadingComponent"

function ProfilePage() {

  const router = useRouter()

  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

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

  const FetchProfileData = async () => {
    const { success, message, profile } = await fetchProfileData()

    if (success) {
      setUsername(profile?.username)
      setLoading(false)
    }
    else {
      toast.error('Fetching profile data failed with the error: ' + message, {
        position: 'top-right'
      })
    }
  }

  const DeleteUserProfile = async () => {
    const { success, message } = await DeleteAccount()

    if (success) {
      toast.success('Account deleted successfully', {
        position: 'top-right'
      })
      router.push('/')
    }
    else {
      toast.error(message, {
        position: 'top-right'
      })
    }
  }

  useEffect(() => {
    FetchProfileData()
  }, [])

  return (
    <main className="flex flex-col w-full h-[86.5vh] bg-gray-100">
      <div className="flex flex-col w-full h-fit p-8 gap-y-3 items-center ">
        <Avatar className="size-24">
          <AvatarImage src={DefaultProfile.src} alt="Profile Picture" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        {loading ? <LoadingComponent /> :
          <>
            <h1 className="text-2xl">{username}</h1>
          </>}
      </div>

      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full sm:w-[75%] md:w-[50%] lg:w-[35%] px-5 gap-y-5 *:w-full">
          <Button onClick={() => router.push('/protected/change-username')} className="bg-blue-500 hover:bg-blue-600">Change Username</Button>
          <Button onClick={() => router.push('/protected/change-password')} className="bg-blue-500 hover:bg-blue-600">Change Password</Button>
          <Button onClick={UserLogOutCheck} variant={'destructive'}>Sign out</Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={'destructive'}>Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={DeleteUserProfile} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage