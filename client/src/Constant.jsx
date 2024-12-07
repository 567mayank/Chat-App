export const db =  "https://chat-app-yok3.onrender.com"

export const isLoggedIn = () => {
  const local = sessionStorage.getItem("user")
  return local
}