import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由

const Layout = () => import('@/layout/index.vue')

const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path: '/',//url路径
			//component: Layout,//全局统一的布局文件
			name: 'LoginIn',
			component: () => import('@/views/login/loginIn.vue')//懒加载
			// children: [
			// 	{
			// 		path: '/',//二级路径
			// 		name: 'home',
			// 		component: () => import('@/views/login/loginIn.vue')//懒加载
			// 	}
			// ]
		},
		{
			path: '/user',
			name: 'user',
			component: () => import('views/demo/index.vue'),
		},
		{
			path: '/mall',
			name: 'mall',
			component: () => import('views/icon/index.vue'),
		},
		{
			path: '/page1',
			name: 'page1',
			component: () => import('views/icon/index.vue'),
		},
		{
			path: '/page2',
			name: 'page2',
			component: () => import('views/icon/index.vue'),
		},

	]
})

// 删除/重置路由
export function resetRoute(): void {
	router.getRoutes().forEach(route => {
		const { name } = route
		if (name) {
			router.hasRoute(name) && router.removeRoute(name)
		}
	})
}

export function setupRouter(app: App<Element>) {
	app.use(router)
}
export default router
