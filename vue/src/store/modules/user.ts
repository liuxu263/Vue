import { loginIn } from '@/api/login' //引入登录api接口

const user = {
    namespaced: true,
    state: {
        userInfo: []
    },
    mutations: {
        setStateItem(state: any, data: any) {
            state[data.key] = data.value;
        }
    },
    actions: {
        //登录，定义LoginIn 方法，在组件中使用 this.$store.dispath("LoginIn") 掉用
        loginIn({ commit }: any, data: any) {
            return new Promise((resolve, reject) => {
                loginIn(data).then(response => {
                    commit('loginIn')
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user