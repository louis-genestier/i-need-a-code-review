import { PageProps } from '#config/inertia'
import { usePage } from '@inertiajs/react'
import { Navbar } from '~/components/navbar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { success, errors } = usePage<PageProps>().props

  return (
    <div>
      <Navbar />
      {errors?.global && <p className="text-red-500">{errors.global}</p>}
      {success?.global && <p className="text-green-500">{success.global}</p>}
      {children}
    </div>
  )
}
