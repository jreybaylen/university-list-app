import { render } from '@testing-library/react'

import Root from '@pages/Root'

describe('<Root /> Component', () => {
    it('Should render without crashing', () => {
        const wrapper = render(<Root />)

        expect(wrapper).toMatchSnapshot()
    })

    it('Should render Home, Sign In and Register menu navigation', () => {
        const { getByText } = render(<Root />)
        const navigation = [ 'Home', 'Sign In', 'Register' ]

        for (let i = 0; i++; i < navigation.length) {
            expect(getByText(navigation[ i ])).toBeInTheDocument()
        }
    })
})