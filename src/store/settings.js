import { defineStore } from 'pinia'
// 存储用户信息
export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        id: '',
    }),
    getters: {
        getUser() {
            if (!this.username) {
                let user = JSON.parse(sessionStorage.getItem('user'))
                if (user){
                    this.username = user.username
                    this.id = user.id
                }else {
                    this.username = "未登录用户"
                    this.id = "0"
                }
            }
            return {
                username: this.username,
                id: this.id,
            }
        }
    },
    actions: {
        setUser(data) {
            this.username = data.username
            this.id = data.id

            sessionStorage.setItem('user', JSON.stringify({
                username: data.username,
                id: data.id
            }))
        },
        delUser() {
            sessionStorage.removeItem('user')
            this.username = ''
            this.id = ''
        }
    }
})

// 存储 token
export const useTokenStore = defineStore('token', {
    state: () => ({
        token: '',
    }),
    getters: {
        getToken() {
            if (!this.token) {
                this.token = sessionStorage.getItem('token')
            }
            return this.token;
        }
    },
    actions: {
        setToken(data) {
            this.token = data
            sessionStorage.setItem('token', data)
        },
        delToken() {
            sessionStorage.removeItem('token')
            this.token = ''
        }
    }
})

// 存储菜单信息
export const useMenuStore = defineStore('menu', {
    state: () => ({
        menu: '',
    }),
    getters: {
        getMenu() {
            if (!this.menu) {
                this.menu = JSON.parse(sessionStorage.getItem('menu'))
            }
            return this.menu;
        }
    },
    actions: {
        setMenu(data) {
            this.menu = data
            sessionStorage.setItem('menu', JSON.stringify(data))
        },
        delMenu() {
            this.menu = ''
            sessionStorage.removeItem('menu');
        }
    }
})