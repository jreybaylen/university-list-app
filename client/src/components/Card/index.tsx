import { MouseEvent } from 'react'

import { styles } from './index.style'
import { CardProps } from './index.interface'

function Card <T>(props: T & CardProps): JSX.Element {
    const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
        if (props.onClick) {
            props.onClick(event)
        }
    }
    const cardElement = (
        <div style={ styles.card } onClick={ handleCardClick }>
            { props.children }
        </div>
    )

    return cardElement
}

export {
    Card
}