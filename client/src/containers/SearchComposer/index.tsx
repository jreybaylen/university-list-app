import { useState, ChangeEvent } from 'react'

import { styles } from './index.style'
import { SearchComposerProps } from './index.interface'

import { Input, Form } from '@components/index'

function SearchComposer (props: SearchComposerProps): JSX.Element {
    const [ search, setSearch ] = useState<string>('')
    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const handleSearchSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit(search)
            setSearch('')
        }
    }
    const searchComposerElement = (
        <div style={ styles.container }>
            <Form onSubmit={ handleSearchSubmit }>
                <Input
                    value={ search }
                    placeholder="Search"
                    onChange={ handleChangeSearch }
                />
            </Form>
        </div>
    )

    return searchComposerElement
}

export default SearchComposer