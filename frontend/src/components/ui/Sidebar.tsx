import React, { useState } from 'react';
import states from '../../data/states.json';
import statesPng from '../../assets/states.png';
import managementPng from '../../assets/management.png';
import managementTypes from '../../data/management.json';
const Sidebar = () => {
	const [stateSelect, setStateSelect] = useState(
		Object.fromEntries(states.map(state => [state.name, false]))
	);

	console.log(stateSelect);
	const handleOnCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setStateSelect({
			...stateSelect,
			[e.target.value]: e.target.checked,
		});
	};

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
								return (
									<div
										className="sidebar__list-li"
										key={index}
									>
										<input
											onChange={handleOnCheckbox}
											className="sidebar__li-item"
											type="checkbox"
											name={state.name}
											id={state.id}
											title={state.name}
											value={state.name}
										/>
										<label htmlFor={state.id}>
											{state.name}
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
