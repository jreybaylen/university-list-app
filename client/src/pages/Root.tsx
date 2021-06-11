import { lazy, Suspense } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'

const HomePage = lazy(() => import('@pages/Home'))

function Root (): JSX.Element {
    const rootElement = (
        <Suspense fallback="">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                </Switch>
            </BrowserRouter>
        </Suspense>
    )
 
    return rootElement
}

export default Root