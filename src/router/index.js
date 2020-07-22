import Vue from 'vue'
import Router from 'vue-router'
import Workers from '@/components/Workers'
import Edit from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Сотрудники', component: Workers },
    { path: '/edit/:id', name: 'Редактор', component: Edit },
    { path: '*', name: 'Redirect', component: Workers }
  ],
  mode: 'history'
})
