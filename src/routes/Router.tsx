import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Index from './pages/Index'
import Root from './Root'
import queryClient from '../utils/ queryClient'
import { loader as indexLoader } from './pages/Index'
import CatId from './pages/CatId'
import { loader as catLoader } from './pages/CatId'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Index />,
				loader: indexLoader(queryClient),
			},
			{
				path: '/:breed/:catId',
				element: <CatId />,
				loader: catLoader(queryClient),
			},
		],
	},
])

export default router
