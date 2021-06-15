import { render, fireEvent } from '@testing-library/react'

import { Input } from '@components/Input'
import FormEditor from '@container/FormEditor'

const title = 'Test Form'
const formName = 'TestEditor'
const submitLabel = 'Test Button'

describe('<FormEditor /> Component', () => {
    it('Should render without crashing', () => {
        const handleSubmit = jest.fn()

        render(
            <FormEditor
                title={ title }
                children={ [] }
                name={ formName }
                onSubmit={ handleSubmit }
                submitLabel={ submitLabel }
            />
        )
    })

    it('Should render without Form, Heading, Children and Button component', () => {
        const handleSubmit = jest.fn()
        const placeholder = 'Test Input'
        const { container, getByPlaceholderText } = render(
            <FormEditor
                title={ title }
                name={ formName }
                onSubmit={ handleSubmit }
                submitLabel={ submitLabel }
            >
                <Input key="username" type="text" placeholder={ placeholder } />
                <Input key="password" type="password" placeholder="Password" />
            </FormEditor>
        )

        expect(container.querySelector('form')).toBeInTheDocument()
        expect(getByPlaceholderText(placeholder)).toBeInTheDocument()
        expect(container.querySelector('h1')?.textContent).toStrictEqual(title)
        expect(container.querySelector('button[type="submit"]')?.textContent).toStrictEqual(submitLabel)
    })

    it('Should trigger onSubmit once the form has been submitted', () => {
        const handleSubmit = jest.fn()
        const { container, getByText } = render(
            <FormEditor
                title={ title }
                name={ formName }
                children={ [] }
                onSubmit={ handleSubmit }
                submitLabel={ submitLabel }
            />
        )

        expect(handleSubmit).not.toHaveBeenCalled()
        expect(getByText(submitLabel)).toBeInTheDocument()
        expect(container.querySelector('form')).toBeInTheDocument()
        fireEvent.submit(getByText(submitLabel))
        expect(handleSubmit).toHaveBeenCalled()
    })
})