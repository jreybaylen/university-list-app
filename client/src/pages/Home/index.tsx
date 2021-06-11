import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { lazy, useEffect, useState, useCallback } from 'react'

import { styles } from './index.style'
import { UniversityProps, APIResponseProps } from '@interface/api.interface'

const SearchComposer = lazy(() => import('@container/SearchComposer'))
const UniversityItem = lazy(() => import('@container/UniversityItem'))

function Home (): JSX.Element {
    const history = useHistory()
    const [ keyWord, setKeyWord ] = useState<string>('philippines')
    const [ universities, setUniversities ] = useState<Array<UniversityProps>>([])
    const handleGetUniversities = useCallback(async () => {
        try {
            const { data }: APIResponseProps = await axios.get(`/search?country=${ keyWord }`)
            
            setUniversities(data)
        } catch (error: any) {
            console.error('Error Found: ', error)
        }
    }, [ keyWord ])
    const handleSelectUniversity = (name: string) => {
        history.push(`/university/${ encodeURIComponent(name) }`)
    }
    const handleUpdateKeyWord = (searchKeyWord: string) => {
        setUniversities([])
        setKeyWord(searchKeyWord)
    }

    useEffect(() => {
        handleGetUniversities()
    }, [ handleGetUniversities ])

    const homeElement = (
        <div style={ styles.container }>
            <SearchComposer onSubmit={ handleUpdateKeyWord } />
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