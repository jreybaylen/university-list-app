import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback, Fragment, lazy } from 'react'

import { styles } from './index.style'
import { UniversityProps, APIResponseProps } from '@interface/api.interface'

import { Information, WebsiteLink } from '@components/index'

const Banner = lazy(() => import('@container/Banner'))

function University (): JSX.Element {
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

    useEffect(() => {
        handleGetSpecificUniversity()
    }, [handleGetSpecificUniversity ])

    const universityElement = (
        <Fragment>
            <Banner title={ university?.name || '' } />
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