'use client'

import { changeUsername } from '@/app/actions'
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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

function ChangePassword() {

  const router = useRouter()

  const formSchema = z.object({
    newusername: z.string()
      .min(1, 'You must enter a new username')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newusername: ''
    }
  })

  const UsernameChange = async (values: z.infer<typeof formSchema>) => {
    const { success, message } = await changeUsername(values)

    if (success) {
      toast.success('Username changed successfully', {
        position: 'top-right'
      })
      router.push('/protected/profile')
    }
    else {
      toast.error(message, {
        position: 'top-right'
      })
    }
  }

  return (

    <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 100, y: 0 }}
      className="flex flex-col w-full h-[86.5vh] justify-center items-center gap-y-5">
      <h1 className='text-xl'>Change your username</h1>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(UsernameChange)} 
        className='flex flex-col w-[80%] sm:w-[65%] md:w-[55%] lg:w-[30%] xl:w-[30%] items-center gap-y-5'>
          <FormField
            name='newusername'
            control={form.control}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>New username</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='John doe...' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-blue-500 hover:bg-blue-600">Change username</Button>
        </form>
      </Form>
    </motion.main>
  )
}

export default ChangePassword