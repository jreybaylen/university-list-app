import { useState, useEffect, useRef, ChangeEvent } from 'react'

import { styles } from './index.style'
import { FormProps, SearchComposerProps } from './index.interface'

import { Input, Form, Picker, Button } from '@components/index'

function SearchComposer (props: SearchComposerProps): JSX.Element {
    const [ type, setType ] = useState<string>('')
    const [ search, setSearch ] = useState<string>('')
    const handleChangeEvent = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { value, name } = event.target as FormProps<'type' | 'word'>

        switch (name) {
            case 'type':
                setType(value)
                break
            case 'word':
                setSearch(value)
                break
        }
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
                        name="type"
                        value={ type }
                        onChange={ handleChangeEvent }
                        options={ [ 'Name', 'Country' ] }
                    />
                    <Input
                        name="word"
                        value={ search }
                        placeholder="Search"
                        style={ styles.input }
                        onChange={ handleChangeEvent }
                    />
                    <Button type="submit" children="Go" />
                </div>
            </Form>
        </div>
    )

    return searchComposerElement
}

export default SearchComposer