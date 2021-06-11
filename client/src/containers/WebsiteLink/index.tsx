import { MouseEvent } from 'react'

import { styles } from './index.style'
import { WebsiteLinkProps } from './index.interface'

function WebsiteLink (props: WebsiteLinkProps): JSX.Element {
    const { website } = props
    const handleClickLink = (event: MouseEvent<HTMLButtonElement>) => {
        if (props.onSelect) {
            event.stopPropagation()
            props.onSelect(website)
        }
    }
    const websiteLinkElement = (
        <button style={ styles.website } onClick={ handleClickLink }>
            { website }
        </button>
    )

    return websiteLinkElement
}

export default WebsiteLink