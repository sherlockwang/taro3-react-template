import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import { ModelContext, store } from '~/models'
import ErrorBoundary from '~/components/ErrorBoundary'
// 全局样式
import './app.scss'

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return (
    <React.StrictMode>
      <ModelContext.Provider value={store}>
        <ConfigProvider>
          <ErrorBoundary>
            <View id="root">{props.children}</View>
          </ErrorBoundary>
        </ConfigProvider>
      </ModelContext.Provider>
    </React.StrictMode>
  )
}

export default App
