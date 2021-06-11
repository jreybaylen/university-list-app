import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('@pages/Home'))

function Root (): JSX.Element {
    const rootElement = (
        <Suspense fallback="">
            <HomePage />
        </Suspense>
    )
 
    return rootElement
}

export default Root