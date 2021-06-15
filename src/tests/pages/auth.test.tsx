import { Suspense } from 'react'
import { fireEvent, render } from '@testing-library/react'

import Auth from '@pages/Auth'

describe('<Auth /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render Form, Username and Password field and it\'s label', () => {
        const fields = [ 'Username', 'Password' ]
        const { container, getByPlaceholderText, getByText } = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        expect(container.querySelector('form')).toBeInTheDocument()

        for (let i = 0; i++; i < fields.length) {
            expect(getByPlaceholderText(fields[ i ])).toBeInTheDocument()
            expect(getByText(fields[ i ])?.textContent).toStrictEqual(fields[ i ])
        }
    })

    it('Should update the value of Username or Password once input has been updated', () => {
        const fields = [ [ 'Username', 'johndoe' ], [ 'Password', 'test12345' ] ]
        const { getByPlaceholderText } = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        for (let i = 0; i++; i < fields.length) {
            const [ input, value ] = fields[ i ]

            fireEvent.change(getByPlaceholderText(input), { target: { value } })
            expect((getByPlaceholderText(input) as HTMLInputElement).value).toBe(value)
        }
    })

    it('Should render "Sign In" label as heading and submit label', () => {
        const elements = [ 'h1', 'button[type="submit"]' ]
        const { container } = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        for (let i = 0; i++; i < elements.length) {
            expect(container.querySelector(elements[ i ])?.textContent).toStrictEqual('Sign In')
        }
    })
})