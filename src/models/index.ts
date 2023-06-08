import { createContext, useContext } from 'react'
import { types, Instance, unprotect } from 'mobx-state-tree'
import { Auth } from './Auth'
import { Counter } from './Counter'

// Root Store
export const RootStore = types.model('Main', {
  Auth: types.optional(Auth, {}),
  Counter: types.optional(Counter, {}),
})

export type RootStoreModel = Instance<typeof RootStore>

// init store variable
const initStore = {}

// Create store instance
const store = RootStore.create(initStore)
// allow change store value outside action
unprotect(store)

// Create context for store
const ModelContext = createContext(store)
const useStore = () => useContext(ModelContext)

export { store, ModelContext, useStore }
