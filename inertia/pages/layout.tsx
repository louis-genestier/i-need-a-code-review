import { PageProps } from '#config/inertia'
import { usePage } from '@inertiajs/react'
import { Navbar } from '~/components/navbar'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { success, errors } = usePage<PageProps>().props

  useEffect(() => {
    if (errors?.global) {
      toast.error(errors.global)
    }
    if (success?.global) {
      toast.success(success.global as unknown as string)
    }
  }, [errors, success])

  return (
    <div>
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'text-sm mt-10',
          style: {
            borderRadius: '10px',
            background: 'rgb(17 24 39)',
            color: '#fff',
            border: '1px solid rgb(31 41 55)',
          },
        }}
      />
      {/* {errors?.global && <p className="text-red-500">{errors.global}</p>}
      {success?.global && <p className="text-green-500">{success.global}</p>} */}
      <div className="px-4 pt-20">{children}</div>
    </div>
  )
}
