import { render, fireEvent } from '@testing-library/react'

import { WebsiteLink } from '@components/WebsiteLink'

describe('<WebsiteLink /> Component', () => {
    it('Should render without crashing', () => {
        render(<WebsiteLink website="" />)
    })

    it('Should trigger onSelect when button is click', () => {
        const handleClick = jest.fn()
        const website = 'https://google.com'
        const { getByText } = render(
            <WebsiteLink onSelect={ handleClick } website={ website } />
        )

        fireEvent.click(getByText(website))
        expect(handleClick).toHaveBeenCalled()
    })

    it('Should render a button with the same link and content', () => {
        const handleClick = jest.fn()
        const website = 'https://google.com'
        const { container, getByText } = render(
            <WebsiteLink onSelect={ handleClick } website={ website } />
        )

        expect(getByText(website)).toBeInTheDocument()
        expect(container.querySelector('button')?.textContent).toBe(website)
    })
})