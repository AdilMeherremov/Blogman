'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from 'motion/react'
import { useForm } from "react-hook-form"
import { createPost } from "@/app/actions"
import z from 'zod'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function CreatePost() {

    const router = useRouter()

    const formSchema = z.object({
        posttitle: z.string()
            .min(1, 'You must enter a post title'),

        postdescription: z.string()
        .min(1, 'Post description cannot be left blank')
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            posttitle: '',
            postdescription: ''
        }
    })

    const CreateNewPost = async (values: z.infer<typeof formSchema>) => {
        const { success, message } = await createPost(values)

        if (success) {
            toast.success('Blog posted successfully', {
                position: 'top-right'
            })
            router.push('/')
        }
        else {
            toast.error('Creating post failed with the error: ' + message, {
                position: 'top-right'
            })
        }
    }

    return (
        <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }} className="flex flex-col w-full h-[90vh] justify-center items-center gap-y-3">
            <h1 className="text-2xl tracking-wide">Create Post</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(CreateNewPost)} 
                className="flex flex-col w-[80%] sm:w-[65%] md:w-[55%] lg:w-[30%] items-center gap-y-5 *:flex *:flex-col *:gap-y-1 *:w-full">
                    <FormField
                        name="posttitle"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post title</FormLabel>
                                <FormControl >
                                    <Input {...field} placeholder="lorem ipsum donor..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="postdescription"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post description</FormLabel>
                                <FormControl >
                                    <Textarea {...field} placeholder="type your post description here..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <motion.span whileTap={{ scale: 0.95 }}>
                        <Button className="w-full rounded-lg bg-blue-500 hover:bg-blue-600">Post</Button>
                    </motion.span>
                </form>
            </Form>
        </motion.main>
    )
}

export default CreatePost