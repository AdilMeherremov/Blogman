'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormMessage,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form"
import z from 'zod'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EyeIcon, EyeOff } from "lucide-react"
import { useState } from "react"
import { motion } from 'motion/react'
import { LogInUser } from "@/app/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function SignUpPage() {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const formSchema = z.object({
        email: z.string().
            email('You must enter a valid email address'),

        password: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const LoginUser = async (values: z.infer<typeof formSchema>) => {
        const res = await LogInUser(values)

        console.log(values)

        if (res.success) {
            toast.success('Logged in successfully', {
                position: "top-right"
            })
            router.push('/protected/profile')
        }
        else {
            toast.error('Login failed with the error: ' + res.message, {
                position: 'top-right'
            })
        }
    }

    return (
        <Form {...form}>
            <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }}
                className="flex w-full h-[86.5vh] justify-center items-center">
                <form onSubmit={form.handleSubmit(LoginUser)} method="POST"
                    className="flex flex-col w-[80%] sm:w-[65%] md:w-[55%] lg:w-[30%] items-center justify-center gap-y-5">
                    <h1 className="text-xl">Log into your account</h1>
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        type="email"
                                        placeholder="example@email.com"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="flex  items-center gap-x-3">
                                        <Input {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="**********"
                                        />
                                        <button type="button" className="cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeIcon /> : <EyeOff />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                <Link href={'/auth/change-password'}>
                                    <small className="text-blue-500 underline">Forgot password?</small>
                                </Link>
                            </FormItem>
                        )} />

                    <Button className="w-[90%] bg-blue-500 hover:bg-blue-600" type="submit">Log in</Button>
                    <small>Don't have an account? <Link href={'/auth/sign-up'} className="text-blue-500">Create one here!</Link></small>
                </form>
            </motion.main>
        </Form >
    )
}

export default SignUpPage