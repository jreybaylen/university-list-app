interface SearchComposerProps {
    keyType: string
    keyWord: string
    onSubmit(param: string | object): void
}

export type {
    SearchComposerProps
}