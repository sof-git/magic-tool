// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const RomTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#5E2B7E', // Royal Purple
    secondary: '#2D6A4F', // Moss Green
    accent: '#FFD700', // Shiny Gold
    background: '#1E2749', // Midnight Blue
    backgroundLight: '#3C4A63', // Soft Blue-Grey
    grey: '#BDC3C7', // Silver Grey for text
    error: '#C0392B', // Crimson Red for errors
    success: '#28B463', // Enchanted Emerald Green for success
    info: '#5DADE2', // Sky Blue for spells like ice or water
    warning: '#F39C12', // Golden Amber for caution or traps
    black: '#000000', // Black for text
    white: '#FFFFFF', // White for text
  },
}

const RomThemeDark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#4A1E68', // Deep Mystic Purple
    secondary: '#1D5C42', // Dark Emerald Green
    accent: '#FFBF00', // Fiery Amber
    background: '#14192B', // Charcoal Blue
    error: '#E74C3C', // Brighter Red for errors
    success: '#58D68D', // Bright Success Emerald
    info: '#85C1E9', // Brighter Sky Blue
    warning: '#E07B39', // Copper
    black: '#000000', // Black for text
    white: '#FFFFFF', // White for text
  },
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