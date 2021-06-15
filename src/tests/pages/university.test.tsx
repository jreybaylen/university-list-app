import { lazy, Suspense } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'

const UniversityPage = lazy(() => import('@pages/University'))

describe('<UniversityPage /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(
            <Suspense fallback="">
                <UniversityPage />
            </Suspense>
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render headings of the page', async () => {
        const { container, getByText } = render(
            <Suspense fallback="">
                <MemoryRouter initialEntries={ [ '/university/Adamson%20University' ] }>
                    <Route path="/university/:name" component={ UniversityPage } />
                </MemoryRouter>
            </Suspense>
        )
        const headings = container.querySelectorAll('h2')

        expect(getByText(/university/i)).toBeInTheDocument()
        expect(headings[0]?.textContent).toStrictEqual('University')
        expect(getByText(/country/i)).toBeInTheDocument()
        expect(headings[1]?.textContent).toStrictEqual('Country')
        expect(getByText(/website\(s\)/i)).toBeInTheDocument()
        expect(headings[2]?.textContent).toStrictEqual('Website(s)')
        expect(getByText(/domain\(s\)/i)).toBeInTheDocument()
        expect(headings[3]?.textContent).toStrictEqual('Domain(s)')
    })
})