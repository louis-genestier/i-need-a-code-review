import { PageProps } from '#config/inertia'
import { usePage } from '@inertiajs/react'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { success, errors } = usePage<PageProps>().props

  return (
    <div>
      <h1>I Need A Code Review</h1>
      {errors?.global && <p className="text-red-500">{errors.global}</p>}
      {success?.global && <p className="text-green-500">{success.global}</p>}
      {children}
    </div>
  )
}
