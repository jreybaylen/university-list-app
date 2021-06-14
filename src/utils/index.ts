import { ProfileProps } from '@interface/profile.interface'
import { StorageKeyProps, UniversityStorageProps } from './index.interface'

const getExistingData = (storageKey: StorageKeyProps): ProfileProps | Array<ProfileProps> | undefined => {
    const existingUsers = localStorage.getItem(storageKey) || ''

    if (Boolean(existingUsers)) {
        return JSON.parse(existingUsers)
    }

    return undefined
}

const getAuthUserFromStorage = (): ProfileProps => {
    return getExistingData('univ-app-user-auth') as ProfileProps
}

const getDataFromStorage = (storageKey: StorageKeyProps): Array<ProfileProps | UniversityStorageProps> => {
    return getExistingData(storageKey) as Array<ProfileProps | UniversityStorageProps> || []
}

const getUniversityListByUser = (storageKey: StorageKeyProps, usernameFromStorage: string) => {
    const dataFromStorage = getDataFromStorage(storageKey) as Array<UniversityStorageProps>
    const univListFromStorageByUser = dataFromStorage.find(
        (userWithUniv: UniversityStorageProps) => {
            const [username] = Object.keys(userWithUniv)

            return username === usernameFromStorage
        }
    )
    const saveUniversityByUser = (univListFromStorageByUser && univListFromStorageByUser[ usernameFromStorage ]) || {}

    return saveUniversityByUser
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setDataToStorage = <T, U>(storageKey: StorageKeyProps, account?: ProfileProps | Array<ProfileProps> | U): void => {
    localStorage.setItem(storageKey, JSON.stringify(account || ''))
}

export {
    setDataToStorage,
    getDataFromStorage,
    getAuthUserFromStorage,
    getUniversityListByUser
}