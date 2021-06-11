interface FormEditorProps {
    title: string
    onSubmit(): void
    submitLabel: string
    children: Array<JSX.Element>
}

export type {
    FormEditorProps
}