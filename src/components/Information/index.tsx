import { styles } from './index.style'
import { InformationProps } from './index.interface'

function Information (props: InformationProps): JSX.Element {
    const informationElement = (
        <div style={ styles.information }>
            <h2 style={ styles.heading }>{ props.title }</h2>
            <div style={ styles.content }>
                { props.children || <p>{ props?.content }</p> }
            </div>
        </div>
    )

    return informationElement
}

export {
    Information
}