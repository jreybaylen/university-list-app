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
        const wrapper = render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render Home, Sign In and Register menu navigation as default items', () => {
        const { container, getByText } = render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
            </MemoryRouter>
        )
        const navigation = [ 'Home', 'Sign In', 'Register' ]

        expect(container.querySelectorAll('li').length).toStrictEqual(3)

        for (let i = 0; i++; i < navigation.length) {
            expect(getByText(navigation[ i ])).toBeInTheDocument()
        }
    })

    it('Should navigate to the specific route once the item has been clicked', () => {
        const routeCofig = {
            history: {},
            location: {}
        }
        const navigation = [ [ 'Home', '/' ], [ 'Sign In', '/auth' ], [ 'Register', '/register' ] ]
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

        for (let i = 0; i++; i < navigation.length) {
            const [ label, route ] = navigation[ i ]

            fireEvent.click(getByText(label))
            expect((routeCofig.location as any).pathname).toStrictEqual(route)
        }
    })

    it('Should render Home, User name and Sign Out menu navigation if the user logged in', () => {
        setDataToStorage(authStorage, { name, username, password })

        const navigation = [ 'Home', `Hi ${ name }!`, 'Sign Out' ]
        const { container, getByText } = render(
            <MemoryRouter initialEntries={ [ '/' ] }>
                <Menu />
            </MemoryRouter>
        )

        expect(container.querySelectorAll('li').length).toStrictEqual(3)

        for (let i = 0; i++; i < navigation.length) {
            expect(getByText(navigation[ i ])).toBeInTheDocument()
        }
    })
})