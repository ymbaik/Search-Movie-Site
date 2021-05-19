import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
  //Hash
  // https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
      // always scroll to top
      return { top: 0 }
  },
  //pages
  //https://google.com
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      //임의문자와 일치'.' 최대한 많은 문자 *
      //root경로에 최대한 많은 path와 일치시킨다
      path: '/:notFound(.*)',
      component: NotFound
    }
  ]
})