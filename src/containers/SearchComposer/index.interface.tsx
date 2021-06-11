import { FormProps } from '@interface/form.interface'

interface SearchComposerProps {
    keyType: string
    keyWord: string
    onSubmit(param: string | object): void
}

export type {
    FormProps,
    SearchComposerProps
}