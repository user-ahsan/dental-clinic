import { toast } from 'sonner'

export const showSuccess = (message: string) => toast.success(message)

export const showError = (message: string) => toast.error(message, { duration: 5000 })

export const showInfo = (message: string) => toast(message)

export const showPromise = <T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string }
) => toast.promise(promise, messages)
