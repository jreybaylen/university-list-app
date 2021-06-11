import { lazy, useState, ChangeEvent, Fragment } from 'react'

import { styles } from './index.style'

import { Input } from '@components/index'

const FormEditor = lazy(() => import('@container/FormEditor'))

function Auth (): JSX.Element {
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const handleSubmit = () => {
        console.log(username, password)
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target as { value: string, name: 'username' | 'password' }
        
        switch (name) {
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
        }
    }
    const authElement = (
        <FormEditor
            title="Sign In"
            submitLabel="Sign In"
            onSubmit={ handleSubmit } 
        >
            <Fragment key="username">
                <label style={ styles.label }>Username</label>
                <Input
                    type="text"
                    name="username"
                    value={ username }
                    autoComplete="off"
                    placeholder="Username"
                    style={styles.input}
                    onChange={ handleInputChange }
                />
            </Fragment>
            <Fragment key="password">
                <label style={ styles.label }>Password</label>
                <Input
                    name="password"
                    type="password"
                    value={ password }
                    autoComplete="off"
                    placeholder="Password"
                    style={ styles.input }
                    onChange={ handleInputChange }
                />
            </Fragment>
        </FormEditor>
    )

    return authElement
}

export default Auth