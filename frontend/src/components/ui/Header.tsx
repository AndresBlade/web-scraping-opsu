import { FaSearch } from 'react-icons/fa';
import { useForm } from '../../hooks/useForm';

type SearchOption = 'Universidad' | 'Carrera';

export const Header = () => {
	const { searchOption, name, onSelectChange, onInputChange } = useForm<{
		searchOption: SearchOption;
		name: string;
	}>({ searchOption: 'Universidad', name: '' });

	return (
		<header className="header">
			<nav className="header__nav">
				<ul className="header__ul">
					<li className="header__search-bar search-bar">
						<input
							type="text"
							name="name"
							id="name"
							placeholder={`Nombre de la ${searchOption}`}
							value={name}
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
