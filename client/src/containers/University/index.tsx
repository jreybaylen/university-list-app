import { styles } from './index.style'
import { UniversityProps } from '@interface/api.interface'

function University (props: UniversityProps): JSX.Element {
    const { name, country, ...rest } = props
    const websites = rest.web_pages.join(', ')
    const universityElement = (
        <div style={ styles.container }>
            <p>Name: { name }</p>
            <p>Country: { country }</p>
            <p>Websites: { websites }</p>
        </div>
    )

    return universityElement
}

export default University