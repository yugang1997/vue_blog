import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('../views/home/Home.vue')
const About = () =>
    import ('../views/about/About.vue')
const Article = () =>
    import ('../views/article/Article.vue')
const Blog = () =>
    import ('../views/blog/Blog.vue')
const Diary = () =>
    import ('../views/diary/Diary.vue')
const Err = () =>
    import ('../views/404/404.vue')
const Links = () =>
    import ('../views/links/Links.vue')
const Message = () =>
    import ('../views/message/Message.vue')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/article/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/blog/:id',
        name: 'blog',
        component: Blog
    },
    {
        path: '/diary',
        name: 'diary',
        component: Diary
    },
    {
        path: '*',
        name: '404',
        component: Err
    },
    {
        path: '/message',
        name: 'message',
        component: Message
    },
    {
        path: '/links',
        name: 'links',
        component: Links
    },
]

const router = new VueRouter({
    routes
})

export default router