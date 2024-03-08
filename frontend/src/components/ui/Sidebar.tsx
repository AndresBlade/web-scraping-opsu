import statesPng from '../../assets/states.png';
import managementPng from '../../assets/management.png';
import jsonManagementTypes from '../../data/management.json';
import { ChangeEvent } from 'react';

interface Props {
	managementType: string;
	states: { value: string; content: string; checked: boolean }[];
	onRadioChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar = ({
	managementType,
	states,
	onRadioChange,
	onCheckboxChange,
}: Props) => {
	return (
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
								<div className="sidebar__list-li" key={index}>
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
								<div className="sidebar__list-li" key={index}>
									<input
										onChange={onCheckboxChange}
										className="sidebar__li-item"
										type="checkbox"
										name={'states'}
										id={htmlID}
										title={state.content}
										value={state.value}
										checked={state.checked}
										disabled
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
	);
};

export default Sidebar;
