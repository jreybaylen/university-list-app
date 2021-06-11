import { FormEvent } from 'react'
import { FormProps } from './index.interface'

function Form (props: FormProps): JSX.Element {
    const { onSubmit, children } = props
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (onSubmit) {
            onSubmit(event)
        }
    }
    const formElement = (
        <form onSubmit={ handleSubmit }>
            { children }
        </form>
    )

    return formElement
}

export {
    Form
}