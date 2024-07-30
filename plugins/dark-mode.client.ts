export default defineNuxtPlugin(() => {
  const darkMode = useDarkMode()
  // Update dark mode state on first client side load
  // based on prefers-color-scheme media
  darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})
