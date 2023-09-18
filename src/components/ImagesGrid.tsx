import { imagesQuery, loader } from '../routes/pages/Index'
import { useLoaderData } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Container } from 'react-bootstrap'
import CatCard from './CatCard'

const styles = {
	root: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
		gridGap: '1rem',
	},
}

const ImagesGrid = () => {
	const { selectedBreed } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			imagesQuery(selectedBreed).queryKey,
			imagesQuery(selectedBreed).queryFn,
		)

	return (
		<Container css={styles.root}>
			{data &&
				data.pages.map(page =>
					page.map(image => (
						<CatCard key={image.id} image={image.url} />
					)),
				)}
		</Container>
	)
}

export default ImagesGrid
