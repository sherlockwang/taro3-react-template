import { useEffect } from 'react'
import { Image, View } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/models'
import './index.scss'

function Index() {
  const { Counter: model } = useStore()

  useEffect(() => {
    model.getCat()
  }, [])

  const onReset = () => {
    model.reset()
    model.getCat()
  }

  return (
    <View className="nutui-react-demo">
      <View className="index">欢迎使用 NutUI React 开发 Taro 多端项目。</View>
      <Image src={model.url} />
      <View className="index">Count: {model.count}</View>
      <View className="index">
        <Button type="primary" className="btn" onClick={model.add}>
          +
        </Button>
        <Button type="primary" className="btn" onClick={model.minus}>
          -
        </Button>
        <Button type="primary" className="btn" onClick={onReset}>
          Reset
        </Button>
      </View>
    </View>
  )
}

export default observer(Index)
