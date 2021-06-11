import { SelectHTMLAttributes } from 'react'

interface PickerProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Array<string>
}

export type {
    PickerProps
}