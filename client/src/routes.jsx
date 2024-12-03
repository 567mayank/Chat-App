import {createBrowserRouter} from 'react-router-dom'
import App from "./App"
import Layout from './Layout'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'

const route = createBrowserRouter([
  {
    path : "",
    element:<Layout/>,
    children:[
      {
        path : "/",
        element:<App/>
      },
      {
        path : "/chat",
        element:<Chat/>
      },
      {
        path : "/login",
        element:<Login/>
      },
      {
        path : "/register",
        element:<Register/>
      }
    ]
  },
])

export default route