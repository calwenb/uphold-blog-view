import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../view/login/Login";
import Register from "../view/login/Register";
import Miss from "../view/error/404"
import Repwd from "../view/login/Repwd";
import Test from "../view/test/Test";
import Index from "../view";
import blogIndex from "../view/model/blog/BlogIndex";
import blogDetail from "../view/model/blog/BlogDetail";
import blogEdit from "../view/model/blog/BlogEdit";
import TagList from "../view/model/blog/TagList";
import Type from "../view/model/type/Type";

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
          path: "/blog",
          component: blogIndex,
        },
        {
          path: "/blog-detail/:id",
          component: blogDetail,
        },
        {
          path: "/blog/md/:id",
          component: blogEdit,
        },
        {
          path: "/blog/md",
          component: blogEdit,
        },
        {
          path: "/tag",
          component: TagList,
        },
        {
          path: "/type",
          component: Type,
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
