import { FormEvent } from 'react'

interface FormProps {
    onSubmit(param?: FormEvent<HTMLFormElement>): void
    children: JSX.Element | Array<JSX.Element>
}

export type {
    FormProps
}