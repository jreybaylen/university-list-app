import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { lazy, useEffect, useState, useCallback } from 'react'

import { styles } from './index.style'
import { UniversityProps, APIResponseProps } from '@interface/api.interface'

const UniversityItem = lazy(() => import('@container/UniversityItem'))

function Home (): JSX.Element {
    const history = useHistory()
    const [ universities, setUniversities ] = useState<Array<UniversityProps>>([])
    const handleGetUniversities = useCallback(async () => {
        try {
            const { data }: APIResponseProps = await axios.get('/search?country=philippines')
            
            setUniversities(data)
        } catch (error: any) {
            console.error('Error Found: ', error)
        }
    }, [])
    const handleSelectUniversity = (name: string) => {
        history.push(`/university/${ encodeURIComponent(name) }`)
    }

    useEffect(() => {
        handleGetUniversities()
    }, [ handleGetUniversities ])

    const homeElement = (
        <div style={ styles.container }>
            { universities.map(
                (university: UniversityProps, index: number) => (
                    <UniversityItem
                        { ...university }
                        onSelect={ handleSelectUniversity }
                        key={ `${ index } - ${ university.name.replaceAll(' ', '-').toLocaleLowerCase() }` }
                    />
                )
            ) }
        </div>
    )

    return homeElement
}

export default Home