import axios from 'axios'
import { lazy, useEffect, useState, useCallback, Fragment } from 'react'

import { APIResponseProps } from './index.interface'
import { UniversityProps } from '@interface/api.interface'

const University = lazy(() => import('@container/University'))

function Home (): JSX.Element {
    const [ universities, setUniversities ] = useState<Array<UniversityProps>>([])
    const handleGetUniversities = useCallback(async () => {
        try {
            const { data }: APIResponseProps = await axios.get('http://universities.hipolabs.com/search')
            
            setUniversities(data.slice(0, 20))
        } catch (error: any) {
            console.error('Error Found: ', error)
        }
    }, [])

    useEffect(() => {
        handleGetUniversities()
    }, [ handleGetUniversities ])

    const homeElement = (
        <Fragment>
            { universities.map(
                (university: UniversityProps, index: number) => (
                    <University
                        { ...university }
                        key={ `${ index } - ${ university.name.replaceAll(' ', '-').toLocaleLowerCase() }` }
                    />
                )
            ) }
        </Fragment>
    )

    return homeElement
}

export default Home