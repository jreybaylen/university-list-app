import { Fragment } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'

import { routes } from './routes'
import { styles } from './index.style'
import { RouteProps } from './index.interface'

function Navigation (): JSX.Element {
    const history = useHistory()
    const location = useLocation()
    const existingUsers = localStorage.getItem('univ-app-user-auth') || ''
    const availableUsers = Boolean(existingUsers ? JSON.parse(existingUsers) : '')
    const handleSignOut = () => {
        localStorage.setItem('univ-app-user-auth', '')
        history.replace('/auth')
    }

    if (location.pathname.includes('/university')) {
        return <Fragment />
    }

    const navigationElement = (
        <nav style={ styles.container }>
            <ul style={ styles.navContainer }>
                { routes(availableUsers).map(
                    ({ id, path, label }: RouteProps) => (
                        <li key={ id }>
                            <NavLink
                                exact
                                to={ path }
                                children={ label }
                                style={ styles.link }
                                activeStyle={ styles.activeLink }
                            />
                        </li>
                    )
                ) }
                { availableUsers && (
                    <li onClick={ handleSignOut }>
                        Sign Out
                    </li>
                ) }
            </ul>
        </nav>
    )

    return navigationElement
}

export default Navigation