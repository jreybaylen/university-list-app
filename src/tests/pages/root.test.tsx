import { render } from '@testing-library/react'

import Root from '@pages/Root'

describe('<Root /> Component', () => {
    it('Should render without crashing', () => {
        render(<Root />)
    })
})