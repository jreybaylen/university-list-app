import { lazy } from 'react'

import { styles } from './index.style'

import { Input } from '@components/index'

const FormEditor = lazy(() => import('@container/FormEditor'))

function Auth (): JSX.Element {
    const handleSubmit = () => {

    }
    const authElement = (
        <FormEditor
            title="Sign In"
            submitLabel="Sign In"
            onSubmit={ handleSubmit } 
        >
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
        </FormEditor>
    )

    return authElement
}

export default Auth