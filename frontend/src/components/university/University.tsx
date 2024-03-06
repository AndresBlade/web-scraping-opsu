import { University } from '../../interfaces/University';

interface UniversityProps {
	university: University;
}

export const UniversityPage = ({ university }: UniversityProps) => {
	return (
		<div className="university">
			<a className="university__name" href={university.link}>
				{university.name}
			</a>
			<div className="university__locations">
				{university.location.map(location => (
					<div className="location-grid-element">
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
