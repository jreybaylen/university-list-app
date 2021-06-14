import { lazy, useEffect, useState, useCallback, Fragment } from 'react'

import { styles } from './index.style'
import { getAuthUserFromStorage } from '@util/index'
import { StorageKeyProps } from '@util/index.interface'
import { UniversityProps } from '@interface/api.interface'
import { ProfileProps } from '@interface/profile.interface'

import { Loader, Button } from '@components/index'

const Banner = lazy(() => import('@container/Banner'))
const UniversityItem = lazy(() => import('@container/UniversityItem'))

function Profile (): JSX.Element {
    const profile = getAuthUserFromStorage()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ universities, setUniversities ] = useState<Array<UniversityProps>>([])
    const handleGetListOfUniv = useCallback(async () => {
        setLoading(true)

        const { environment } = await import('@config/environment')
        const { getUniversityListByUser } = await import('@util/index')
        const { saveUnivStorage } = environment as { saveUnivStorage: StorageKeyProps }
        const [ saveUniversityByUser ] = getUniversityListByUser(saveUnivStorage, profile.username)
        const univNameItems = Object.keys(saveUniversityByUser) as Array<string>
        const profileUnivList: Array<UniversityProps> = univNameItems.map(
            (univName: string) => (saveUniversityByUser as any)[ univName ]
        )
        
        setUniversities(profileUnivList)
        setLoading(false)
    }, [ profile.username ])
    const handleRemoveUniversity = async (univName: string) => {
        const { environment } = await import('@config/environment')
        const { setDataToStorage, getUniversityListByUser, getAuthUserFromStorage } = await import('@util/index')
        const { saveUnivStorage, delimiter } = environment as { saveUnivStorage: StorageKeyProps, delimiter: string }
        const { username } = getAuthUserFromStorage() as ProfileProps
        const [ saveUniversityByUser, univListFromStorageByUser ] = getUniversityListByUser(saveUnivStorage, username)
        const univKeyToStore = univName.replaceAll(' ', delimiter)
        const newSetOfUnivList = {
            ...univListFromStorageByUser,
            [ username ]: Boolean(univName) ? {
                ...saveUniversityByUser,
                [ univKeyToStore ]: undefined
            } : {}
        }

        handleGetListOfUniv()
        setDataToStorage(saveUnivStorage, newSetOfUnivList)
    }
    const clearSaveUniversities = () => {
        handleRemoveUniversity('')
    }

    useEffect(() => {
        handleGetListOfUniv()
    }, [ handleGetListOfUniv ])

    const profileElement = (
        <Fragment>
            <Banner title={ profile.name } />
            <Loader show={ loading } />
            <div style={ styles.container }>
                { Boolean(universities.length) && (
                    <div style={ styles.buttonContainer }>
                        <Button
                            children="Remove All"
                            style={ styles.button }
                            onClick={ clearSaveUniversities }
                        />
                    </div>
                ) }
                { universities.map(
                    (university: UniversityProps, index: number) => (
                        <UniversityItem
                            { ...university }
                            onSelect={ handleRemoveUniversity }
                            key={ `${ index } - ${ university.name.replaceAll(' ', '-').toLocaleLowerCase() }` }
                        />
                    )
                ) }
                { !Boolean(universities.length) && (
                    <p style={ styles.noResult }>No university found as of the moment</p>
                ) }
            </div>
        </Fragment>
    )

    return profileElement
}

export default Profile