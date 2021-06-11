import { useHistory } from 'react-router-dom'
import { lazy, useState, FormEvent, ChangeEvent, Fragment } from 'react'

import { styles } from './index.style'
import { FormProps } from '@interface/form.interface'
import { ProfileProps } from '@interface/profile.interface'

import { Input } from '@components/index'

const FormEditor = lazy(() => import('@container/FormEditor'))

function Auth (): JSX.Element {
    const history = useHistory()
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const existingUsers = localStorage.getItem('univ-app-user') || ''

        if ([ username, password ].includes('')) {
            console.error('Auth failed. Kindly check your username / password and try again.')

            return
        }

        if (!existingUsers) {
            console.error('Register first an account and sign in again.')

            return
        }

        const availableUsers: Array<ProfileProps> = existingUsers ? JSON.parse(existingUsers) : []
        const account = availableUsers.find((user: ProfileProps) => (
            (user.username === username) && (user.password === password)
        ))

        if (Boolean(account)) {
            localStorage.setItem('univ-app-user-auth', JSON.stringify(account))
            history.replace('/')
        }
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target as FormProps<'username' | 'password'>
        
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
            name="auth"
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