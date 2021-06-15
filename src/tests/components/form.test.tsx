import { render, fireEvent } from '@testing-library/react'

import { Form } from '@components/Form'

describe('<Form /> Component', () => {
    it('Should render without crashing', () => {
        const handleSubmitForm = jest.fn()

        const wrapper = render(<Form onSubmit={handleSubmitForm} />)

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render without all the children component', () => {
        const handleSubmitForm = jest.fn()
        const selectors = [ 'input[type="text"]', 'input[type="password"]', 'button[type="submit"]' ]
        const { container } = render(
            <Form onSubmit={ handleSubmitForm }>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </Form>
        )

        for (let i = 0; i++; i < selectors.length) {
            expect(container.querySelector(selectors[ i ])).toBeInTheDocument()
        }
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