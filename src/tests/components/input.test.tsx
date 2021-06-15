import { render, fireEvent } from '@testing-library/react'

import { Input } from '@components/Input'

describe('<Input /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(<Input />)

        expect(wrapper).toMatchSnapshot()
    })
    
    it('Should render input when using the component', () => {
        const { container } = render(<Input />)

        expect(container.querySelector('input')).toBeInTheDocument()
    })

    it('Should have dynamic properties', () => {
        const padding = '8px 10px'
        const placeholder = "Testing"
        const { getByDisplayValue } = render(
            <Input
                value={ 12 }
                style={{ padding }}
                placeholder={ placeholder }
            />
        )
        const inputElement = getByDisplayValue(12)

        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveDisplayValue('12')
        expect(inputElement).toHaveStyle(`padding: ${ padding }`)
        expect(inputElement.getAttribute('placeholder')).toBe(placeholder)
    })

    it('Should trigger onChange when the component detected the value has been changed', () => {
        const testId = 'input-element'
        const handleInputChange = jest.fn()
        const { getByLabelText } = render(
            <Input onChange={ handleInputChange } aria-label={ testId } />
        )
        const inputElement = getByLabelText(testId)

        expect(inputElement).toHaveDisplayValue('')
        fireEvent.change(inputElement, { target: { value: 26 } })
        expect(handleInputChange).toHaveBeenCalled()
        expect(inputElement).toHaveDisplayValue('26')
    })
})