import { ButtonHTMLAttributes } from 'react'

import { styles } from './index.style'

function Button (props: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
    const buttonElement = (
        <button style={ styles.button }>
            { props.children }
        </button>
    )

    return buttonElement
}

export {
    Button
}