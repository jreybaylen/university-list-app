import { useState, useRef, useEffect, useCallback, MouseEvent, CSSProperties } from 'react'

import { styles } from './index.style'
import { CardProps } from './index.interface'

function Card <T>(props: T & CardProps): JSX.Element {
    const [ style, setStyle ] = useState<CSSProperties>({})
    const [ active, setActive ] = useState<boolean>(false)
    const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
        if (props.onClick) {
            props.onClick(event)
        }
    }
    const handleToggleActiveState = useRef(() => {
        setActive((prevState: boolean) => !prevState)
    })
    const handleMouseOver = () => {
        handleToggleActiveState.current()
    }
    const cardInit = useCallback(() => {
        const modifiedStyles = {
            ...styles.card,
            cursor: props.onClick ? 'pointer' : 'default',
            boxShadow: active ? 'rgb(0 0 0 / 20%) 0px 4px 8px 0px' : 'none'
        }

        setStyle(modifiedStyles)
    }, [ active, props.onClick ])

    useEffect(() => {
        cardInit()
    }, [ cardInit ])

    const cardElement = (
        <div
            style={ style }
            onClick={ handleCardClick }
            onMouseEnter={ handleMouseOver }
            onMouseLeave={ handleMouseOver }
        >
            { props.children }
        </div>
    )

    return cardElement
}

export {
    Card
}