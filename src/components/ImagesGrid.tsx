import { imagesQuery, loader } from '../routes/pages/Index'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { useInfiniteQuery, useIsFetching } from '@tanstack/react-query'
import { Button, Container, Spinner } from 'react-bootstrap'
import CatCard from './CatCard'
import { css } from '@emotion/react'

const styles = {
	root: isLoading =>
		css({
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
			gridGap: '2rem',
			width: '100%',
			padding: '0',
			justifyItems: 'center',
			position: 'relative',
			opacity: isLoading ? '0.35' : '1',
			filter: isLoading ? 'grayscale(50%)' : 'grayscale(0%)',
			transition: 'all 0.3s ease-in-out',
			pointerEvents: isLoading ? 'none' : 'auto',
		}),
	button: css({
		width: '20rem',
		maxWidth: '100%',
		margin: '0 auto',
	}),
	loadingOverlay: css({
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	}),
}

const ImagesGrid = () => {
	const initialData = useLoaderData() as Awaited<ReturnType<typeof loader>>

	const selectedBreed = initialData.selectedBreed ?? 'all'

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
	} = useInfiniteQuery(
		imagesQuery(selectedBreed).queryKey,
		imagesQuery(selectedBreed).queryFn,
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.data.length < 10) return false
				return pages.length
			},
		},
	)

	const searching =
		useIsFetching({
			predicate: query =>
				query.queryKey[0] === 'images' &&
				query.queryKey[1] !== selectedBreed,
		}) > 0
	const navigation = useNavigation()

	return (
		<>
			<Container
				css={styles.root(searching || navigation.state === 'loading')}
			>
				{data &&
					data.pages.map(page =>
						page.data.map(image => (
							<CatCard key={image.id} image={image} />
						)),
					)}

				{selectedBreed === 'none' && (
					<p
						css={css({
							textAlign: 'center',
						})}
					>
						Please select a breed to see images
					</p>
				)}
			</Container>

			{isLoading && (
				<Spinner
					css={css({
						margin: '0 auto',
					})}
				/>
			)}

			{isError && (
				<p
					css={css({
						textAlign: 'center',
					})}
				>
					Apologies but we could not load new cats for you at this
					time! Miau!
				</p>
			)}

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
