import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Index from './pages/Index'
import Root from './Root'
import {
	loader as breedsLoader,
	action as breedsAction,
} from '../components/SearchBar'
import queryClient from '../utils/ queryClient'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Index />,
				loader: breedsLoader(queryClient),
			},
			{
				path: '/:catId',
				element: <div>specific cat page</div>,
				// loader: catLoader(queryClient),
				// action: catAction(queryClient),
			},
		],
	},
])

export default router
