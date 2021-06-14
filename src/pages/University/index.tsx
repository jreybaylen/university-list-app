import axios from 'axios'
import { useParams } from 'react-router-dom'
import { lazy, useEffect, useState, useCallback, Fragment } from 'react'

import { styles } from './index.style'
import { StorageKeyProps } from '@util/index.interface'
import { ProfileProps } from '@interface/profile.interface'
import { UniversityProps, APIResponseProps } from '@interface/api.interface'

import { Information, Button, WebsiteLink } from '@components/index'

const Banner = lazy(() => import('@container/Banner'))

function University (): JSX.Element {
    const { name } = useParams<{ name: string }>()
    const [ buttonLabel, setButtonLabel ] = useState<string>('Add')
    const [ universityKey, setUniversityKey ] = useState<string>('')
    const [ university, setUniversity ] = useState<UniversityProps>()
    const handleGetListofUniv = useCallback(async (init?: boolean, univKeyToStore?: string) => {
        const { environment } = await import('@config/environment')
        const { saveUnivStorage } = environment as { saveUnivStorage: StorageKeyProps }
        const { setDataToStorage, getUniversityListByUser, getAuthUserFromStorage } = await import('@util/index')
        const { username } = getAuthUserFromStorage() as ProfileProps
        const [ saveUniversityByUser, univListFromStorageByUser ] = getUniversityListByUser(saveUnivStorage, username)

        if (init && univKeyToStore) {
            if (Boolean((saveUniversityByUser as any)[ univKeyToStore ])) {
                setButtonLabel('Remove')
            }

            return
        }

        const newSetOfUnivList = {
            ...univListFromStorageByUser,
            [ username ]: {
                ...saveUniversityByUser,
                [ universityKey ]: (buttonLabel === 'Add') ? university : undefined
            }
        }

        setDataToStorage(saveUnivStorage, newSetOfUnivList)

        return
    }, [ universityKey, buttonLabel, university ])
    const handleGetSpecificUniversity = useCallback(async () => {
        try {
            const { environment } = await import('@config/environment')
            const { data }: APIResponseProps = await axios.get(`/search?name=${ name }`)
            const [ { name: univName, ...rest } ] = data
            const univKeyToStore = univName.replaceAll(' ', environment.delimiter)

            setUniversity({ name: univName, ...rest })
            setUniversityKey(univKeyToStore)
            handleGetListofUniv(true, univKeyToStore)
        } catch (error: any) {
            console.error('Error Found: ', error)
        }
    }, [ name, handleGetListofUniv ])
    const handleOpenWebsite = (website: string) => {
        window.open(website, '_blank')
    }
    const handleToggleUniversityFromStorage = () => {
        handleGetListofUniv(false, '')
        setButtonLabel((prevState: string) => (prevState === 'Add') ? 'Remove' : 'Add')
    }

    useEffect(() => {
        handleGetSpecificUniversity()
    }, [handleGetSpecificUniversity ])

    const buttonStyle = {
        ...styles.button,
        background: `#${ (buttonLabel === 'Add') ? '1a73e8' : 'f44336' }`
    }
    const universityElement = (
        <Fragment>
            <Banner title={ university?.name || '' } />
            <div style={ styles.information }>
                <div style={ styles.save }>
                    <Button style={ buttonStyle } onClick={ handleToggleUniversityFromStorage }>
                        { buttonLabel } University
                    </Button>
                </div>
                <Information
                    title="University"
                    content={ `${ university?.name }, ${ university?.alpha_two_code }` || '' }
                />
                <Information
                    title="Country"
                    content={ university?.country || '' }
                />
                <Information title="Website(s)">
                    { university?.web_pages.map(
                        (website: string) => (
                            <WebsiteLink
                                key={ website }
                                website={ website }
                                onSelect={ handleOpenWebsite }
                            />
                        )
                    ) }
                </Information>
                <Information title="Domain(s)">
                    { university?.domains.map(
                        (domain: string) => (
                            <p key={ domain }>{ domain }</p>
                        )
                    ) }
                </Information>
            </div>
        </Fragment>
    )

    return universityElement
}

export default University