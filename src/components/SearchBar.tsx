import { css } from '@emotion/react'
import { useIsFetching, useQuery } from '@tanstack/react-query'
import { useNavigation, useSubmit } from 'react-router-dom'
import { Form as BootstrapForm, Spinner } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { breedsQuery, loader } from '../routes/pages/Index'

const styles = {
	root: css({
		position: 'relative',
		width: '20rem',
		maxWidth: '100%',
	}),
	selectContained: css({
		position: 'relative',
	}),
	spinner: css({
		position: 'absolute',
		right: '2rem',
		top: '50%',
		transform: 'translateY(-50%)',
	}),
}

const SearchBar = () => {
	const { selectedBreed } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>

	const { data: breeds, isLoading } = useQuery(
		breedsQuery.queryKey,
		breedsQuery.queryFn,
	)

	const searching =
		useIsFetching({
			predicate: query =>
				query.queryKey[0] === 'images' &&
				query.queryKey[1] !== selectedBreed,
		}) > 0
	const navigation = useNavigation()

	const submit = useSubmit()

	const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
		submit(event.currentTarget.form)

	return (
		<BootstrapForm css={styles.root} id="search-form" role="search">
			<BootstrapForm.Group>
				<BootstrapForm.Label>Breed</BootstrapForm.Label>
				<div css={styles.selectContained}>
					{(isLoading ||
						searching ||
						navigation.state === 'loading') && (
						<div css={styles.spinner}>
							<Spinner variant="secondary" size="sm" />
						</div>
					)}
					<BootstrapForm.Select
						id="breed"
						name="breed"
						defaultValue={selectedBreed ?? undefined}
						onChange={handleBreedChange}
						disabled={searching || navigation.state === 'loading'}
					>
						<option value="all">All breeds</option>
						{!!breeds?.data &&
							breeds.data.map(
								(breed: { id: string; name: string }) => (
									<option value={breed.id} key={breed.id}>
										{breed.name}
									</option>
								),
							)}
					</BootstrapForm.Select>
				</div>
			</BootstrapForm.Group>
		</BootstrapForm>
	)
}

export default SearchBar
