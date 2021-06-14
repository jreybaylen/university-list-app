
import { UniversityProps } from '@interface/api.interface'

interface UniversityStorageProps {
    [ username: string ]: Array<{
        [ university: string ]: UniversityProps
    }>
}

type StorageKeyProps = 'univ-app-user' | 'univ-app-user-auth' | 'univ-app-user-universities'

export type {
    StorageKeyProps,
    UniversityStorageProps
}