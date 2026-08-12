/// <reference types="vitest/config" />
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './demos',
  plugins: [vue()],
  test: {
    root: '.',
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
})
