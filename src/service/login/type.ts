export interface IAccount {
  name: string
  password: string
}

export interface ILoginType {
  id: number
  name: string
  token: string
}

// 定义返回值的类型
export interface IDataType<T = any> {
  code: number
  data: T
}
