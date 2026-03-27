'use client'

import { deleteBlog, EditPostContent, FetchPost } from "@/app/actions"
import LoadingComponent from "@/components/LoadingComponent"
import { BlogType } from "@/types/types"
import { useParams, useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { motion } from 'motion/react'
import { PenLine, Trash } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function BlogDetailsPage() {

    const router = useRouter()

    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useState<BlogType>()
    const [newPostContent, setNewPostContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [isPostOwner, setIsPostOwner] = useState<boolean>(false)

    const FetchPostData = async (id: number) => {
        const { data, message, postOwner } = await FetchPost(id)

        if (message) {
            toast.error(message, {
                position: 'top-right'
            })
        }
        setIsPostOwner(postOwner as boolean)
        setPost(data)
        setLoading(false)
    }

    const EditPost = async () => {
        const { success, message } = await EditPostContent(Number(id), newPostContent)

        if (success) {
            window.location.reload()
        }
        else {
            toast.error(message)
        }
    }

    const DeletePost = async () => {
        const { success, message } = await deleteBlog(Number(id))

        if (success) {
            toast.success('Post deleted successfully', {
                position: 'top-right'
            })
            router.push('/')
        }
        else {
            toast.error(message)
        }
    }

    useEffect(() => {
        FetchPostData(Number(id))
    }, [])

    return (
        <main className="flex flex-col w-full h-[86.5vh] justify-center items-center px-3 py-5 gap-y-5">
            {loading ? <LoadingComponent /> :
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }}
                    className="flex flex-col w-full items-center">
                    <h1 className="text-lg text-center">{post?.posttitle}</h1>
                    <div className="flex flex-col w-full md:w-[75%] lg:w-[65%] xl:w-[45%] h-fit p-3 rounded-lg gap-y-5 overflow-auto bg-gray-200">
                        <p>{post?.postcontent}</p>
                        <div className="flex w-full justify-between ">
                            <small>by {post?.posterusername}</small>
                            <small>{post?.created_at}</small>
                        </div>
                        <div className="flex justify-end gap-x-3">
                            {isPostOwner ?
                                <>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button>
                                                <PenLine className="size-5" />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Edit post</DialogTitle>
                                            <Input placeholder="new post content"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPostContent(e.target.value)} />
                                            <DialogClose className="flex flex-col gap-y-2">
                                                <Button onClick={EditPost} className="w-full bg-blue-500 hover:bg-blue-600">Change post content</Button>
                                                <Button variant={'outline'} className="w-full">Cancel</Button>
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild className="cursor-pointer">
                                                <Trash className="size-5 text-red-500" />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogTitle>Are your sure you want to delete this post</AlertDialogTitle>
                                            <AlertDialogAction onClick={DeletePost} className="w-full bg-red-500 hover:bg-red-600">
                                                Delete
                                            </AlertDialogAction>
                                            <AlertDialogCancel>
                                                <Button className="w-full bg-transparent text-black">Cancel</Button>
                                            </AlertDialogCancel>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </> : null}
                        </div>
                    </div>
                </motion.span>}
        </main>
    )
}

export default BlogDetailsPage