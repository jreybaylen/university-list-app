import { lazy, Suspense } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

const AuthPage = lazy(() => import('@pages/Auth'))
const HomePage = lazy(() => import('@pages/Home'))
const UniversityPage = lazy(() => import('@pages/University'))

function Root (): JSX.Element {
    const rootElement = (
        <Suspense fallback="">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    <Route path="/:name" component={ UniversityPage } />
                    <Route exact path="/auth" component={ AuthPage } />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
 
    return rootElement
}

export default Root