import { RoutesProps } from './index.interface'

const routes: RoutesProps = [
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

export {
    routes
}