import { QueryClient } from '@tanstack/react-query'
import { Stack } from 'react-bootstrap'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'
import { breedsQuery, imagesQuery } from '../../utils/queries'

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
