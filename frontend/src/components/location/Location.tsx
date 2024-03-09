import { FaExternalLinkAlt } from 'react-icons/fa';
import { Location } from '../../interfaces/Location';
import { University } from '../../interfaces/University';

interface LocationProps {
	university: University;
	location: Location;
	setClickedLocation: React.Dispatch<
		React.SetStateAction<null | {
			university: University;
			location: Location;
		}>
	>;
	setClickedUniversity: React.Dispatch<
		React.SetStateAction<null | University>
	>;
}

export const LocationPage = ({
	university,
	location,
	setClickedLocation,
	setClickedUniversity,
}: LocationProps) => {
	return (
		<div className="location universities-container">
			<a className="location__name" href={location.link}>
				{location.name}{' '}
				<FaExternalLinkAlt className="location__external-link-icon" />
			</a>
			<div className="location__general-info">
				<p className="location__university">
					<span className="bold">Perteneciente a: </span>
					<span
						className="location__university-name"
						onClick={() => {
							setClickedLocation(null);
							setClickedUniversity(university);
						}}
					>
						{university.name
							.replace(/\(GESTIÓN PÚBLICA\)/gi, '')
							.replace(/\(GESTIÓN PRIVADA\)/gi, '')}
					</span>
				</p>
				{location.career.length ? (
					<p className="location__number-of-careers">
						<span className="bold">
							Número de carreras impartidas:
						</span>{' '}
						{location.career.length}
					</p>
				) : (
					''
				)}
				<p className="location__address">
					<span className="bold">Dirección:</span> {location.address}
				</p>
			</div>
			{location.career.length && (
				<div className="location__careers careers">
					<div className="careers__header">
						<p className="careers__name-header">
							Nombre de la carrera
						</p>
						<p className="careers__index-header">
							Índice Referencial
						</p>
						<p className="careers__title-header">Título</p>
					</div>
					{location.career.map((career, index) => (
						<div className="career" key={index}>
							<p className="career__name">{career.name}</p>

							{+career.referential_index.index === 0 ? (
								<p className="career__no-index">
									No disponible
								</p>
							) : (
								<div className="career__index-container">
									<span className="career__index-year">
										{career.referential_index.index}
									</span>
									{' en el año '}
									<span className="career__index-value">
										{career.referential_index.year}
									</span>
								</div>
							)}
							<p className="career__title">
								{career.title || 'No disponible'}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
