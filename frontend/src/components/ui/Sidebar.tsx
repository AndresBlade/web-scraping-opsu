import React, { useState } from 'react';
import estados from '../../data/estados.json';
import estadosPng from '../../assets/estados.png';
import gestionPng from '../../assets/gestion.png';
import gestion from '../../data/gestion.json';
const Sidebar = () => {
	const [stateSelect, setStateSelect] = useState(
		Object.fromEntries(estados.map(estado => [estado.nombre, false]))
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
						<img src={gestionPng} alt="gestion" />
						<h2>Gestion</h2>
					</div>
					<ul className="principal">
						<li className="sidebar__list">
							{gestion.map((gestion, index) => {
								return (
									<div
										className="sidebar__list-li"
										key={index}
									>
										<input
											type="radio"
											name="gestion"
											id={gestion.id}
											className="sidebar__li-item"
											title={gestion.nombre}
											value={gestion.nombre}
										/>
										<label htmlFor={gestion.id}>
											{gestion.nombre}
										</label>
									</div>
								);
							})}
						</li>
					</ul>
				</div>
				<div className="sidebar__hover sidebar__hover-vh">
					<div className="sidebar__flex">
						<img src={estadosPng} alt="estados" />
						<h2>Estados</h2>
					</div>
					<ul className="principal">
						<li className="sidebar__list">
							{estados.map((estado, index) => {
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
											name={estado.nombre}
											id={estado.id}
											title={estado.nombre}
											value={estado.nombre}
										/>
										<label htmlFor={estado.id}>
											{estado.nombre}
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
