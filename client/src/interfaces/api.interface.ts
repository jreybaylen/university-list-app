interface UniversityProps {
    name: string
    country: string
    alpha_two_code: string
    domains: Array<string>
    'state-province': string
    web_pages: Array<string>
}

interface APIResponseProps {
    data: Array<UniversityProps>
}

export type {
    UniversityProps,
    APIResponseProps
}