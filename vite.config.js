import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // ─── Smart Code Splitting — Flipkart pattern ────────────────────────────────
  // Har chunk sirf tab download hoga jab user us route/section ko visit kare.
  // Isse initial page load drastically fast hota hai.
  build: {
    rollupOptions: {
      output: {
        // Manual chunks: related code groups ek saath rakhein
        manualChunks: (id) => {
          // 1. React core — ek baar load, har jagah reuse
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react'
          }

          // 2. GSAP — animation library, separate chunk
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }

          // 3. Admin panel — poora admin ek chunk, normal users download nahi karenge
          if (id.includes('AdminLogin') || id.includes('AdminDashboard') || id.includes('AdminContext') ||
              id.includes('AdminLayout') || id.includes('AdminPageWrapper') ||
              id.includes('TotalApplications') || id.includes('ViewApplications') ||
              id.includes('UnviewedApplications') || id.includes('PendingApplications') ||
              id.includes('RejectedApplications') || id.includes('UploadedDocuments') ||
              id.includes('PendingDocuments') || id.includes('ApprovedLoans') ||
              id.includes('DisbursedLoans') || id.includes('CheckCibil') ||
              id.includes('ApplicationList')) {
            return 'chunk-admin'
          }

          // 4. Calculator pages — ek chunk
          if (id.includes('EmiCalculator') || id.includes('EligibilityCalculator') ||
              id.includes('RdCalculator') || id.includes('SipCalculator') ||
              id.includes('FdCalculator') || id.includes('GstCalculator')) {
            return 'chunk-calculators'
          }

          // 5. Heavy pages — alag chunks
          if (id.includes('BalanceTransferPage')) return 'chunk-balance-transfer'
          if (id.includes('ApplicationPortal') || id.includes('UploadDocuments')) return 'chunk-portal'
          if (id.includes('CheckCibil')) return 'chunk-cibil'
          if (id.includes('EligibilityCalculatorPage')) return 'chunk-eligibility'

          // 6. Baaki node_modules — vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor-libs'
          }
        },

        // Chunk naming pattern: [name]-[hash].js
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },

    // Chunk size warning — 600KB tak allow karo (libraries badi hain)
    chunkSizeWarningLimit: 600,
  },

  server: {
    proxy: {
      '/api_test': {
        target: 'https://zerocommissionloan.com/api_v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_nextpay/, ''),
      },
      '/api_zerocom': {
        target: 'https://zerocommissionloan.com/api_v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_zerocom/, ''),
      },
      '/api_base': {
        target: 'https://zerocommissionloan.com/api_v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_base/, ''),
      },
    },
  },
})
