import { Fragment } from 'react'

import { styles } from './index.style'
import { LoaderProps } from './index.interface'

function Loader (props: LoaderProps): JSX.Element {
    if (!Boolean(props.show)) {
        return <Fragment />
    }

    const loaderElement = (
        <div style={ styles.container }>Loading data...</div>
    )

    return loaderElement
}

export {
    Loader
}