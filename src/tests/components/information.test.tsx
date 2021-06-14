import { render } from '@testing-library/react'

import { Information } from '@components/Information'

describe('<Information /> Component', () => {
    it('Should render without crashing', () => {
        render(<Information title="Information" />)
    })

    it('Should render a dynamic heading and single content', () => {
        const { queryByText, container } = render(
            <Information title="Information" content="Information content" />
        )

        expect(queryByText('Information')).toBeInTheDocument()
        expect(container.querySelectorAll('p').length).toBe(1)
        expect(queryByText('Information content')).toBeInTheDocument()
    })

    it('Should render children not content', () => {
        const { queryByText, container } = render(
            <Information title="Information">
                <article>Article 1 here!</article>
                <article>Article 2 here!</article>
            </Information>
        )

        expect(queryByText('Information')).toBeInTheDocument()
        expect(container.querySelectorAll('p').length).toBe(0)
        expect(container.querySelectorAll('article').length).toBe(2)
    })

    it('Should render a dynamic content using children prop', () => {
        const { queryByText, container } = render(
            <Information title="Information">
                { [ 0, 1, 2, 3, 4 ].map(
                    (index: number) => (
                        <p key={ `test-${ index }` }>
                            Content here
                        </p>
                    )
                ) }
            </Information>
        )

        expect(queryByText('Information')).toBeInTheDocument()
        expect(container.querySelectorAll('p').length).toBe(5)
    })

    it('Should render content not children', () => {
        const { queryByText, container } = render(
            <Information title="Information" content="Information content" />
        )

        expect(queryByText('Information')).toBeInTheDocument()
        expect(queryByText('Information content')).toBeInTheDocument()
        expect(container.querySelectorAll('p').length).toBe(1)
    })
})