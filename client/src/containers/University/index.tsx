import { useEffect, useState } from 'react'

import { styles } from './index.style'
import { UniversityProps } from '@interface/api.interface'

import { Card } from '@components/Card'

function University (props: UniversityProps): JSX.Element {
    const [ name, setName ] = useState<string>('')
    const [ country, setCountry ] = useState<string>('')
    const [ websites, setWebsites ] = useState<Array<string>>([])

    useEffect(() => {
        const { name, country, ...rest } = props

        setName(name)
        setCountry(country)
        setWebsites(rest.web_pages)
    }, [ props ])
    
    const universityElement = (
        <Card>
            <p style={ styles.country }>{ country }</p>
            <h3 style={ styles.name }>{ name }</h3>
            <div style={ styles.websiteContainer }>
                { websites.map(
                    (website: string) => (
                        <a 
                            key={ website }
                            target="_blank"
                            rel="noreferrer"
                            href={ website }
                            style={ styles.website }
                        >
                            { website }
                        </a>
                    )
                ) }
            </div>
        </Card>
    )

    return universityElement
}

export default University