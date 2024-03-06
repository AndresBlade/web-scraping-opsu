import { Header } from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';
import jsonStates from './data/states.json';
import { useForm } from './hooks/useForm';
import { SearchForm } from './interfaces/SearchForm';
import Universities from './components/university/Universities';
import { useState } from 'react';
import { UniversityPage } from './components/university/University';
import { University } from './interfaces/University';

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

	const [clickedUniversity, setClickedUniversity] =
		useState<null | University>(null);

	console.log(managementType);
	return (
		<>
			<Header
				onInputChange={onInputChange}
				onSelectChange={onSelectChange}
				searchName={searchName}
				searchOption={searchOption}
				setClickedUniversity={setClickedUniversity}
			/>
			<div className="app-flex">
				<Sidebar
					managementType={managementType}
					onCheckboxChange={onCheckboxChange}
					onRadioChange={onRadioChange}
					states={states}
				/>
				{clickedUniversity ? (
					<UniversityPage university={clickedUniversity} />
				) : (
					<Universities
						managementType={managementType}
						searchName={searchName}
						states={states}
						setClickedUniversity={setClickedUniversity}
					/>
				)}
			</div>
		</>
	);
}

export default App;
