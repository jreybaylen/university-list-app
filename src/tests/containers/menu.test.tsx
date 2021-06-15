import { MemoryRouter , Route } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'

import { setDataToStorage } from '@util/index'
import { environment } from '@config/environment'
import { StorageKeyProps } from '@util/index.interface'

import Menu from '@container/Menu'

const name = 'John Doe'
const username = 'johndoe'
const password = 'test12345'
const { authStorage } = environment as { [key: string]: StorageKeyProps }

describe('<Menu /> Component', () => {
    it('Should render without crashing', () => {
        render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
            </MemoryRouter>
        )
    })

    it('Should render Home, Sign In and Register menu navigation as default items', () => {
        const { container, getByText } = render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
            </MemoryRouter>
        )

        expect(container.querySelectorAll('li').length).toStrictEqual(3)
        expect(getByText(/home/i)).toBeInTheDocument()
        expect(getByText(/sign in/i)).toBeInTheDocument()
        expect(getByText(/register/i)).toBeInTheDocument()
    })

    it('Should navigate to the specific route once the item has been clicked', () => {
        const routeCofig = {
            history: {},
            location: {}
        }
        const { getByText } = render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
                <Route
                    path="*"
                    render={({ history, location }) => {
                        routeCofig.history = history
                        routeCofig.location = location

                        return <div />
                    }}
                />
            </MemoryRouter>
        )

        fireEvent.click(getByText(/home/i))
        expect((routeCofig.location as any).pathname).toStrictEqual('/')
        fireEvent.click(getByText(/sign in/i))
        expect((routeCofig.location as any).pathname).toStrictEqual('/auth')
        fireEvent.click(getByText(/register/i))
        expect((routeCofig.location as any).pathname).toStrictEqual('/register')
    })

    it('Should render Home, User name and Sign Out menu navigation if the user logged in', () => {
        setDataToStorage(authStorage, { name, username, password })

        const { container, getByText } = render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
            </MemoryRouter>
        )

        expect(container.querySelectorAll('li').length).toStrictEqual(3)
        expect(getByText(/home/i)).toBeInTheDocument()
        expect(getByText(/sign out/i)).toBeInTheDocument()
        expect(getByText(`Hi ${ name }!`)).toBeInTheDocument()
    })
})