import SearchBar from '../../components/SearchBar'
import CatCard from '../../components/CatCard'
import { Stack } from 'react-bootstrap'

const Index = () => {
	return (
		<Stack gap={5}>
			<SearchBar />
			<div>
				<CatCard />
			</div>
		</Stack>
	)
}

export default Index
