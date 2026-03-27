import { Github } from "lucide-react"
import Link from "next/link"

function Footer() {
    return (
        <footer className="flex w-full h-5 mt-5 p-5 z-900 bg-gray-200">
            <small className="flex w-full justify-center items-center gap-x-2.5">
                Made by Adil Maharramov <Link href={'https://github.com/AdilMeherremov'}><Github size={20}/></Link>
            </small>
        </footer>
    )
}

export default Footer
