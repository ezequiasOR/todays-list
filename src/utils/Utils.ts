import format from 'date-fns/format'

export const getValueDate = (date, formatDate = 'dd/MM/yyyy HH:mm:ss') => {
  return format(new Date(date).getTime(), formatDate)
}

export const checkUser = () => {
  const user = getUser()
  return user && user.id
}

// return the user data from the local storage
export const getUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  else return null
}

// return the token from the local storage
export const getToken = () => {
  return localStorage.getItem('token') || null
}

// remove the token and user from the local storage
export const removeUserSession = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// set the token and user from the local storage
export const setUserSession = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}
