import { createApp } from 'vue'
import { createRouter,createWebHashHistory } from 'vue-router'

// import "vue-select/src/scss/vue-select.scss";
// import vSelect from "vue-select";
import core from './core.js'
// import store from './store'
import App from './App.vue'
import './index.css'
import PrintBar from './components/PrintBar.vue'
// import ImageBar from './components/ImageBar.vue'
import TextBar from './components/TextBar.vue'
import ProductBar from './components/ProductBar.vue'
// import DrawBar from './components/DrawBar.vue'
import Home from './components/Home.vue'

const routes=[
  {path:'/', component: Home},
  {path:'/prints', component: PrintBar},
  {path:'/text', component: TextBar},
  // {path:'/images', component: ImageBar},
  {path:'/product', component: ProductBar},
  // {path:'/draw', component: DrawBar},
]
const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

createApp(App).use(router).mixin(core).mount('#app')
