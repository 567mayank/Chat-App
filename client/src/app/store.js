import {configureStore} from '@reduxjs/toolkit'
import chatReducer from '../Redux/chatSlice'
import msgReducer from '../Redux/msgSlice'

const store = configureStore({
  reducer : {
    chat : chatReducer,
    msg : msgReducer
  }
})

export default store