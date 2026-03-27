'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { fetchPostData } from "../actions"
import { useEffect, useState } from "react"
import { motion } from 'motion/react'
import { useRouter } from "next/navigation"
import { BlogType } from "@/types/types"
import LoadingPage from "@/components/LoadingComponent"

function Homepage() {

  const router = useRouter()

  const [posts, setPosts] = useState<BlogType[]>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPosts = async () => {
    const { success, message, data } = await fetchPostData()

    if (success) {
      setPosts(data)
      setLoading(false)
    }
    else {
      toast.error(message)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col w-full py-7 px-5 text-center items-center text-xl my-10 gap-y-5 bg-gray-200">
        <h1>Best place to share your thoughts with others!</h1>
        <motion.span whileHover={{ scale: 1.05 }} className="w-[65%]">
          <Link href={'/auth/sign-up'}>
            <Button className="w-full lg:w-[50%] lg:p-4 rounded-xl bg-blue-500 hover:bg-blue-600">Sign up now</Button>
          </Link>
        </motion.span>
      </div>

      <div className="flex flex-col items-end px-5 gap-y-3">


        <div className="flex w-full h-full justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }}
            className="flex flex-col w-full xl:w-[80%] items-center rounded-xl py-5 gap-y-3 bg-gray-200">
            <div className="flex w-[90%] justify-between">
              <h1 className="text-2xl tracking-wide">Recent Posts</h1>
              <Link href={'/protected/create-post'}>
                <Button className="rounded-xl bg-blue-500 hover:bg-blue-600">
                  <Plus />
                </Button>
              </Link>
            </div>
            {loading ? <LoadingPage /> :
              <>
                {posts?.map((post: any, key: any) => (
                  <motion.span key={key} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}
                    className="flex w-full justify-center cursor-pointer">
                    <Card onClick={() => router.push('/blog-details/' + post.id)} className="w-[90%] px-3.5">
                      <CardTitle>{post.posttitle}</CardTitle>
                      <CardContent className="line-clamp-2 opacity-65">{post.postcontent}</CardContent>
                      <div className="flex w-full justify-between">
                        <small>by {post.posterusername}</small>
                        <small className="text-right">{post.created_at}</small>
                      </div>
                    </Card>
                  </motion.span>
                ))}
              </>}
          </motion.div>
        </div>
      </div>
    </main>

  )
}

export default Homepage