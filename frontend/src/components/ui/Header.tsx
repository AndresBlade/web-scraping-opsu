import { FaSearch } from 'react-icons/fa';
import { ChangeEvent } from 'react';
import { SearchOption } from '../../types/SearchOption';
import { University } from '../../interfaces/University';

interface Props {
	searchName: string;
	searchOption: SearchOption;
	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	setClickedUniversity: React.Dispatch<
		React.SetStateAction<null | University>
	>;
}

export const Header = ({
	onInputChange,
	onSelectChange,
	searchName,
	searchOption,
	setClickedUniversity,
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
							placeholder={`Nombre de la ${searchOption}`}
							value={searchName}
							onFocus={() => setClickedUniversity(null)}
							onChange={onInputChange}
							className="search-bar__input"
						/>
						<select
							name="searchOption"
							id="searchOption"
							className="search-bar__select-type-query"
							onChange={onSelectChange}
						>
							<option value="Universidad">Universidad</option>
							<option value="Carrera">Carrera</option>
						</select>
						<button
							type="submit"
							className="search-bar__submit-button"
						>
							<FaSearch />
						</button>
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
