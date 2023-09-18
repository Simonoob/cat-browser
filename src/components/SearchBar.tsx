import { css } from '@emotion/react'
import { Form } from 'react-bootstrap'

const styles = {
	root: css({
		position: 'relative',
		width: '20rem',
		maxWidth: '100%',
	}),
}

const SearchBar = () => {
	return (
		<Form css={styles.root}>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Breed</Form.Label>
				<Form.Select>
					<option>1</option>
				</Form.Select>
			</Form.Group>
		</Form>
	)
}

export default SearchBar
