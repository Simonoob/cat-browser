import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Stack } from 'react-bootstrap'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'

export const imagesQuery = (breed = 'all') => ({
	queryKey: ['images', breed],
	queryFn: async ({ pageParam = 0 }) => {
		const apiKey = import.meta.env.VITE_CAT_API_KEY

		// add a 80% chance of error
		// if (Math.random() < 0.8) {
		// 	throw new Error('Random error')
		// }

		return await axios.get('https://api.thecatapi.com/v1/images/search', {
			params: {
				breed_id: breed === 'all' ? undefined : breed,
				limit: 10,
				page: pageParam,
				order: 'ASC',
			},
			headers: {
				'x-api-key': apiKey,
			},
		})
	},
})

export const breedsQuery = {
	queryKey: ['breeds'],
	queryFn: async () => await axios.get('https://api.thecatapi.com/v1/breeds'),
}

export const loader =
	(queryClient: QueryClient) =>
	async ({ request }: { request: Request }) => {
		const url = new URL(request.url)
		const selectedBreed = url.searchParams.get('breed') || 'all'

		const images =
			queryClient.getQueryData(imagesQuery(selectedBreed).queryKey) ??
			(await queryClient.prefetchInfiniteQuery(
				imagesQuery(selectedBreed).queryKey,
				imagesQuery(selectedBreed).queryFn,
			))

		const breeds =
			queryClient.getQueryData(breedsQuery.queryKey) ??
			(await queryClient.fetchQuery(
				breedsQuery.queryKey,
				breedsQuery.queryFn,
			))

		return {
			breeds,
			images,
			selectedBreed,
		}
	}

const Index = () => {
	return (
		<Stack gap={5}>
			<SearchBar />
			<ImagesGrid />
		</Stack>
	)
}

export default Index
