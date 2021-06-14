import { RoutesProps } from './index.interface'

const routes = (isAuth: boolean): RoutesProps => {
    const config = [
        {
            id: 'home',
            path: '/',
            label: 'Home'
        },
        {
            id: 'sign-in',
            path: '/auth',
            label: 'Sign In'
        },
        {
            id: 'register',
            path: '/register',
            label: 'Register'
        },
    ]
    const modifiedConfig = config.slice(0, isAuth ? 1 : config.length)

    return modifiedConfig
}

export {
    routes
}