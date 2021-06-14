import { StorageKeyProps } from './index.interface'
import { ProfileProps } from '@interface/profile.interface'

const getExistingUser = (storageKey: StorageKeyProps): ProfileProps | Array<ProfileProps> | undefined => {
    const existingUsers = localStorage.getItem(storageKey) || ''

    if (Boolean(existingUsers)) {
        return JSON.parse(existingUsers)
    }

    return undefined
}

const setUserToStorage = (storageKey: StorageKeyProps, account?: ProfileProps | Array<ProfileProps>): void => {
    localStorage.setItem(storageKey, JSON.stringify(account || ''))
}

const getAuthUserFromStorage = (): ProfileProps => {
    return getExistingUser('univ-app-user-auth') as ProfileProps
}

const getUsersFromStorage = (storageKey: StorageKeyProps): Array<ProfileProps> => {
    return getExistingUser(storageKey) as Array<ProfileProps> || []
}

export {
    setUserToStorage,
    getUsersFromStorage,
    getAuthUserFromStorage
}