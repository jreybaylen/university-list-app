import { lazy } from 'react'

import { getAuthUserFromStorage } from '@util/index'

const Banner = lazy(() => import('@container/Banner'))

function Profile (): JSX.Element {
    const profile = getAuthUserFromStorage()
    const profileElement = (
        <Banner title={ profile.name } />
    )

    return profileElement
}

export default Profile