import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { lazy, useEffect, useState, useCallback, Fragment } from 'react'

import { styles } from './index.style'
import { HomeFormProps } from './index.interface'
import { UniversityProps, APIResponseProps } from '@interface/api.interface'

import { Loader } from '@components/Loader'

const SearchComposer = lazy(() => import('@container/SearchComposer'))
const UniversityItem = lazy(() => import('@container/UniversityItem'))

function Home (): JSX.Element {
    const history = useHistory()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ keyType, setKeyType ] = useState<string>('country')
    const [ keyWord, setKeyWord ] = useState<string>('philippines')
    const [ universities, setUniversities ] = useState<Array<UniversityProps>>([])
    const handleGetUniversities = useCallback(async () => {
        setLoading(true)

        try {
            const { data }: APIResponseProps = await axios.get(`/search?${ keyType }=${ keyWord }`)
            
            setUniversities(data)
        } catch (error: any) {
            console.error('Error Found: ', error)
        } finally {
            setLoading(false)
        }
    }, [ keyType, keyWord ])
    const handleSelectUniversity = (name: string) => {
        history.push(`/university/${ encodeURIComponent(name) }`)
    }
    const handleUpdateKeyWord = (options: HomeFormProps) => {
        const { search, type } = options

        if ((search !== keyWord) || (type !== keyType)) {
            setUniversities([])
            setKeyType(type)
            setKeyWord(search)
        }
    }

    useEffect(() => {
        handleGetUniversities()
    }, [ handleGetUniversities ])

    const homeElement = (
        <Fragment>
            <div style={ styles.searchBar }>
                <div style={ styles.searchContainer }>
                    <SearchComposer
                        keyType={ keyType }
                        keyWord={ keyWord }
                        onSubmit={ handleUpdateKeyWord }
                    />
                </div>
            </div>
            <div style={ styles.container }>
                <Loader show={ loading } />
                { !loading && universities.map(
                    (university: UniversityProps, index: number) => (
                        <UniversityItem
                            { ...university }
                            onSelect={ handleSelectUniversity }
                            key={ `${ index } - ${ university.name.replaceAll(' ', '-').toLocaleLowerCase() }` }
                        />
                    )
                ) }
            </div>
        </Fragment>
    )

    return homeElement
}

export default Home