import VueRouter from 'vue-router'

import home from '../components/home'
import myWish from '../components/myWish'
import rankingList from '../components/rankingList'
import backstage from '../components/backstage'
export default new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'home'
        },
        {
            path:'/home',
            component:home
        },
        {
            path:'/myWish',
            component:myWish
        },
        {
            path:'/rankingList',
            component:rankingList
        },
        {
            path:'/backstage',
            component:backstage
        },
    ]
})