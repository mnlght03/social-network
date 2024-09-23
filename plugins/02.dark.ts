export default defineNuxtPlugin(async () => {
  const dark = useDarkMode()
  if (import.meta.server) {
    const header = useRequestHeader('Sec-CH-Prefers-Color-Scheme')
    dark.value = header === 'dark'
  }
  else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    dark.value = prefersDark
  }
})
