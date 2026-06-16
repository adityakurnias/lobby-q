interface Toast {
  type: 'success' | 'error' | 'warning'
  message: string
  duration?: number
}

export const useToast = () => {
  const addToast = inject<{ addToast: (type: Toast['type'], message: string, duration?: number) => void }>('toast')

  if (!addToast) {
    // Fallback if toast provider not available
    return {
      showToast: (_toast: Toast) => {
        console.warn('Toast provider not available. Make sure <UiLqToast /> is mounted.')
      },
    }
  }

  return {
    showToast: (toast: Toast) => {
      addToast.addToast(toast.type, toast.message, toast.duration)
    },
  }
}
