import { render, fireEvent } from '@testing-library/react'

import { Form } from '@components/Form'

describe('<Form /> Component', () => {
    it('Should render without crashing', () => {
        const handleSubmitForm = jest.fn()

        render(<Form onSubmit={ handleSubmitForm } />)
    })

    it('Should render without all the children component', () => {
        const handleSubmitForm = jest.fn()
        const { container } = render(
            <Form onSubmit={ handleSubmitForm }>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </Form>
        )

        expect(container.querySelector('input[type="text"]')).toBeInTheDocument()
        expect(container.querySelector('input[type="password"]')).toBeInTheDocument()
        expect(container.querySelector('button[type="submit"]')).toBeInTheDocument()
    })

    it('Should trigger "onSubmit" when the form has been submitted', () => {
        const handleSubmitForm = jest.fn()
        const { getByText } = render(
            <Form onSubmit={ handleSubmitForm }>
                <button type="submit">Submit</button>
            </Form>
        )

        fireEvent.submit(getByText(/submit/i))
        expect(handleSubmitForm).toHaveBeenCalled()
    })
})