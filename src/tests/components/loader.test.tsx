import { render } from '@testing-library/react'

import { Loader } from '@components/Loader'

describe('<Loader /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(<Loader show={ true } />)

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render component when "show" prop is "true"', () => {
        const { getByText } = render(<Loader show={ true } />)

        expect(getByText(/loading data.../i)).toBeInTheDocument()
    })

    it('Should not render component when "show" prop is "false"', () => {
        const { queryByText } = render(<Loader show={ false } />)

        expect(queryByText(/loading data.../i)).toBe(null)
    })
})