import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { lazy, useEffect, useState, useCallback, MouseEvent } from 'react'

import { styles } from './index.style'
import { APIResponseProps } from './index.interface'
import { UniversityProps } from '@interface/api.interface'

const University = lazy(() => import('@container/University'))

function Home (): JSX.Element {
    const history = useHistory()
    const [ universities, setUniversities ] = useState<Array<UniversityProps>>([])
    const handleGetUniversities = useCallback(async () => {
        try {
            const { data }: APIResponseProps = await axios.get('http://universities.hipolabs.com/search?name=middle')
            
            setUniversities(data.slice(0, 20))
        } catch (error: any) {
            console.error('Error Found: ', error)
        }
    }, [])
    const handleSelectUniversity = (event: MouseEvent<HTMLDivElement>) => {
        history.push('/university/1')
    }

    useEffect(() => {
        handleGetUniversities()
    }, [ handleGetUniversities ])

    const homeElement = (
        <div style={ styles.container }>
            { universities.map(
                (university: UniversityProps, index: number) => (
                    <University
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