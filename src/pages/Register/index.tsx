import { lazy } from 'react'

import { styles } from './index.style'

import { Input } from '@components/index'

const FormEditor = lazy(() => import('@container/FormEditor'))

function Register (): JSX.Element {
    const handleSubmit = () => {

    }
    const registerElement = (
        <FormEditor
            submitLabel="Register"
            onSubmit={ handleSubmit } 
            title="Create your account"
        >
            <Input
                key="name"
                type="text"
                placeholder="Name"
                style={ styles.input }
            />
            <Input
                type="text"
                key="username"
                placeholder="Username"
                style={ styles.input }
            />
            <Input
                key="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
                style={ styles.input }
            />
            <Input
                type="password"
                autoComplete="off"
                style={ styles.input }
                key="confirm-password"
                placeholder="Confirm Password"
            />
        </FormEditor>
    )

    return registerElement
}

export default Register