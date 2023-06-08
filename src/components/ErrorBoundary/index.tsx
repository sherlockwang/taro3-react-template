import { Button } from '@nutui/nutui-react-taro'
import { View, Text } from '@tarojs/components'
import { Component, ReactNode } from 'react'

interface IProps {
  children: ReactNode
  message?: string
}

interface IState {
  hasError: boolean
  error?: object | null
}

class ErrorBoundary extends Component<IProps, IState> {
  public static defaultProps = {
    message: '请刷新页面重试',
  }

  public constructor(props: IProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  public static getDerivedStateFromError(_: Error): IState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
    })
    // You can also log error messages to an error reporting service here
  }

  private onRefresh = () => {
    location.reload()
  }

  public render() {
    if (this.state.hasError) {
      // Error path
      return (
        <View className="error-boundary">
          <Text>{this.props.message}</Text>
          <Button onClick={this.onRefresh}>刷新页面</Button>
          <View>
            <View className="error-info">{this.state.error && this.state.error.toString()}</View>
          </View>
        </View>
      )
    }
    // Normally, just render children
    return this.props.children
  }
}

export default ErrorBoundary
