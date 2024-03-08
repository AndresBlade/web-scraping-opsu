/* eslint-disable no-mixed-spaces-and-tabs */
import { Header } from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';
import jsonStates from './data/states.json';
import { useForm } from './hooks/useForm';
import { SearchForm } from './interfaces/SearchForm';
import Universities from './components/university/Universities';
import { useState } from 'react';
import { UniversityPage } from './components/university/University';
import { University } from './interfaces/University';
import { Location } from './interfaces/Location';
import { LocationPage } from './components/location/Location';

function App() {
	const {
		searchName,
		onInputChange,
		states,
		managementType,
		onRadioChange,
		onCheckboxChange,
	} = useForm<SearchForm>({
		searchOption: 'Universidad',
		searchName: '',
		states: jsonStates.map(state =>
			state.name === 'Lara'
				? {
						value: state.id,
						content: state.name,
						checked: true,
				  }
				: {
						value: state.id,
						content: state.name,
						checked: false,
				  }
		),
		managementType: '3',
	});
	console.log(managementType);

	const [clickedUniversity, setClickedUniversity] =
		useState<null | University>(null);

	const [clickedLocation, setClickedLocation] = useState<null | {
		university: University;
		location: Location;
	}>(null);

	console.log(clickedLocation);
	return (
		<>
			<Header
				onInputChange={onInputChange}
				searchName={searchName}
				setClickedUniversity={setClickedUniversity}
				setClickedLocation={setClickedLocation}
			/>
			<div className="app-flex">
				<Sidebar
					managementType={managementType}
					onCheckboxChange={onCheckboxChange}
					onRadioChange={onRadioChange}
					states={states}
				/>
				{clickedUniversity ? (
					<UniversityPage
						university={clickedUniversity}
						setClickedLocation={setClickedLocation}
						setClickedUniversity={setClickedUniversity}
					/>
				) : clickedLocation ? (
					<LocationPage
						university={clickedLocation.university}
						location={clickedLocation.location}
					/>
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
