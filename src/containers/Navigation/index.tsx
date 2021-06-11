import { Fragment } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'

import { routes } from './routes'
import { styles } from './index.style'
import { RouteProps } from './index.interface'
import { ProfileProps } from '@interface/profile.interface'

function Navigation (): JSX.Element {
    const history = useHistory()
    const location = useLocation()
    const existingUsers = localStorage.getItem('univ-app-user-auth') || ''
    const availableUsers: ProfileProps = existingUsers ? JSON.parse(existingUsers) : ''
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
                { routes(Boolean(availableUsers)).map(
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
                { Boolean(availableUsers) && (
                    <Fragment>
                        <li>
                            <NavLink
                                exact
                                to="/profile"
                                style={ styles.link }
                                activeStyle={ styles.activeLink }
                                children={ `Hi ${ availableUsers.name }!` }
                            />
                        </li>
                        <li style={ styles.signOut } onClick={ handleSignOut }>
                            Sign Out
                        </li>
                    </Fragment>
                ) }
            </ul>
        </nav>
    )

    return navigationElement
}

export default Navigation