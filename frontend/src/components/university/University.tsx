import { Location } from '../../interfaces/Location';
import { University } from '../../interfaces/University';

interface UniversityProps {
	university: University;
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

export const UniversityPage = ({
	university,
	setClickedLocation,
	setClickedUniversity,
}: UniversityProps) => {
	return (
		<div className="university">
			<h1 className="university__name">
				{university.name
					.replace(/\(GESTIÓN PÚBLICA\)/gi, '')
					.replace(/\(GESTIÓN PRIVADA\)/gi, '')
					.replace(/PRIVADA/gi, '')}
			</h1>
			<img
				src={university.image_path}
				alt={`logo de ${university.name}`}
				className="university__logo"
			/>
			<div className="university__locations">
				{university.location.map((location, index) => (
					<div
						key={index}
						className="location-grid-element"
						onClick={() => {
							setClickedUniversity(null);
							setClickedLocation({ university, location });
						}}
					>
						<h2 className="location-grid-element__name">
							{location.name}
						</h2>
						<p className="location-grid-element__number-of-careers">
							{`${location.career.length} carrera${
								location.career.length === 1 ? '' : 's'
							}`}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
