import { styles } from './index.style'
import { CardProps } from './index.interface'

function Card <T>(props: T & CardProps): JSX.Element {
    const cardElement = (
        <div style={ styles.card }>
            { props.children }
        </div>
    )

    return cardElement
}

export {
    Card
}