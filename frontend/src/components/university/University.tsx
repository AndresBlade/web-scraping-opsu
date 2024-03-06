interface University {
	id: number;
	name: string;
	link: string;
	management: string;
	location: Location[];
}
interface Location {
	id: number;
	name: string;
	address: string;
	link: string;
	university_id: number;
	career: Career[];
}

interface Career {
	id: number;
	name: string;
	link: string;
	title: string;
	description: string;
	location_id: number;
	referential_index: ReferentialIndex;
}

interface ReferentialIndex {
	career_id: number;
	year: number;
	index: string;
}

interface UniversityProps {
	university: University;
}

export const University = ({ university }: UniversityProps) => {
	return (
		<div className="university">
			<a className="university__name" href={university.link}>
				{university.name}
			</a>
			<div className="university__locations">
				{university.location.map(location => (
					<a href={location.link} className="location-grid-element">
						<h2 className="location-grid-element__name">
							{location.name}
						</h2>
						<p className="location-grid-element__number-of-careers">
							<span className="location-grid-element__number-of-careers-title">
								Carreras:
							</span>
							{location.career.length}
						</p>
					</a>
				))}
			</div>
		</div>
	);
};
