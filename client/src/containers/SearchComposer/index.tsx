import { useState, ChangeEvent } from 'react'

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
        }
    }
    const searchComposerElement = (
        <Form onSubmit={ handleSearchSubmit }>
            <Input
                value={ search }
                placeholder="Search"
                onChange={ handleChangeSearch }
            />
        </Form>
    )

    return searchComposerElement
}

export default SearchComposer