<template>
    <el-container style="height: 100%">
        <!--左侧栏-->
        <el-aside width="auto">
            <!--左侧栏控件-->
            <common-aside></common-aside>
        </el-aside>
        <!--右侧栏-->
        <el-container>
            <!--header部分-->
            <el-header>
                <!--header部分控件-->
                <common-header></common-header>
            </el-header>
            <el-main>
   <!--左侧栏 和 header部分对于整个后台部分都是不变的，唯一变的就是上面3的部分，这里就通过router-view来展示所需控件-->
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
  import { computed, getCurrentInstance, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '../../store/index'
  import layoutAside from '../component/commonAside.vue'
  import layoutHeader from '../component/commonHeader.vue'
  import MainView from '../component/mainView.vue'
  
  export default {
    name: 'layoutDefaults',
    components: { layoutAside, layoutHeader, MainView },
    setup() {
      const { proxy } = getCurrentInstance() as any
      const store = useStore()
      const route = useRoute()
  		const isFixedHeader = computed(() => {
        return store.state.themeConfig.isFixedHeader;
      });
      //监听路由的变化
      watch(
        () => route.path,
        () => {
          proxy.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0
        }
      )
      return {
        isFixedHeader
      }
    }
  }
</script>