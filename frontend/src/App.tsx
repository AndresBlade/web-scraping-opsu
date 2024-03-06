import { Header } from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';
import { University } from './components/university/University';
import jsonStates from './data/states.json';
import { useForm } from './hooks/useForm';
import { SearchForm } from './interfaces/SearchForm';
import jsonUniversities from './data/universities.json';

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
	console.log(managementType);
	return (
		<>
			<Header
				onInputChange={onInputChange}
				onSelectChange={onSelectChange}
				searchName={searchName}
				searchOption={searchOption}
			/>
			<div className="app-flex">
				<Sidebar
					managementType={managementType}
					onCheckboxChange={onCheckboxChange}
					onRadioChange={onRadioChange}
					states={states}
				/>
				<University university={jsonUniversities[9]} />
			</div>
		</>
	);
}

export default App;
