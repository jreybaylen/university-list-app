interface RouteProps {
    id: string
    path: string
    label: string
}

type RoutesProps = Array<RouteProps>

export type {
    RouteProps,
    RoutesProps
}