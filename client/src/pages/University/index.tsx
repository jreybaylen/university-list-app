import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'

import { UniversityProps, APIResponseProps } from '@interface/api.interface'

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

    useEffect(() => {
        handleGetSpecificUniversity()
    }, [handleGetSpecificUniversity ])

    const universityElement = (
        <pre>
            { JSON.stringify(university, null, 4) }
        </pre>
    )

    return universityElement
}

export default University