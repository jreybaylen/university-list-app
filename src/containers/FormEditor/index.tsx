import { FormEvent } from 'react'

import { styles } from './index.style'
import { FormEditorProps } from './index.interface'

import { Form, Button } from '@components/index'

function FormEditor (props: FormEditorProps): JSX.Element {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (props.onSubmit) {
            props.onSubmit(event)
        }
    }
    const authElement = (
        <div style={ styles.container }>
            <Form name={ props.name } onSubmit={ handleSubmit }>
                <h1 style={ styles.heading }>
                    { props.title }
                </h1>
                { props.children.map(
                    (children: JSX.Element) => (
                        <div key={ children.key } style={ styles.formGroup }>
                            { children }
                        </div>
                    )
                ) }
                <div style={ styles.formGroup }>
                    <Button
                        type="submit"
                        style={ styles.button }
                        children={ props.submitLabel }
                    />
                </div>
            </Form>
        </div>
    )

    return authElement
}

export default FormEditor