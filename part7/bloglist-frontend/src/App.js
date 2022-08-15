import { Navigate, Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList/BlogList'
import BlogView from './components/BlogView/BlogView'
import LoginForm from './components/LoginForm/LoginForm'
import NavigationMenu from './components/NavigationMenu/NavigationMenu'
import Notification from './components/Notification/Notification'
import User from './components/User/User'
import Users from './components/Users/Users'
import ProtectedRoutes from './Router/ProtectedRoute'

const App = () => {
  return (
    <>
      <Notification />
      <NavigationMenu />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Route>
        <Route path="*" element={<Navigate to={'/blogs'} />} />
      </Routes>
    </>
  )
}

export default App
