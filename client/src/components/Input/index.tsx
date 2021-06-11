import { ChangeEvent, InputHTMLAttributes } from 'react'

import { styles } from './index.style'

function Input (props: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    const { onChange, ...rest } = props
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(event)
        }
    }
    const inputElement = (
        <input style={ styles.input } onChange={ handleChange } { ...rest } />
    )

    return inputElement
}

export {
    Input
}