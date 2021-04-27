import { createRouter, createWebHashHistory } from "vue-router";
import { user } from "@/service";
import store from "@/store";
import { message } from "ant-design-vue";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth/index.vue"),
    meta: {
      // 页面标题title
      title: "南邮文档管理系统-登陆"
    }
  },
  {
    path: "/",
    name: "BasicLayout",
    redirect: "/auth",
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "../layout/BasicLayout/index.vue"),
    children: [
      {
        path: "goods",
        name: "Goods",
        component: () => import(/* webpackChunkName: "Goods" */ "../views/Goods/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-文档管理"
        }
      },
      {
        path: "goods/:id",
        name: "GoodDetail",
        component: () =>
          import(/* webpackChunkName: "GoodDetail" */ "../views/GoodDetail/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-文档详情"
        }
      },
      {
        path: "user",
        name: "User",
        component: () => import(/* webpackChunkName: "User" */ "../views/Users/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-用户管理"
        }
      },
      {
        path: "log",
        name: "Log",
        component: () => import(/* webpackChunkName: "Log" */ "../views/Log/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-操作日志"
        }
      },
      {
        path: "reset/password",
        name: "ResetPassword",
        component: () =>
          import(/* webpackChunkName: "ResetPassword" */ "../views/ResetPassword/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-重置密码"
        }
      },
      {
        path: "invite-code",
        name: "InviteCode",
        component: () =>
          import(/* webpackChunkName: "InviteCode" */ "../views/InviteCode/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-邀请码"
        }
      },
      {
        path: "good-classify",
        name: "GoodClassify",
        component: () =>
          import(/* webpackChunkName: "GoodClassify" */ "../views/GoodClassify/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-文档分类"
        }
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import(/* webpackChunkName: "Profile" */ "../views/Profile/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-个人设置"
        }
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard/index.vue"),
        meta: {
          // 页面标题title
          title: "南邮文档管理系统-总览"
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  let res = {};

  try {
    res = await user.info();
  } catch (e) {
    if (e.message.includes("code 401")) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === "/auth") {
      next();
      return;
    }

    message.error("认证失败，请重新登入");
    next("/auth");

    return;
  }

  if (!store.state.characterInfo.length) {
    await store.dispatch("getCharacterInfo");
  }

  const reqArr = [];

  if (!store.state.userInfo.account) {
    reqArr.push(store.dispatch("getUserInfo"));
  }

  if (!store.state.goodClassify.length) {
    reqArr.push(store.dispatch("getGoodClassify"));
  }

  await Promise.all(reqArr);

  if (to.path === "/auth") {
    next("/goods");
    return;
  }

  next();
});

export default router;
