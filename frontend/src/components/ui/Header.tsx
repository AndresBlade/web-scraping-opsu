import Logo from '../../assets/logo.png';

export const Header = () => {
	return (
		<header className="header">
			<nav className="header__nav">
				<ul className="header__ul">
					<li className="header__li">
						<a
							href="https://www.iujobarquisimeto.edu.ve/"
							target="_blank"
							className="header__logo-link"
						>
							<img
								src={Logo}
								alt="Logo del Instituto Universitario 'Jesús Obrero' Extensión Barquisimeto"
							/>
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};
