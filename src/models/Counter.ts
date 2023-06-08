import { types, Instance, flow } from 'mobx-state-tree'
import { cat } from '~/services'

export const Counter = types
  .model('Counter')
  .props({
    count: 0,
    url: '',
  })
  .actions(self => ({
    add() {
      self.count++
    },
    minus() {
      self.count--
    },
    reset() {
      self.count = 0
    },
    getCat: flow(function* () {
      const res = yield cat.getCat()

      self.url = res.url
    }),
  }))

export type ICounter = Instance<typeof Counter>
