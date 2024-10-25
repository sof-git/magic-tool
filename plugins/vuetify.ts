// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const RomTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#7D3C98', // Mystic Purple
    secondary: '#196F3D', // Forest Green
    accent: '#FF6F00', // Fiery Orange
    background: '#2C3E50', // Dark Mystic Background
    backgroundLight: '#34495E', // Lighter Mystic Background 
    grey: '#BDC3C7', // Silver Grey for text
    error: '#C0392B', // Crimson Red for errors
    success: '#28B463', // Enchanted Emerald Green for success
    info: '#5DADE2', // Sky Blue for spells like ice or water
    warning: '#F39C12', // Golden Amber for caution or traps
  }
}

const RomThemeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#A569BD', // Slightly brighter Mystic Purple
    secondary: '#27AE60', // Lively Forest Green
    accent: '#F39C12', // Fiery Amber
    background: '#1C2833', // Deep, Darker Background
    error: '#E74C3C', // Brighter Red for errors
    success: '#58D68D', // Bright Success Emerald
    info: '#85C1E9', // Brighter Sky Blue
    warning: '#F5B041', // Warmer Warning Amber
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light', // Use either 'light' or 'dark' here
      themes: {
        light: RomTheme,
        dark: RomThemeDark,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})