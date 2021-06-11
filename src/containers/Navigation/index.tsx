import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { routes } from './routes'
import { styles } from './index.style'
import { RouteProps } from './index.interface'

function Navigation (): JSX.Element {
    const location = useLocation()

    if (location.pathname.includes('/university')) {
        return <Fragment />
    }

    const navigationElement = (
        <nav style={ styles.container }>
            <ul style={ styles.navContainer }>
                { routes.map(
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
            </ul>
        </nav>
    )

    return navigationElement
}

export default Navigation