import { Spinner } from "./ui/spinner"

function LoadingComponent() {
  return (
    <main className='flex w-full justify-center items-center'>
      <Spinner className="size-8"/>
    </main>
  )
}

export default LoadingComponent
