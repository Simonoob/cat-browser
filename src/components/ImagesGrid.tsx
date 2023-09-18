import { imagesQuery, loader } from '../routes/pages/Index'
import { useLoaderData } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Button, Container, Overlay, Spinner } from 'react-bootstrap'
import CatCard from './CatCard'
import { useRef } from 'react'
import { css } from '@emotion/react'

const styles = {
	root: css({
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
		gridGap: '2rem',
		width: '100%',
		padding: '0',
		justifyItems: 'center',
	}),
	button: css({
		width: '20rem',
		maxWidth: '100%',
		margin: '0 auto',
	}),
}

const ImagesGrid = () => {
	const { selectedBreed } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery(
			imagesQuery(selectedBreed).queryKey,
			imagesQuery(selectedBreed).queryFn,
			{
				getNextPageParam: (lastPage, pages) => {
					if (lastPage.length < 10) return false
					return pages.length
				},
			},
		)

	const gridRef = useRef<HTMLDivElement>(null)

	return (
		<>
			<Container css={styles.root} ref={gridRef}>
				{data &&
					data.pages.map(page =>
						page.map(image => (
							<CatCard key={image.id} image={image.url} />
						)),
					)}

				{/* display and overlay with a spinner if loading */}
				<Overlay
					target={gridRef.current}
					show={isLoading}
					placement="bottom"
				>
					<Spinner variant="primary" animation="border" />
				</Overlay>
			</Container>

			{hasNextPage && (
				<Button
					disabled={isFetchingNextPage}
					onClick={() => fetchNextPage()}
					variant="outline-dark"
					css={styles.button}
				>
					{isFetchingNextPage ? 'Loading more...' : 'Load More'}
				</Button>
			)}
		</>
	)
}

export default ImagesGrid
