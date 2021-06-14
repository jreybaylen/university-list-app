import { ButtonHTMLAttributes } from 'react'

import { styles } from './index.style'

function Button (props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
    const { children, style, ...rest } = props
    const buttonElement = (
        <button style={ { ...styles.button, ...style } } { ...rest }>
            { children }
        </button>
    )

    return buttonElement
}

export {
    Button
}