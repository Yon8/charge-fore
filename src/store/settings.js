import { defineStore } from 'pinia'
// 存储用户信息
export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        loginTime: '',
        id: '',
    }),
    getters: {
        getUser() {
            if (!this.username) {
                let user = JSON.parse(sessionStorage.getItem('user'))
                this.username = user.username
                this.loginTime = user.loginTime
                this.id = user.id
            }
            return {
                username: this.username,
                loginTime: this.loginTime,
                id: this.id,
            }
        }
    },
    actions: {
        setUser(data) {
            this.username = data.username
            this.loginTime = data.loginTime
            this.id = data.id

            sessionStorage.setItem('user', JSON.stringify({
                username: data.username,
                loginTime: data.loginTime,
                id: data.id
            }))
        },
        delUser() {
            sessionStorage.removeItem('user')
            this.username = ''
            this.loginTime = ''
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