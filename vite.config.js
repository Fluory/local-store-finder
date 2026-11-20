import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `vite preview` sends the same security headers as Vercel (vercel.json), so
// the Content-Security-Policy can be checked locally against the real build.
const vercelHeaders = Object.fromEntries(
  JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
    .headers[0].headers.map(({ key, value }) => [key, value])
)

export default defineConfig({
  plugins: [react()],
  preview: { headers: vercelHeaders },
  optimizeDeps: {
    include: ['opening_hours', 'html5-qrcode'],
  },
})
