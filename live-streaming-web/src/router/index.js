import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import RTMP_HttpFlv_Pull from '../views/RTMP_HttpFlv_Pull.vue'
import RTMP_Push from '../views/RTMP_Push.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/RTMP_HttpFlv_Pull', component: RTMP_HttpFlv_Pull },
    { path: '/RTMP_Push', component: RTMP_Push }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
