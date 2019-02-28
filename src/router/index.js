import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import NewCard from '@/components/NewCard'
import ViewCard from '@/components/ViewCard'
import EditCard from '@/components/EditCard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/new',
      name: 'new-card',
      component: NewCard
    },
    {
      path: '/edit/:card_id',
      name: 'edit-card',
      component: EditCard
    },
    {
      path: '/card/:card_id',
      name: 'view-card',
      component: ViewCard
    }
  ]
})
