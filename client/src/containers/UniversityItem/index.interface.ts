import { UniversityProps } from '@interface/api.interface'

interface ModifiedUniversityProps extends UniversityProps {
    onSelect?(param: string): void
}

export type {
    ModifiedUniversityProps
}