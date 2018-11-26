import Vue from 'vue'
import Router from 'vue-router'
import searchplayer from '@/components/searchplayer'
import csstats from '@/components/csstats'
import dotastats from '@/components/dotastats'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'searchplayer',
        component: searchplayer,
        children: [
          {
            path: 'csstats/:id',
            name: 'csstats',
            component: csstats,
            props: true
          },
          {
            path: 'dotastats/:id',
            name: 'dotastats',
            component: dotastats,
            props: true
          },
        ]
    },
    // {
    //   path: '/dotastats/:id',
    //   name: 'Dota Stats',
    //   component: dotastats
    // }
]
})
