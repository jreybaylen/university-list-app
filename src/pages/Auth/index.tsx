import { styles } from './index.style'

import { Form, Input, Button } from '@components/index'

function Auth (): JSX.Element {
    const handleSubmit = () => {

    }
    const authElement = (
        <div style={ styles.container }>
            <Form onSubmit={ handleSubmit }>
                <h1 style={ styles.heading }>Sign In</h1>
                <div style={ styles.formGroup }>
                    <Input
                        type="text"
                        placeholder="Username"
                        style={ styles.input }
                    />
                </div>
                <div style={ styles.formGroup }>
                    <Input
                        type="password"
                        autoComplete="off"
                        placeholder="Password"
                        style={ styles.input }
                    />
                </div>
                <div style={ styles.formGroup }>
                    <Button
                        type="submit"
                        children="Sign In"
                        style={ styles.button }
                    />
                </div>
            </Form>
        </div>
    )

    return authElement
}

export default Auth