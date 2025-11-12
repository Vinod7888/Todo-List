import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Todo-List/', // 👈 yaha apne repo ka naam likho
})
