import userEvent from '@testing-library/user-event'
import { render, fireEvent } from '@testing-library/react'

import SearchComposer from '@container/SearchComposer'

const keyType = 'country'
const keyWord = 'Philippines'

describe('<SearchComposer /> Component', () => {
    it('Should render without crashing', () => {
        const handleSubmit = jest.fn()
        const wrapper = render(
            <SearchComposer
                keyType={ keyType }
                keyWord={ keyWord }
                onSubmit={ handleSubmit }
            />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render Form, Picker, Input and Button component', () => {
        const handleSubmit = jest.fn()
        const selectors = [ 'form', 'select[name="type"]', 'input[name="word"]', 'button[type="submit"]' ]
        const { container } = render(
            <SearchComposer
                keyType={ keyType }
                keyWord={ keyWord }
                onSubmit={ handleSubmit }
            />
        )

        for (let i = 0; i++; i < selectors.length) {
            expect(container.querySelector(selectors[ i ])).toBeInTheDocument()
        }
    })

    it('Should trigger onSubmit once the form has been submitted', () => {
        const handleSubmit = jest.fn()
        const { getByText } = render(
            <SearchComposer
                keyType={ keyType }
                keyWord={ keyWord }
                onSubmit={ handleSubmit }
            />
        )

        expect(handleSubmit).not.toHaveBeenCalled()
        fireEvent.submit(getByText(/go/i))
        expect(handleSubmit).toHaveBeenCalled()
    })

    it('Should change the value of Picker once the picker has been changed', () => {
        const handleSubmit = jest.fn()
        const { container, getByDisplayValue } = render(
            <SearchComposer
                keyType={ keyType }
                keyWord={ keyWord }
                onSubmit={ handleSubmit }
            />
        )
        const optionElement = getByDisplayValue(/name|country/i)
        const selectElement = container.querySelector('select[name="type"]')
        const nameOption = container.getElementsByTagName('option').item(0)
        const countryOption = container.getElementsByTagName('option').item(1)

        expect(optionElement).toBeInTheDocument()
        userEvent.selectOptions(selectElement as HTMLSelectElement, 'name')
        expect((nameOption as HTMLOptionElement).selected).toBe(true)
        userEvent.selectOptions(selectElement as HTMLSelectElement, 'country')
        expect((countryOption as HTMLOptionElement).selected).toBe(true)
        expect((nameOption as HTMLOptionElement).selected).toBe(false)
        expect((selectElement as HTMLSelectElement).value).toStrictEqual('country')
    })
})