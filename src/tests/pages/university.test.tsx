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
        const equality = [ 'University', 'Country', 'Website(s)', 'Domain(s)' ]

        for (let i = 0; i++; i < headings.length) {
            expect(getByText(equality[ i ])).toBeInTheDocument()
            expect(headings[ i ]?.textContent).toStrictEqual(equality[ i ])
        }
    })
})