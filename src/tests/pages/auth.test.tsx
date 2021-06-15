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
        const username = 'Username'
        const password = 'Password'
        const { container, getByPlaceholderText, getByText } = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        expect(container.querySelector('form')).toBeInTheDocument()
        expect(getByText(username)?.textContent).toStrictEqual(username)
        expect(getByPlaceholderText(username)).toBeInTheDocument()
        expect(getByText(password)?.textContent).toStrictEqual(password)
        expect(getByPlaceholderText(password)).toBeInTheDocument()
    })

    it('Should update the value of Username or Password once input has been updated', () => {
        const usernameLabel = 'Username'
        const passwordLabel = 'Password'
        const usernameValue = 'johndoe'
        const passwordValue = 'test12345'
        const { getByPlaceholderText } = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        fireEvent.change(getByPlaceholderText(usernameLabel), { target: { value: usernameValue } })
        fireEvent.change(getByPlaceholderText(passwordLabel), { target: { value: passwordValue } })
        expect((getByPlaceholderText(usernameLabel) as HTMLInputElement).value).toBe(usernameValue)
        expect((getByPlaceholderText(passwordLabel) as HTMLInputElement).value).toBe(passwordValue)
    })

    it('Should render Sign In label as heading and submit label', () => {
        const { container } = render(
            <Suspense fallback="">
                <Auth />
            </Suspense>
        )

        expect(container.querySelector('h1')?.textContent).toStrictEqual('Sign In')
        expect(container.querySelector('button[type="submit"]')?.textContent).toStrictEqual('Sign In')
    })
})