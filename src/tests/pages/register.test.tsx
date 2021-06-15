import { Suspense } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render } from '@testing-library/react'

import Register from '@pages/Register'

describe('<Register /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render Form, Name, Username, Password and Confirm Password field and it\'s label', () => {
        const fields = [ 'Name', 'Username', 'Password', 'Confirm Password' ]
        const { container, getByPlaceholderText, getByText } = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )

        expect(container.querySelector('form')).toBeInTheDocument()

        for (let i = 0; i++; i < fields.length) {
            expect(getByText(fields[ i ])?.textContent).toStrictEqual(fields[ i ])
            expect(getByPlaceholderText(fields[ i ])).toBeInTheDocument()
        }
    })

    it('Should update the value of Name, Username, Password or Confirm Password once input has been updated', () => {
        const fields = [
            [ 'Name', 'John Doe' ],
            [ 'Username', 'johndoe' ],
            [ 'Password', 'test12345' ],
            [ 'Confirm Password', 'test12345' ]
        ]
        const { getByPlaceholderText } = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )

        for (let i = 0; i++; i < fields.length) {
            const [ input, value ] = fields[ i ]

            fireEvent.change(getByPlaceholderText(input), { target: { value } })
            expect((getByPlaceholderText(input) as HTMLInputElement).value).toBe(value)
        }
    })

    it('Should render "Create your account" label as heading and "Register" as submit label', () => {
        const { container } = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )
        const elementsWithValue = [
            [ 'h1', 'Create your account' ],
            [ 'button[type="submit"]', 'Register']
        ]
        
        for (let i = 0; i++; i < elementsWithValue.length) {
            const [ element, value ] = elementsWithValue[ i ]

            expect(container.querySelector(element)?.textContent).toStrictEqual(value)
        }
    })
})