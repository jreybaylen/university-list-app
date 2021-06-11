import { lazy, useState, ChangeEvent, Fragment } from 'react'

import { styles } from './index.style'

import { Input } from '@components/index'

const FormEditor = lazy(() => import('@container/FormEditor'))

function Register (): JSX.Element {
    const [ name, setname ] = useState<string>('')
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ confirmPassword, setConfirmPassword ] = useState<string>('')
    const handleSubmit = () => {
        console.log(name, username, password, confirmPassword)
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target as { value: string, name: 'name' | 'username' | 'password' | 'confirm-password' }

        switch (name) {
            case 'name':
                setname(value)
                break
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            case 'confirm-password':
                setConfirmPassword(value)
                break
        }
    }
    const registerElement = (
        <FormEditor
            submitLabel="Register"
            onSubmit={ handleSubmit } 
            title="Create your account"
        >
            <Fragment key="name">
                <label style={ styles.label }>Name</label>
                <Input
                    name="name"
                    type="text"
                    autoComplete="off"
                    placeholder="Name"
                    style={ styles.input }
                    onChange={ handleInputChange }
                />
            </Fragment>
            <Fragment key="username">
                <label style={ styles.label }>Username</label>
                <Input
                    type="text"
                    name="username"
                    autoComplete="off"
                    placeholder="Username"
                    style={ styles.input }
                    onChange={ handleInputChange }
                />
            </Fragment>
            <Fragment key="password">
                <label style={ styles.label }>Password</label>
                <Input
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Password"
                    style={ styles.input }
                    onChange={ handleInputChange }
                />
            </Fragment>
            <Fragment key="confirm-password">
                <label style={ styles.label }>Confirm Password</label>
                <Input
                    type="password"
                    autoComplete="off"
                    style={ styles.input }
                    name="confirm-password"
                    placeholder="Confirm Password"
                    onChange={ handleInputChange }
                />
            </Fragment>
        </FormEditor>
    )

    return registerElement
}

export default Register