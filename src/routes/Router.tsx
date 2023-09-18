import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage'
import Index from './pages/Index'
import Root from './Root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Index />,
				// loader: indexLoader(queryClient),
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
