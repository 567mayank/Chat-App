export const db =  "http://localhost:3000"

export const isLoggedIn = () => {
  const local = sessionStorage.getItem("user")
  return local
}