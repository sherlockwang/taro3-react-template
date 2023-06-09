import { types, Instance, flow } from 'mobx-state-tree'
import Taro from '@tarojs/taro'

const tmpIds = ['']

export const Auth = types
  .model('Auth')
  .props({
    login: false,
    code: '',
    appId: '',
    openId: '',
    sessionKey: '',
    hasAccessToUserInfo: false,
    subscribed: false,
  })
  .actions(self => ({
    getLoginCode: flow(function* (options) {
      self.getParamsByScene(options)

      const res = yield Taro.login()

      if (res.errMsg === 'login:ok') {
        self.checkSubscriptionStatus()

        self.code = res.code
        self.appId = Taro.getAccountInfoSync().miniProgram.appId

        const params = {
          appId: self.appId,
          code: self.code,
        }

        try {
          // custom user system logic
          // const authInfo = yield post('miniapp/users', params)
          // self.openId = authInfo.data.openId
          // self.sessionKey = authInfo.data.sessionKey
          // Taro.setStorage({ key: 'openId', data: self.openId })
          // Taro.setStorage({ key: 'sessionKey', data: self.sessionKey })
        } catch (error) {
          console.log(error)
        }

        // logged in
        self.login = true
      } else {
        self.login = false
      }
    }),
    checkSubscriptionStatus: flow(function* (cb: Function = () => {}) {
      yield Taro.getSetting({
        withSubscriptions: true,
        success(res) {
          let itemSettingsKeys: String[] = []

          if (typeof res.subscriptionsSetting.itemSettings === 'object') {
            itemSettingsKeys = Object.keys(res.subscriptionsSetting.itemSettings)
          }

          if (res.authSetting['scope.userInfo']) {
            self.hasAccessToUserInfo = true
          }

          self.subscribed = tmpIds.every(item => itemSettingsKeys.includes(item))

          cb()
        },
      })
    }),
    setUserInfo(res) {
      if (res.detail.errMsg === 'getUserInfo:ok') {
        self.hasAccessToUserInfo = true
      }

      if (self.hasAccessToUserInfo) {
        // set custom user system info
      }
    },
    getSubscribeMessageAuth: flow(function* (cb: Function) {
      yield Taro.requestSubscribeMessage({
        tmplIds: tmpIds,
        success(res) {
          // 成功
          console.log(res)

          if (res[tmpIds[0]] === 'accept') {
            self.checkSubscriptionStatus(cb)
          }
        },
      })
    }),
    getParamsByScene(options) {
      // 订阅消息进入
      if (`${options.scene}` === '1014') {
      }
    },
  }))

export type IAuth = Instance<typeof Auth>
