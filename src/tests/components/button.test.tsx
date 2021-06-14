import { render, fireEvent } from '@testing-library/react'

import { Button } from '@components/Button'

describe('<Button /> Component', () => {
    it('Should render without crashing', () => {
        render(<Button />)
    })

    it('Should have dynamic properties', () => {
        const background = 'red'
        const buttonLabel = 'Button testing'
        const handleClick = jest.fn()
        const { getByText } = render(
            <Button onClick={ handleClick } children={ buttonLabel } style={{ background }} />
        )

        expect(getByText(buttonLabel)).toBeInTheDocument()
        expect(getByText(buttonLabel)).toHaveStyle(`background: ${ background }`)
    })

    it('Should work as expected when button is click', () => {
        const handleClick = jest.fn()
        const { getByText } = render(
            <Button onClick={ handleClick } children="Click me" />
        )

        fireEvent.click(getByText(/click me/i))
        expect(handleClick).toHaveBeenCalled()
    })
})