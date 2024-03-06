import jsonStates from '../../data/states.json';
import statesPng from '../../assets/states.png';
import managementPng from '../../assets/management.png';
import managementTypes from '../../data/management.json';
import { useForm } from '../../hooks/useForm';
const Sidebar = () => {
	const { states, onCheckboxChange } = useForm({
		states: jsonStates.map(state => ({
			value: state.id,
			content: state.name,
			checked: false,
		})),
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
							{managementTypes.map((management, index) => {
								return (
									<div
										className="sidebar__list-li"
										key={index}
									>
										<input
											type="radio"
											name="gestion"
											id={management.id}
											className="sidebar__li-item"
											title={management.name}
											value={management.name}
										/>
										<label htmlFor={management.id}>
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
