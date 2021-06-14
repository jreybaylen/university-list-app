import { StorageKeyProps } from './index.interface'
import { ProfileProps } from '@interface/profile.interface'

const getExistingData = (storageKey: StorageKeyProps): ProfileProps | Array<ProfileProps> | undefined => {
    const existingUsers = localStorage.getItem(storageKey) || ''

    if (Boolean(existingUsers)) {
        return JSON.parse(existingUsers)
    }

    return undefined
}

const setDataToStorage = (storageKey: StorageKeyProps, account?: ProfileProps | Array<ProfileProps>): void => {
    localStorage.setItem(storageKey, JSON.stringify(account || ''))
}

const getAuthUserFromStorage = (): ProfileProps => {
    return getExistingData('univ-app-user-auth') as ProfileProps
}

const getDataFromStorage = (storageKey: StorageKeyProps): Array<ProfileProps> => {
    return getExistingData(storageKey) as Array<ProfileProps> || []
}

export {
    setDataToStorage,
    getDataFromStorage,
    getAuthUserFromStorage
}