import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../view/login/Login";
import Register from "../view/login/Register";
import Miss from "../view/error/404"
import Repwd from "../view/login/Repwd";
import Test from "../view/test/Test";
import Index from "../view";
import movieIndex from "../view/model/movie/MovieIndex";
import movieDetail from "../view/model/movie/MovieDetail";
import movieSearch from "../view/model/movie/MovieSearch";

Vue.use(VueRouter);
export default new VueRouter({
  mode: "history", /*配置路由*/
  routes: [{
    path: "/test",
    component: Test,
  },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/re_pwd",
      component: Repwd,
    },
    {
      path: "/re_pwd/:account",
      component: Repwd,
    },
    {
      path: "/register",
      component: Register
    },

    /* 导航栏 */
    {
      path: "/",
      component: Index,
      children: [
        {
          path: "/mv",
          component: movieIndex,
        },
        {
          path: "/mv-detail/:id",
          component: movieDetail,
        },
        {
          path: "/mv-s",
          component: movieSearch,
        },
      ]
    },
    {
      path: "/movie",
      component: Index,
      children: [
        {
          path: "/mv",
          component: movieIndex
        },
      ]
    },
    {
      path: "/*",
      component: Miss
    }

  ]
})

const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
