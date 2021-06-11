import { MouseEvent } from 'react'

interface CardProps {
    children: JSX.Element | Array<JSX.Element>
    onClick?(param: MouseEvent<HTMLDivElement>): void
}

export type {
    CardProps
}