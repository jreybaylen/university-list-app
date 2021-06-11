import { FormEvent } from 'react'

interface FormEditorProps {
    title: string
    submitLabel: string
    children: Array<JSX.Element>
    onSubmit(param: FormEvent<HTMLFormElement>): void
}

export type {
    FormEditorProps
}