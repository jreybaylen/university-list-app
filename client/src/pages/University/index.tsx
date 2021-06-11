import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import { lazy, useEffect, useState, useCallback, Fragment } from 'react'

import { styles } from './index.style'
import { UniversityProps, APIResponseProps } from '@interface/api.interface'

import { Information } from '@components/Information'

const WebsiteLink = lazy(() => import('@container/WebsiteLink'))

function University (): JSX.Element {
    const history = useHistory()
    const { name } = useParams<{ name: string }>()
    const [ university, setUniversity ] = useState<UniversityProps>()
    const handleGetSpecificUniversity = useCallback(async () => {
        try {
            const { data }: APIResponseProps = await axios.get(`/search?name=${ name }`)
            const [ universityInfo ] = data

            setUniversity(universityInfo)
        } catch (error: any) {
            console.error('Error Found: ', error)
        }
    }, [ name ])
    const handleOpenWebsite = (website: string) => {
        window.open(website, '_blank')
    }
    const handleBack = () => {
        history.replace('/')
    }

    useEffect(() => {
        handleGetSpecificUniversity()
    }, [handleGetSpecificUniversity ])

    const universityElement = (
        <Fragment>
            <button style={ styles.back } onClick={ handleBack }>
                Back
            </button>
            <div style={ styles.container }>
                <div style={ styles.content }>
                    <h1 style={ styles.heading }>{ university?.name }</h1>
                </div>
            </div>
            <div style={ styles.information }>
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