import { Header } from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';
import jsonStates from './data/states.json';
import { useForm } from './hooks/useForm';
import { SearchForm } from './interfaces/SearchForm';
import Universities from './components/ui/Universities';

function App() {
	const {
		searchOption,
		searchName,
		onSelectChange,
		onInputChange,
		states,
		managementType,
		onRadioChange,
		onCheckboxChange,
	} = useForm<SearchForm>({
		searchOption: 'Universidad',
		searchName: '',
		states: jsonStates.map(state => ({
			value: state.id,
			content: state.name,
			checked: false,
		})),
		managementType: null,
	});

	return (
		<>
			<Header
				onInputChange={onInputChange}
				onSelectChange={onSelectChange}
				searchName={searchName}
				searchOption={searchOption}
			/>
			<div className='app-flex'>
				<Sidebar
					managementType={managementType}
					onCheckboxChange={onCheckboxChange}
					onRadioChange={onRadioChange}
					states={states}
				/>
				<Universities />
			</div>

		</>
	);
}

export default App;
