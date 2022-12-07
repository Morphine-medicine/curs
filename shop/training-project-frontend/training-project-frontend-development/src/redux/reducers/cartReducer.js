import { createSlice } from '@reduxjs/toolkit'


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [

    ],
    addedItems: [],
    filteredItems: [],
    totalPrice: 0
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items
      state.filteredItems = action.payload.items
    },

    addToCart(state, action) {
      const addedItem = state.items.find(item => item._id === action.payload._id)

      const existedItem = state.addedItems.find(item => action.payload._id === item._id)

      if (existedItem) {
        existedItem.quantity += action.payload.quantity
      } else {
        addedItem.quantity = action.payload.quantity
        state.addedItems.push(addedItem)
      }
      state.totalPrice += addedItem.price * action.payload.quantity
    },

    addQuantity(state, action) {
      const addedItem = state.addedItems.find(item => item._id === action.payload._id)

      addedItem.quantity += 1
      state.totalPrice += addedItem.price
    },

    subQuantity(state, action) {
      const addedItem = state.addedItems.find(item => item._id === action.payload._id)

      if (addedItem.quantity === 1) {
        const newItems = state.addedItems.filter(item => action.payload._id !== item._id)

        state.addedItems = newItems
        state.totalPrice -= addedItem.price
      } else {
        addedItem.quantity -= 1

        state.totalPrice -= addedItem.price
      }
    },

    sortItems(state, action) {
      if (action.payload.sortType === 'lowPrice') {
        state.filteredItems.sort((a, b) => a.price - b.price)
      } else if (action.payload.sortType === 'highPrice') {
        state.filteredItems.sort((a, b) => b.price - a.price)
      }
    },

    searchItems(state, action) {
      state.filteredItems = state.items.filter(item => {
        return (
          item.title.toLowerCase().includes(action.payload.searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(action.payload.searchText.toLowerCase())
        )
      })
    },

    clearCart(state) {
      state.addedItems = []
      state.totalPrice = 0
    }
  }
})

export const { setItems, addToCart, addQuantity, subQuantity, sortItems, searchItems, clearCart } = cartSlice.actions

export default cartSlice.reducer