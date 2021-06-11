import { lazy, useEffect, useState, MouseEvent } from 'react'

import { styles } from './index.style'
import { ModifiedUniversityProps } from './index.interface'

import { Card } from '@components/Card'

const WebsiteLink = lazy(() => import('@container/WebsiteLink'))

function University (props: ModifiedUniversityProps): JSX.Element {
    const [ name, setName ] = useState<string>('')
    const [ country, setCountry ] = useState<string>('')
    const [ websites, setWebsites ] = useState<Array<string>>([])
    const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
        if (props.onSelect) {
            props.onSelect(event)
        }
    }
    const handleOpenWebsite = (website: string) => {
        window.open(website, '_blank')
    }

    useEffect(() => {
        const { name, country, ...rest } = props

        setName(name)
        setCountry(country)
        setWebsites(rest.web_pages)
    }, [ props ])
    
    const universityElement = (
        <Card onClick={ handleCardClick }>
            <p style={ styles.country }>{ country }</p>
            <h3 style={ styles.name }>{ name }</h3>
            <div style={ styles.websiteContainer }>
                { websites.map(
                    (website: string) => (
                        <WebsiteLink
                            key={ website }
                            website={ website }
                            onSelect={ handleOpenWebsite }
                        />
                    )
                ) }
            </div>
        </Card>
    )

    return universityElement
}

export default University