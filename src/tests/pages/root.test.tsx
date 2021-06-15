import { render } from '@testing-library/react'

import Root from '@pages/Root'

describe('<Root /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(<Root />)

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render Home, Sign In and Register menu navigation', () => {
        const { getByText } = render(<Root />)

        expect(getByText(/home/i)).toBeInTheDocument()
        expect(getByText(/sign in/i)).toBeInTheDocument()
        expect(getByText(/register/i)).toBeInTheDocument()
    })
})