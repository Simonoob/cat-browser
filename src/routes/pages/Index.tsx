import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Stack } from 'react-bootstrap'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'

export const imagesQuery = (breed = 'all') => ({
	queryKey: ['images', breed],
	queryFn: async ({ pageParam = 0 }) => {
		const apiKey = import.meta.env.VITE_CAT_API_KEY
		const data = await axios.get(
			'https://api.thecatapi.com/v1/images/search',
			{
				params: {
					breed_id: breed === 'all' ? undefined : breed,
					limit: 10,
					page: pageParam,
					order: 'ASC',
				},
				headers: {
					'x-api-key': apiKey,
				},
			},
		)
		return data.data
	},
})

export const breedsQuery = {
	queryKey: ['breeds'],
	queryFn: async () => {
		const data = await axios.get('https://api.thecatapi.com/v1/breeds')
		return data.data
	},
}

export const loader =
	(queryClient: QueryClient) =>
	async ({ request }: { request: Request }) => {
		const url = new URL(request.url)
		const selectedBreed = url.searchParams.get('breed') || 'all'

		if (!queryClient.getQueryData(imagesQuery(selectedBreed).queryKey)) {
			await queryClient.fetchInfiniteQuery(
				imagesQuery(selectedBreed).queryKey,
				imagesQuery(selectedBreed).queryFn,
			)
		}

		if (!queryClient.getQueryData(breedsQuery.queryKey)) {
			await queryClient.fetchQuery(
				breedsQuery.queryKey,
				breedsQuery.queryFn,
			)
		}

		return {
			breeds: queryClient.getQueryData(breedsQuery.queryKey),
			images: queryClient.getQueryData(
				imagesQuery(selectedBreed).queryKey,
			),
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
