import hyRequest from '..'

import { IAccount, ILoginType, IDataType } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMeun = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginType>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMeun + id + '/menu',
    showLoading: false
  })
}
