import React from 'react';
import jsonUniversities from '../../data/universities.json';
import univeristyPNG from '../../assets/university.png';
import { University } from '../../interfaces/University';

interface Form {
	searchName: string;
	states: { value: string; content: string; checked: boolean }[];
	managementType: null | string;
	setClickedUniversity: React.Dispatch<
		React.SetStateAction<null | University>
	>;
}

const Universities = ({
	searchName,
	managementType,
	setClickedUniversity,
}: Form) => {
	return (
		<div className="universities-container">
			{jsonUniversities
				.filter(university => {
					const universityName = university.name
						.replace(/Á/gi, 'A')
						.replace(/É/gi, 'E')
						.replace(/Í/gi, 'I')
						.replace(/Ó/gi, 'O')
						.replace(/Ú/gi, 'U');

					return (
						(universityName.includes(searchName) ||
							university.location.some(location => {
								const locationName = location.name
									.replace(/Á/gi, 'A')
									.replace(/É/gi, 'E')
									.replace(/Í/gi, 'I')
									.replace(/Ó/gi, 'O')
									.replace(/Ú/gi, 'U');
								return locationName.includes(searchName);
							}) ||
							university.location.some(location =>
								location.career.some(career => {
									const careerName = career.name
										.replace(/Á/gi, 'A')
										.replace(/É/gi, 'E')
										.replace(/Í/gi, 'I')
										.replace(/Ó/gi, 'O')
										.replace(/Ú/gi, 'U');
									return careerName.includes(searchName);
								})
							)) &&
						(managementType === '3' ||
							(university.management.toUpperCase() === 'PUBLICA'
								? '1'
								: '2') === managementType)
					);
				})
				.map(university => {
					// code to render each university
					return (
						<div
							key={university.id}
							onClick={() => setClickedUniversity(university)}
							className="universities-card"
						>
							<div className="universities-card__image">
								<img
									src={university.image_path ?? univeristyPNG}
									alt="university "
									className="universities-card__image_png"
								/>
							</div>
							<div className="universities-card__info">
								<h2>
									<span>Nombre de la universidad:</span>{' '}
									{university.name
										.replace(/\(GESTIÓN PÚBLICA\)/gi, '')
										.replace(/\(GESTIÓN PRIVADA\)/gi, '')
										.replace(/PRIVADA/gi, '')}
								</h2>
								<h2>
									<span>Tipo de gestion:</span>{' '}
									{university.management}
								</h2>
								{/* {university.location.map((location)=>{
                                return(
                                    <div key={location.id} className='universities-card__location'>
                                    <h2>{location.name}</h2>
                                    </div>
                                )
                            })} */}
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Universities;
