import { Career } from '../../interfaces/Career';

interface CareerProps {
	career: Career;
}

export const CareerRow = ({ career }: CareerProps) => {
	return (
		<div className="career">
			<div className="career__general-info">
				<p className="career__name">{career.name}</p>

				{+career.referential_index.index === 0 ? (
					<p className="career__no-index">No disponible</p>
				) : (
					<div className="career__index-container">
						<span className="career__index-year bold">
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

			<div className="career__graduate-profile graduate-profile">
				<p>{career.description}</p>
			</div>
		</div>
	);
};
