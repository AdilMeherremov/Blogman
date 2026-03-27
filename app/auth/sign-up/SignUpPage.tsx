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
import { SignUpUser } from "@/app/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

function SignUpPage() {

    const router = useRouter()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const formSchema = z.object({
        username: z.string()
            .min(1, 'Username cannot be left empty')
            .max(30, 'Username cannot be more than 30 symbols'),

        email: z.string().
            email('You must enter a valid email address'),

        password: z.string()
            .min(6, 'Password must be at lest 6 characters long'),

        ConfirmPassword: z.string()
            .min(1, 'You must confirm your password')
    }).refine((data) => data.password == data.ConfirmPassword, {
        message: 'Password does not match'
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            ConfirmPassword: ''
        }
    })

    const SignUp = async (values: z.infer<typeof formSchema>) => {
        const res = await SignUpUser(values)

        if (res.success) {
            toast.success('Account created successfully', {
                position: "top-right"
            })
            router.push('/')
        }
        else {
            toast.error('Account creation failed with the error: ' + res.message, {
                position: 'top-right'
            })
        }
    }

    return (
        <Form {...form}>
            <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }} className="flex w-full h-[86.5vh] justify-center items-center">
                <form method="POST" onSubmit={form.handleSubmit(SignUp)} 
                className="flex flex-col w-[80%] sm:w-[65%] md:w-[55%] lg:w-[30%] items-center justify-center gap-y-5">
                    <h1 className="text-xl">Create your account</h1>
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        placeholder="John Doe"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

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
                        )}/>

                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-3">
                                        <Input {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="*********"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                            {showPassword ? <EyeIcon /> : <EyeOff />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                    <FormField
                        name="ConfirmPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-3">
                                        <Input {...field}
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="*********"
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">
                                            {showConfirmPassword ? <EyeIcon /> : <EyeOff />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>

                    <Button className="w-[90%] bg-blue-500 hover:bg-blue-600" type="submit">Sign up</Button>
                    <small>Already have an account? <Link href={'/auth/login'} className="text-blue-500">Login here!</Link></small>
                </form>
            </motion.main>
        </Form >
    )
}

export default SignUpPage