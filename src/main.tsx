import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import queryClient from './utils/ queryClient'
import { ThemeProvider } from '@emotion/react'
import router from './routes/Router'
import theme from './utils/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />

				{/* uncomment the line below to see individual queries in the devtools */}
				{/* <ReactQueryDevtools position="bottom-right" />  */}
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>,
)
