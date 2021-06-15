import { Suspense } from 'react'
import { MemoryRouter , Route } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'

import Banner from '@container/Banner'
import University from '@pages/University'

describe('<Banner /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(<Banner title="" />)

        expect(wrapper).toMatchSnapshot()
    })

    it('Should display title content', () => {
        const title = "John Doe"
        const { container, getByText } = render(<Banner title={ title } />)

        expect(getByText(title)).toBeInTheDocument()
        expect(container.querySelector('h1')).toBeInTheDocument()
    })

    it('Should render back button', () => {
        const title = "John Doe"
        const { container, getByText } = render(<Banner title={ title } />)

        expect(getByText(title)).toBeInTheDocument()
        expect(container.querySelector('button')).toBeInTheDocument()
    })

    it('Should trigger redirect to home page when back button has been clicked', async () => {
        const routeCofig = {
            history: {},
            location: {}
        }
        const defaultURL = '/university/Test$@Academy'
        const { getByText } = render(
            <Suspense fallback="">
                <MemoryRouter initialEntries={ [ defaultURL ] }>
                    <Route path="/university/:name" component={ University } />
                    <Route
                        path="*"
                        render={({ history, location }) => {
                            routeCofig.history = history
                            routeCofig.location = location

                            return <div />
                        }}
                    />
                </MemoryRouter>
            </Suspense>
        )

        expect((routeCofig.location as { pathname: string }).pathname).toStrictEqual(defaultURL)
        await waitFor(() => {
            expect(getByText(/back/i)).toBeInTheDocument()
            fireEvent.click(getByText(/back/i))
            expect((routeCofig.location as { pathname: string }).pathname).toStrictEqual('/')
        })
    })
})