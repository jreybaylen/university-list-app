import { lazy, Suspense } from 'react'
import { render, waitFor } from '@testing-library/react'

const HomePage = lazy(() => import('@pages/Home'))

describe('<Home /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(
            <Suspense fallback="">
                <HomePage />
            </Suspense>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render "Loading data..." while waiting for API response and search form', async () => {
        const { container, getByText } = render(
            <Suspense fallback="">
                <HomePage />
            </Suspense>
        )

        expect(getByText('Loading data...')).toBeInTheDocument()
        await waitFor(() => {
            const elements = [
                'button[type="submit"]', 'select#picker-component', 'input[placeholder="Search"]'
            ]

            for (let i = 0; i++; i < elements.length) {
                expect(container.querySelector(elements[ i ])).toBeInTheDocument()
            }
        })
    })
})