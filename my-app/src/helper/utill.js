import React from 'react'

export const setLocalUser = (id, name, section, director, manager, supervisor, supplies, responsible, admin) => {
    localStorage.setItem('id', id)
    localStorage.setItem('name', name)
    localStorage.setItem('section', section)
    localStorage.setItem('director', director)
    localStorage.setItem('manager', manager)
    localStorage.setItem('supervisor', supervisor)
    localStorage.setItem('supplies', supplies)
    localStorage.setItem('responsible', responsible)
    localStorage.setItem('admin', admin)
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

export const getLocalDirector = () => {
    return localStorage.getItem('director')
}

export const getLocalManager = () => {
    return localStorage.getItem('manager')
}

export const getLocalSupervisor = () => {
    return localStorage.getItem('supervisor')
}

export const getLocalSupplies = () => {
    return localStorage.getItem('supplies')
}

export const getLocalResponsible = () => {
    return localStorage.getItem('responsible')
}

export const getLocalAdmin = () => {
    return localStorage.getItem('admin')
}

export const removeLocalUser = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('section')
    localStorage.removeItem('director')
    localStorage.removeItem('manager')
    localStorage.removeItem('supervisor')
    localStorage.removeItem('supplies')
    localStorage.removeItem('responsible')
    localStorage.removeItem('admin')
}