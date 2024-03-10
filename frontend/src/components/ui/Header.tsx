import { ChangeEvent } from 'react';
import { University } from '../../interfaces/University';
import { Location } from '../../interfaces/Location';

interface Props {
	searchName: string;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	setClickedUniversity: React.Dispatch<
		React.SetStateAction<null | University>
	>;
	setClickedLocation: React.Dispatch<
		React.SetStateAction<null | {
			university: University;
			location: Location;
		}>
	>;
}

export const Header = ({
	onInputChange,
	searchName,
	setClickedUniversity,
	setClickedLocation,
}: Props) => {
	return (
		<header className="header">
			<nav className="header__nav">
				<ul className="header__ul">
					<li className="header__search-bar search-bar">
						<input
							type="text"
							name="searchName"
							id="name"
							placeholder={`Nombre de la universidad, localidad, carrera...`}
							value={searchName}
							autoComplete="off"
							onFocus={() => {
								setClickedUniversity(null);
								setClickedLocation(null);
							}}
							onChange={e => {
								e.target.value = e.target.value
									.toUpperCase()
									.replace(/Á/gi, 'A')
									.replace(/É/gi, 'E')
									.replace(/Í/gi, 'I')
									.replace(/Ó/gi, 'O')
									.replace(/Ú/gi, 'U');
								onInputChange(e);
							}}
							className="search-bar__input"
						/>
					</li>
					{/* <li className="header__logo logo">
						<a
							href="https://www.iujobarquisimeto.edu.ve/"
							target="_blank"
							className="logo-link"
						>
							<img
								src={Logo}
								alt="Logo del Instituto Universitario 'Jesús Obrero' Extensión Barquisimeto"
							/>
						</a>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};
