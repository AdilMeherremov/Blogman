'use client'

import { UpdateUnauthPassword } from '@/app/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

function ChangePassword() {

  const formSchema = z.object({
    email: z.email('You must enter a valid email adrress')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const UpdateUserPassword = async (values: z.infer<typeof formSchema>) => {
    const {success, message} = await UpdateUnauthPassword(values)

    if (success){
      toast.success('A verification link has been sent to your email!', {
        position: 'top-right'
      })
    }
    else{
      toast.error(message, {
        position: 'top-right'
      })
    }
  }

  return (

    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }}
      className="flex flex-col h-[85vh] justify-center items-center gap-y-5">
      <h1 className='text-xl'>Reset your password</h1>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(UpdateUserPassword)} className='flex flex-col items-center gap-y-2'>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input {...field} type='email' placeholder='Enter your email here.' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-[80%] bg-blue-500 hover:bg-blue-600">Send verification link</Button>
        </form>
      </Form>
    </motion.main>
  )
}

export default ChangePassword