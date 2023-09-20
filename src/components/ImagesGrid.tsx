import { loader } from '../routes/pages/Index'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { useInfiniteQuery, useIsFetching } from '@tanstack/react-query'
import { Alert, Button, Container, Spinner } from 'react-bootstrap'
import CatCard from './CatCard'
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { imagesQuery } from '../utils/queries'
const styles = {
	root: (isLoading: boolean) =>
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
	alert: css({
		width: 'fit-content',
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		gap: '2rem',
		margin: '0 auto',
	}),
}

const ImagesGrid = () => {
	const initialData = useLoaderData() as Awaited<
		ReturnType<ReturnType<typeof loader>>
	>

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
				if (lastPage.data.length < 4) return false
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

	const [alertOpen, setAlertOpen] = useState(false)

	useEffect(() => {
		setAlertOpen(isError)
	}, [isError])

	return (
		<>
			<Container
				css={styles.root(searching || navigation.state === 'loading')}
			>
				{data &&
					data.pages.map(page =>
						page.data.map((image: { id: string; url: string }) => (
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

			{alertOpen && (
				<Alert variant="danger" css={styles.alert}>
					Apologies but we could not load new cats for you at this
					time! Miau!
					<Button
						variant="danger"
						size="sm"
						onClick={() => setAlertOpen(false)}
					>
						close
					</Button>
				</Alert>
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
