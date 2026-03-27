'use server'

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "../lib/supabase/admin";

export async function CheckIfUserExist() {
    const supabase = await createClient()

    const { error } = await supabase.auth.getUser()

    if (error){
        return {userExist: false}
    }

    return { userExist: true }
}

export async function SignUpUser(data: any) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                username: data.username
            }
        }
    })

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true }
}

export async function LogInUser(data: any) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    })

    if (error) {
        return { success: false, message: error.message }
    }

    return { success: true }
}

export async function LogOutUser() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function createPost(data: any) {
    const supabase = await createClient()
    const UserId = (await supabase.auth.getUser()).data.user?.id

    const { data: User } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', UserId)
        .single()

    const { error } = await supabase
        .from('posts')
        .insert({
            posterId: UserId,
            posterusername: User?.username,
            posttitle: data.posttitle,
            postcontent: data.postdescription
        })

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function fetchPostData() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .select('*')

    if (error) return { success: false, message: error.message }

    return { success: true, data }
}

export async function fetchProfileData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user?.id)
        .single()

    if (error) return { success: false, message: error.message }

    return { success: true, profile }
}

export async function UpdatePassword(data: any) {
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
        password: data.newpassword
    })

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function UpdateUnauthPassword(data: any) {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: 'http://localhost:3000/protected/change-password'
    })

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function changeUsername(data: any) {
    const supabase = await createClient()
    const { data: UserData } = await supabase.auth.getUser()

    const { error } = await supabase.from('profiles')
        .update({
            username: data.newusername
        }).eq('id', UserData.user?.id)

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function DeleteAccount() {
    const supabase = await createClient()
    const adminCient = createAdminClient()
    const { data: UserData } = await supabase.auth.getUser()

    const { error } = await adminCient.auth.admin.deleteUser(UserData.user!.id)
    supabase.auth.signOut()

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function FetchPost(postId: number) {
    const supabase = await createClient()
    const { data: User } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

    if (error) return {
        message: error.message
    }
    else if (data.posterId == User.user?.id) {
        return { data, postOwner: true }
    }

    return { data, postOwner: false }
}

export async function EditPostContent(PostId: number, newcontent: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('posts')
        .update({
            postcontent: newcontent
        })
        .eq('id', PostId)

    if (error) return { success: false, message: error.message }

    return { success: true }
}

export async function deleteBlog(PostId: number) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', PostId)

    if (error) return { success: false, message: error.message }

    return { success: true }
}