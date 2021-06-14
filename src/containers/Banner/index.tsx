import { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import { styles } from './index.style'
import { BannerProps } from './index.interface'

function Banner (props: BannerProps): JSX.Element {
    const history = useHistory()
    const handleBack = () => {
        history.replace('/')
    }

    const bannerElement = (
        <Fragment>
            <button style={ styles.back } onClick={ handleBack }>
                Back
            </button>
            <div style={ styles.container }>
                <h1 style={ styles.heading }>{ props.title }</h1>
            </div>
        </Fragment>
    )

    return bannerElement
}

export default Banner