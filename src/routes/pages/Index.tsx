import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Stack } from 'react-bootstrap'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'

export const imagesQuery = (breed = 'none') => ({
	queryKey: ['images', breed],
	queryFn: async ({ pageParam = 0 }) => {
		const apiKey = import.meta.env.VITE_CAT_API_KEY

		if (breed === 'none') return { data: [] }

		return await axios.get('https://api.thecatapi.com/v1/images/search', {
			params: {
				breed_id: breed,
				limit: 4,
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
		const selectedBreed = url.searchParams.get('breed') ?? 'none'

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
