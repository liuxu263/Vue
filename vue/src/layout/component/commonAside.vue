<!--
<template>
  <el-aside class="layout-aside" :class="setCollapseWidth">
    <Logo v-if="setShowLogo" />
    <el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
      <SubBar :menuList="menuList" :class="setCollapseWidth" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  reactive,
  computed,
  watch,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
} from "vue";

import { useStore } from "../../store/index";
import Logo from "./logo/index.vue";
import SubBar from "./navMenu/subBar.vue";
export default {
  name: "layoutAside",
  components: { Logo, SubBar },
  setup() {
    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });

    // 设置显示/隐藏 logo
    const setShowLogo = computed(() => {
      let { isShowLogo } = store.state.themeConfig;
      return isShowLogo;
    });

    // 设置侧边栏宽度
    const setCollapseWidth = computed(() => {
      let { layout, isCollapse, menuBar } = store.state.themeConfig;
      let asideBrColor =
        menuBar === "#FFFFFF" ||
        menuBar === "#FFF" ||
        menuBar === "#fff" ||
        menuBar === "#ffffff"
          ? "layout-el-aside-br-color"
          : "";
      if (layout === "columns") {
        // 分栏布局，菜单收起时宽度给 1px
        if (isCollapse) {
          return ["layout-aside-width1", asideBrColor];
        } else {
          return ["layout-aside-width-default", asideBrColor];
        }
      } else {
        // 其它布局给 64px
        if (isCollapse) {
          return ["layout-aside-width64", asideBrColor];
        } else {
          return ["layout-aside-width-default", asideBrColor];
        }
      }
    });

    // 设置菜单导航是否固定
    const initMenuFixed = (clientWidth: number) => {
      state.clientWidth = clientWidth;
    };

    // 页面加载前
    onBeforeMount(() => {
      initMenuFixed(document.body.clientWidth);
    });
    const state: any = reactive({
      menuList: [], 
      clientWidth: ''
    })

    const setFilterRoutes = () => {
      state.menuList = filterRoutesFun(store.state.routesList.routesList)
    }

    const filterRoutesFun = (arr: Array<object>) => {
      return arr
        .filter((item: any) => !item.meta.isHide)
        .map((item: any) => {
          item = Object.assign({}, item)
          if (item.children) item.children = filterRoutesFun(item.children)
          return item
        })
    }

    onBeforeMount(() => {
      initMenuFixed(document.body.clientWidth)
      setFilterRoutes();
    })
  },
};
</script>
-->
<template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
    <h3 v-show="isCollapse">LX</h3>
    <h3 v-show="!isCollapse">LX后台管理系统</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面）
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse;
    },
  },
  data() {
    return {
      menu: [
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$router.push({ name: item.name });
    },
  },
};
</script>