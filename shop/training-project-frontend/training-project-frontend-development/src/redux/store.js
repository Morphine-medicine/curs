import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import allUsersReducer from './reducers/allUsersReducer'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  userInfo: userReducer,
  allUsers: allUsersReducer,
  cart: cartReducer
})


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['userInfo', 'allUsers']
}

const persistedReducer = persistReducer(persistConfig, reducers)


export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})