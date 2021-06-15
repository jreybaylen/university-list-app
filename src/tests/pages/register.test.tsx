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
        const name = 'Name'
        const username = 'Username'
        const password = 'Password'
        const confirmPassword = 'Confirm Password'
        const { container, getByPlaceholderText, getByText } = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )

        expect(container.querySelector('form')).toBeInTheDocument()
        expect(getByText(name)?.textContent).toStrictEqual(name)
        expect(getByPlaceholderText(username)).toBeInTheDocument()
        expect(getByText(username)?.textContent).toStrictEqual(username)
        expect(getByPlaceholderText(username)).toBeInTheDocument()
        expect(getByText(password)?.textContent).toStrictEqual(password)
        expect(getByPlaceholderText(password)).toBeInTheDocument()
        expect(getByText(confirmPassword)?.textContent).toStrictEqual(confirmPassword)
        expect(getByPlaceholderText(confirmPassword)).toBeInTheDocument()
    })

    it('Should update the value of Name, Username, Password or Confirm Password once input has been updated', () => {
        const nameLabel = 'Name'
        const usernameLabel = 'Username'
        const passwordLabel = 'Password'
        const confirmPasswordLabel = 'Confirm Password'
        const nameValue = 'John Doe'
        const usernameValue = 'johndoe'
        const passwordValue = 'test12345'
        const confirmPasswordValue = 'test12345'
        const { getByPlaceholderText } = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )

        fireEvent.change(getByPlaceholderText(nameLabel), { target: { value: nameValue } })
        fireEvent.change(getByPlaceholderText(usernameLabel), { target: { value: usernameValue } })
        fireEvent.change(getByPlaceholderText(passwordLabel), { target: { value: passwordValue } })
        fireEvent.change(getByPlaceholderText(confirmPasswordLabel), { target: { value: confirmPasswordValue } })
        expect((getByPlaceholderText(nameLabel) as HTMLInputElement).value).toBe(nameValue)
        expect((getByPlaceholderText(usernameLabel) as HTMLInputElement).value).toBe(usernameValue)
        expect((getByPlaceholderText(passwordLabel) as HTMLInputElement).value).toBe(passwordValue)
        expect((getByPlaceholderText(confirmPasswordLabel) as HTMLInputElement).value).toBe(confirmPasswordValue)
    })

    it('Should render "Create your account" label as heading and "Register" as submit label', () => {
        const { container } = render(
            <Suspense fallback="">
                <MemoryRouter>
                    <Register />
                </MemoryRouter>
            </Suspense>
        )

        expect(container.querySelector('h1')?.textContent).toStrictEqual('Create your account')
        expect(container.querySelector('button[type="submit"]')?.textContent).toStrictEqual('Register')
    })
})