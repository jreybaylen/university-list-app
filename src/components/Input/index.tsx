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
        <input
            { ...rest }
            onChange={ handleChange }
            style={ { ...styles.input, ...props.style } }
        />
    )

    return inputElement
}

export {
    Input
}