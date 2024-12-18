import {createBrowserRouter} from 'react-router-dom'
import Layout from './Layout'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Chat from './Pages/Chat'

const route = createBrowserRouter([
  {
    path : "",
    element:<Layout/>,
    children:[
      {
        path : "/",
        element:<Login/>
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