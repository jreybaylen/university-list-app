import { Fragment } from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Card, Button } from '@components/index'

describe('<Card /> Component', () => {
    it('Should render without crashing', () => {
        render(
            <Card>
                <p>Card component</p>
            </Card>
        )
    })

    it('Should display all the children component', () => {
        const pContent = 'Card component'
        const { getByText } = render(
            <Card>
                <p>{ pContent }</p>
                <Button children="Click Me!" />
            </Card>
        )

        expect(getByText(pContent)).toBeInTheDocument()
        expect(getByText(/click me!/i)).toBeInTheDocument()
    })

    it('Should trigger "onClick" once the card has been clicked', () => {
        const content = 'Card component'
        const handleCardClick = jest.fn()
        const { getByText } = render(
            <Card onClick={ handleCardClick }>
                <Fragment>{ content }</Fragment>
            </Card>
        )

        fireEvent.click(getByText(content))
        expect(handleCardClick).toHaveBeenCalled()
    })

    it('Should have an updated styles when onMouseEnter and onMouseLeave has been called', () => {
        const content = 'Card component'
        const { getByText } = render(
            <Card>
                <>{ content }</>
            </Card>
        )
        const cardElement = getByText(content)

        expect(cardElement).toHaveStyle('box-shadow: none')
        fireEvent.mouseOver(cardElement)
        expect(cardElement).toHaveStyle('box-shadow: rgb(0 0 0 / 20%) 0px 4px 8px 0px')
        fireEvent.mouseLeave(cardElement)
        expect(cardElement).toHaveStyle('box-shadow: none')
    })
})