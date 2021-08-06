import { Module } from 'vuex'
import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuById
} from '@/service/login/login'
import localCatch from '@/utiles/catch'

import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/service/login/type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMeun: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMeuns: any) {
      state.userMeun = userMeuns
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 登录请求
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCatch.setCatch('token', token)

      // 登录成功后请求用户数据
      const loginUserInfo = await requestUserInfoById(id)
      const userInfo = loginUserInfo.data
      commit('changeUserInfo', userInfo)
      localCatch.setCatch('userInfo', userInfo)

      // 请求用户的功能菜单
      const loginMenu = await requestUserMenuById(id)
      const userMenus = loginMenu.data
      commit('changeUserMenu', userMenus)
      localCatch.setCatch('userMenu', userMenus)

      // 跳转到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCatch.getCatch('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCatch.getCatch('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCatch.getCatch('userMenu')
      if (userMenus) {
        commit('changeUserMenu', userMenus)
      }
    }
  }
}

export default loginModule
