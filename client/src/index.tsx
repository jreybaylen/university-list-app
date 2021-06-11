import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'

import RootApp from '@pages/Root'

ReactDOM.render(
	<React.StrictMode>
		<RootApp />
	</React.StrictMode>,
	document.getElementById('root')
)

reportWebVitals()
