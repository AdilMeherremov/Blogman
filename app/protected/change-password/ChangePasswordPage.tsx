'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from 'motion/react'
import { useForm } from "react-hook-form"
import z from 'zod'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EyeIcon, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

function ChangePasswordPage() {

    const supabase = createClient()
    const router = useRouter()

    const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
    const [showConfirmNewPassword, setConfirmShowNewPassword] = useState<boolean>(false)

    const formSchema = z.object({
        newpassword: z.string()
            .min(6, 'Password cannot be less than 6 symbols'),

        confirmnewpassword: z.string()
            .min(6, 'Password cannot be less than 6 symbols')
    }).refine((data) => data.newpassword == data.confirmnewpassword, {
        message: 'Passwords does not match',
        path: ["confirmnewpassword"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newpassword: '',
            confirmnewpassword: ''
        }
    })

    const ChangeUserPassword = async (values: z.infer<typeof formSchema>) => {

        const { error } = await supabase.auth.updateUser({
            password: values.newpassword
        })

        if (error) {
            toast.success(error.message, {
                position: 'top-right'
            })
        }

        toast.success('Password updated successfully', {
            position: 'top-right'
        })
        router.push('/auth/login')
    }

    return (
        <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }}
            className="flex flex-col w-full h-[90vh] justify-center items-center gap-y-3">
            <h1 className="mb-3 text-2xl tracking-wide">Change your password</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(ChangeUserPassword)} className="flex flex-col items-center gap-y-6 *:flex *:flex-col *:gap-y-1 *:w-full">
                    <FormField
                        name="newpassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-3">
                                        <Input {...field}
                                            type={showNewPassword ? 'text' : 'password'}
                                            placeholder="*********"
                                        />
                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer">
                                            {showNewPassword ? <EyeIcon /> : <EyeOff />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        name="confirmnewpassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm new password</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-x-3">
                                        <Input {...field}
                                            type={showConfirmNewPassword ? 'text' : 'password'}
                                            placeholder="*********"
                                        />
                                        <button type="button" onClick={() => setConfirmShowNewPassword(!showConfirmNewPassword)} className="cursor-pointer">
                                            {showConfirmNewPassword ? <EyeIcon /> : <EyeOff />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <motion.span whileTap={{ scale: 0.95 }}>
                        <Button className="w-full rounded-lg bg-blue-500 hover:bg-blue-600">Change password</Button>
                    </motion.span>
                </form>
            </Form>
        </motion.main>
    )
}

export default ChangePasswordPage

