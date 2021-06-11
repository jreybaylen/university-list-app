import { MouseEvent } from 'react'

import { UniversityProps } from '@interface/api.interface'

interface ModifiedUniversityProps extends UniversityProps {
    onSelect?(param: MouseEvent<HTMLDivElement>): void
}

export type {
    ModifiedUniversityProps
}