import {  createSlice, type PayloadAction,} from '@reduxjs/toolkit'


export interface Item {
  id: string
  name: string
  age: number
}

interface ItemState {
  items: Item[]
}

const initialState: ItemState = {
  items: [],
}

const itemSlice  = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(i => i.id !== action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload
    },
  
  },

})

export const { addItem, updateItem, deleteItem, setItems} = itemSlice.actions
export default itemSlice.reducer