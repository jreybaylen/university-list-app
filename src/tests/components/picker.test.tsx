import userEvent from '@testing-library/user-event'
import { render, fireEvent } from '@testing-library/react'

import { Picker } from '@components/Picker'

describe('<Picker /> Component', () => {
    it('Should render without crashing', () => {
        render(<Picker options={ [] } />)
    })

    it('Should render select element without option', () => {
        const { container } = render(<Picker options={ [] } />)

        expect(container.querySelector('select')).toBeInTheDocument()
        expect(container.querySelectorAll('option').length).toBe(0)
    })

    it('Should render select element with "Name" and "Country" option', () => {
        const { container, getByText } = render(
            <Picker options={ [ 'Name', 'Country' ] } />
        )

        expect(container.querySelector('select')).toBeInTheDocument()
        expect(getByText('Country')).toBeInTheDocument()
        expect(getByText('Name')).toBeInTheDocument()
        expect(container.querySelectorAll('option').length).toBe(2)
    })

    it('Should render select with default and selected value', () => {
        const { container, getByText } = render(
            <Picker value="name" options={ [ 'Country', 'Name'] } />
        )

        expect(container.querySelector('select')?.value).toBe('name')
        fireEvent.change(getByText('Name'), { target: { value: 'country' } })
        expect(container.querySelector('select')?.value).toBe('country')
    })

    it('Should trigger onChange when value has been changed', () => {
        const handlePickerChange = jest.fn()
        const { container } = render(
            <Picker
                value="name"
                onChange={ handlePickerChange }
                options={ [ 'Name', 'Country' ] }
            />
        )
        const selectElement = container.querySelector('select')
        const nameOption = container.getElementsByTagName('option').item(0)
        const countryOption = container.getElementsByTagName('option').item(1)

        expect(handlePickerChange).not.toHaveBeenCalled()
        expect(selectElement?.value).toBe('name')
        userEvent.selectOptions(selectElement as HTMLSelectElement, 'name')
        expect((nameOption as HTMLOptionElement).selected).toBe(true)
        expect((countryOption as HTMLOptionElement).selected).toBe(false)
        expect(handlePickerChange).toHaveBeenCalled()
    })
})