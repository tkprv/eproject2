import React from 'react'
export const setLocalUser = (id, name,section) => {
    localStorage.setItem('id', id)
    localStorage.setItem('name', name)
    localStorage.setItem('section', section)

}
export const getLocalId = () => {
    return localStorage.getItem('id')
}
export const getLocalName = () => {
    return localStorage.getItem('name')

}
export const getLocalSection = () => {
    return localStorage.getItem('section')

}