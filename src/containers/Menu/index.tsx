import { Fragment } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'

import { routes } from './routes'
import { styles } from './index.style'
import { RouteProps } from './index.interface'
import { environment } from '@config/environment'
import { StorageKeyProps } from '@util/index.interface'
import { setUserToStorage, getAuthUserFromStorage } from '@util/index'

function Navigation (): JSX.Element {
    const history = useHistory()
    const { pathname } = useLocation()
    const existingUsers = getAuthUserFromStorage()
    const handleSignOut = () => {
        const { authStorage } = environment as { authStorage: StorageKeyProps }

        setUserToStorage(authStorage)
        history.replace('/auth')
    }

    if (pathname.includes('/university') || (pathname === '/profile')) {
        return <Fragment />
    }

    const navigationElement = (
        <nav style={ styles.container }>
            <ul style={ styles.navContainer }>
                { routes(Boolean(existingUsers)).map(
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
                { Boolean(existingUsers) && (
                    <Fragment>
                        <li>
                            <NavLink
                                exact
                                to="/profile"
                                style={ styles.link }
                                activeStyle={ styles.activeLink }
                                children={ `Hi ${ existingUsers.name || 'Anonymous' }!` }
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