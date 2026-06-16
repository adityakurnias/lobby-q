export const useSSE = (username: string, onUpdate?: () => void) => {
  const queueStore = useQueueStore()
  let eventSource: EventSource | null = null

  const connect = () => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBaseUrl}/public/events/${username}`
    eventSource = new EventSource(url)

    eventSource.addEventListener('queue_update', (event: MessageEvent) => {
      try {
        if (onUpdate) {
          onUpdate()
        } else {
          const data = JSON.parse(event.data)
          queueStore.handleRealtimeEvent(data)
        }
      } catch {
        // ignore malformed events
      }
    })

    eventSource.onerror = () => {
      // Connection error - EventSource will auto-retry
      // Optionally implement exponential backoff here
    }
  }

  const disconnect = () => {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
  }

  // Auto-disconnect when component is unmounted to prevent memory leaks
  onBeforeUnmount(() => {
    disconnect()
  })

  return { connect, disconnect }
}
