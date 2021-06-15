import { lazy, Suspense } from 'react'
import { render, waitFor } from '@testing-library/react'

const HomePage = lazy(() => import('@pages/Home'))

describe('<Home /> Component', () => {
    it('Should render without crashing', () => {
        render(
            <Suspense fallback="">
                <HomePage />
            </Suspense>
        )
    })

    it('Should render "Loading data..." while waiting for API response and search form', async () => {
        const { container, getByText } = render(
            <Suspense fallback="">
                <HomePage />
            </Suspense>
        )

        expect(getByText('Loading data...')).toBeInTheDocument()
        await waitFor(() => {
            expect(container.querySelector('button[type="submit"]')).toBeInTheDocument()
            expect(container.querySelector('select#picker-component')).toBeInTheDocument()
            expect(container.querySelector('input[placeholder="Search"]')).toBeInTheDocument()
        })
    })
})