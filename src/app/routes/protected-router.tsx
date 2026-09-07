import { useAuthStore } from "@shared/models"
import { LayoutWithSidebar } from "../layout"
import { URLS } from "@shared/consts"
import { Navigate } from "react-router-dom"


export const ProtectedRouter = () => {
  const isAuth = useAuthStore(state => state.isAuth)

  return isAuth ? <LayoutWithSidebar/> : <Navigate to={URLS.login}/>
}