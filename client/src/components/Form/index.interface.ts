import { FormEvent, FormHTMLAttributes } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    onSubmit(param?: FormEvent<HTMLFormElement>): void
}

export type {
    FormProps
}