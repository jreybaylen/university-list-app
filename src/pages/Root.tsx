import { lazy, Suspense } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

const AuthPage = lazy(() => import('@pages/Auth'))
const HomePage = lazy(() => import('@pages/Home'))
const ProfilePage = lazy(() => import('@pages/Profile'))
const RegisterPage = lazy(() => import('@pages/Register'))
const UniversityPage = lazy(() => import('@pages/University'))
const NavigationMenu = lazy(() => import('@container/Navigation'))

function Root (): JSX.Element {
    const rootElement = (
        <Suspense fallback="">
            <BrowserRouter>
                <NavigationMenu />
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    <Route path="/auth" component={ AuthPage } />
                    <Route path="/profile" component={ ProfilePage } />
                    <Route path="/register" component={ RegisterPage } />
                    <Route path="/university/:name" component={ UniversityPage } />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
 
    return rootElement
}

export default Root