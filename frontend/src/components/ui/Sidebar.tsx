import jsonStates from '../../data/states.json';
import statesPng from '../../assets/states.png';
import managementPng from '../../assets/management.png';
import jsonManagementTypes from '../../data/management.json';
import { useForm } from '../../hooks/useForm';

interface Form {
	states: { value: string; content: string; checked: boolean }[];
	managementType: null | string;
}

const Sidebar = () => {
	const { states, managementType, onRadioChange, onCheckboxChange } =
		useForm<Form>({
			states: jsonStates.map(state => ({
				value: state.id,
				content: state.name,
				checked: false,
			})),
			managementType: null,
		});

	return (
		<div>
			<aside className="sidebar">
				<div className="sidebar__hover">
					<div className="sidebar__flex">
						<img src={managementPng} alt="gestion" />
						<h2>Gestion</h2>
					</div>
					<ul className="principal">
						<li className="sidebar__list">
							{jsonManagementTypes.map((management, index) => {
								const htmlID = `${management.name}Checkbox`;
								return (
									<div
										className="sidebar__list-li"
										key={index}
									>
										<input
											type="radio"
											name="managementType"
											onChange={onRadioChange}
											id={htmlID}
											className="sidebar__li-item"
											title={management.name}
											value={management.id}
											checked={
												management.id === managementType
											}
										/>
										<label htmlFor={htmlID}>
											{management.name}
										</label>
									</div>
								);
							})}
						</li>
					</ul>
				</div>
				<div className="sidebar__hover sidebar__hover-vh">
					<div className="sidebar__flex">
						<img src={statesPng} alt="estados" />
						<h2>Estados</h2>
					</div>
					<ul className="principal">
						<li className="sidebar__list">
							{states.map((state, index) => {
								// Code to render each estado item
								const htmlID = `${state.content}Checkbox`;
								return (
									<div
										className="sidebar__list-li"
										key={index}
									>
										<input
											onChange={onCheckboxChange}
											className="sidebar__li-item"
											type="checkbox"
											name={'states'}
											id={htmlID}
											title={state.content}
											value={state.value}
											checked={state.checked}
										/>
										<label htmlFor={htmlID}>
											{state.content}
										</label>
									</div>
								);
							})}
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
