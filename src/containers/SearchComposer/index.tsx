import { useState, useEffect, useRef, ChangeEvent } from 'react'

import { styles } from './index.style'
import { SearchComposerProps } from './index.interface'

import { Input, Form, Picker, Button } from '@components/index'

function SearchComposer (props: SearchComposerProps): JSX.Element {
    const [ type, setType ] = useState<string>('')
    const [ search, setSearch ] = useState<string>('')
    const handleChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event

        setType(value)
    }
    const handleChangeWord = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event

        setSearch(value)
    }
    const handleSearchSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit({ search, type })
        }
    }
    const searchComposerInit = useRef(() => {
        const { keyType, keyWord } = props

        setSearch(keyWord)
        setType(keyType.toLocaleLowerCase())
    })

    useEffect(() => {
        searchComposerInit.current()
    }, [])

    const searchComposerElement = (
        <div style={ styles.container }>
            <Form onSubmit={ handleSearchSubmit }>
                <div style={ styles.searchForm }>
                    <Picker
                        value={ type }
                        onChange={ handleChangeType }
                        options={ [ 'Name', 'Country' ] }
                    />
                    <Input
                        value={ search }
                        placeholder="Search"
                        onChange={ handleChangeWord }
                        style={ styles.input }
                    />
                    <Button type="submit" children="Go" />
                </div>
            </Form>
        </div>
    )

    return searchComposerElement
}

export default SearchComposer