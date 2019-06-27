import { app, router } from './app'

// app.$mount('#app')

router.onReady(() => {
  app.$mount('#app')
})
