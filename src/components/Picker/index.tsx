import { ChangeEvent } from 'react'

import { styles } from './index.style'
import { PickerProps } from './index.interface'

function Picker (props: PickerProps): JSX.Element {
    const { onChange, options, value } = props
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event)
        }
    }
    const pickerElement = (
        <select
            value={ value }
            name={ props.name }
            id="picker-component"
            style={ styles.select }
            onChange={ handleChange }
        >
            { options.map(
                (option: string, index: number) => (
                    <option
                        key={ `${ index }-${ option }` }
                        value={ option.toLocaleLowerCase() }
                    >
                        { option }
                    </option>
                )
            ) }
        </select>
    )

    return pickerElement
}

export {
    Picker
}