import { environment } from '@config/environment'
import { StorageKeyProps } from '@util/index.interface'
import { getDataFromStorage, setDataToStorage, getAuthUserFromStorage, getUniversityListByUser } from '@util/index'

const name = 'John Doe'
const username = 'johndoe'
const password = 'test12345'
const { userStorage, authStorage, saveUnivStorage, delimiter } = environment as { [ key: string ]: StorageKeyProps }

describe('Utils', () => {
    beforeEach(() => {
        setDataToStorage(authStorage, { name, username, password })
    })

    it('Should call all the available methods in utils', () => {
        const spyLoStoSet = jest.spyOn(localStorage, 'setItem')
        const spyLoStoGet = jest.spyOn(localStorage, 'getItem')
        const spyLoStoRemove = jest.spyOn(localStorage, 'removeItem')
        const spyLoStoClear = jest.spyOn(localStorage, 'clear')

        setDataToStorage(authStorage, { name, username, password })
        getDataFromStorage(authStorage)
        localStorage.removeItem(authStorage)
        localStorage.clear()
        expect(spyLoStoSet).toHaveBeenCalled()
        expect(spyLoStoGet).toHaveBeenCalled()
        expect(spyLoStoRemove).toHaveBeenCalled()
        expect(spyLoStoClear).toHaveBeenCalled()
    })

    it('Should get data from local storage and the default value should empty array', () => {
        const spyLoStoGet = jest.spyOn(localStorage, 'getItem')
        const data = getDataFromStorage(userStorage)

        expect(data.length).toBe(0)
        expect(spyLoStoGet).toHaveBeenCalled()
    })

    it('Should get data from local storage and the value should not empty array', () => {
        setDataToStorage(userStorage, [ { name, username, password } ])

        const userInfo = getDataFromStorage(userStorage)
        const [ firstUserInfo ] = userInfo as any

        expect(firstUserInfo.name).toBe(name)
        expect(firstUserInfo.username).toBe(username)
        expect(firstUserInfo.password).toBe(password)
    })

    it('Should set auth user and get the information of that account', () => {
        const storageInfo = getAuthUserFromStorage()

        expect(storageInfo.name).toBe(name)
        expect(storageInfo.username).toBe(username)
        expect(storageInfo.password).toBe(password)
    })

    it('Should set and get university list of authenticated user', () => {
        const alpha_two_code = 'PH'
        const country = 'Philippines'
        const univName = 'Adamson University'
        const domainsAndWebPages = 'https://test-url.com'
        const univKeyName = univName.split(' ').join(delimiter)
        const payload = {
            [ username ]: {
                [ univKeyName ]: {
                    country,
                    name: univName,
                    alpha_two_code,
                    'state-province': '',
                    domains: [ domainsAndWebPages ],
                    web_pages: [ domainsAndWebPages ]
                }
            }
        }

        setDataToStorage(saveUnivStorage, payload)

        const [ saveUniversityByUser, dataFromStorage ] = getUniversityListByUser(saveUnivStorage, username)
        const university = (saveUniversityByUser as any)[ univKeyName ]

        expect(dataFromStorage).toStrictEqual(payload)
        expect(university.name).toBe(univName)
        expect(university.country).toBe(country)
        expect(university.domains.length).toBe(1)
        expect(university.web_pages.length).toBe(1)
        expect(university[ 'state-province' ]).toBe('')
        expect(university.alpha_two_code).toBe(alpha_two_code)
        expect(university.domains[0]).toBe(domainsAndWebPages)
        expect(university.web_pages[0]).toBe(domainsAndWebPages)
    })
})