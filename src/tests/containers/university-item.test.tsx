import { render, fireEvent } from '@testing-library/react'

import UniversityItem from '@container/UniversityItem'

const stateProvince = ''
const alpha_two_code = 'PH'
const country = 'Philippines'
const name = 'Adamson University'
const domains = [
    'https://test-url.com'
]
const web_pages = [
    'https://test-url.com'
]
const university = {
    name,
    domains,
    country,
    web_pages,
    alpha_two_code,
    'state-province': stateProvince
}

describe('<Banner /> Component', () => {
    beforeAll(() => {
        global.open = jest.fn()
    })

    it('Should render without crashing', () => {
        render(
            <UniversityItem { ...university } />
        )
    })

    it('Should render the info inside of Card component', () => {
        const { getByText } = render(
            <UniversityItem { ...university } />
        )

        expect(getByText(name)).toBeInTheDocument()
        expect(getByText(country)).toBeInTheDocument()
        expect(getByText(web_pages[0])).toBeInTheDocument()
    })

    it('Should open website link once it clicked', () => {
        const { getByText } = render(
            <UniversityItem { ...university } />
        )

        expect(global.open).not.toHaveBeenCalled()
        fireEvent.click(getByText(web_pages[0]))
        expect(global.open).toHaveBeenCalled()
    })

    it('Should trigger onSelect once the body of the card has been clicked', () => {
        const handleSelectCard = jest.fn()
        const { getByText } = render(
            <UniversityItem { ...university } onSelect={ handleSelectCard } />
        )

        expect(handleSelectCard).not.toHaveBeenCalled()
        fireEvent.click(getByText(country))
        expect(handleSelectCard).toHaveBeenCalled()
    })
})