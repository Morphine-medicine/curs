import { backendUrl } from '../clientConfig'

export const getData = async (url) => {
  const response = await fetch(`${backendUrl}${url}`, {
    credentials: 'include',
    mode: 'cors'
  })
  return response.ok ? response.json() : Promise.reject(response)
}
export const postData = async (url, data) => {
  const response = await fetch(`${backendUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

export const patchData = async (url, data) => {
  const response = await fetch(`${backendUrl}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

export const putData = async (url, data) => {
  const response = await fetch(`${backendUrl}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

export const deleteData = async (url) => {
  const response = await fetch(`${backendUrl}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
  })
  return response.ok ? response.json() : Promise.reject(response)
}

export const putImage = async (url, image) => {
  const formData = new FormData()
  formData.append('file', image)
  const response = await fetch(`${backendUrl}${url}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    body: formData
  })
  return response.ok ? response.json() : Promise.reject(response)
}


