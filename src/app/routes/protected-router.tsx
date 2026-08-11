import { useAuthStore } from "@shared/models"
import { DefaultLayout } from "../layout"
import { URLS } from "@shared/consts"
import { Navigate } from "react-router-dom"


export const ProtectedRouter = () => {
  const isAuth = useAuthStore(state => state.isAuth)

  return isAuth ? <DefaultLayout/> : <Navigate to={URLS.login}/>
}