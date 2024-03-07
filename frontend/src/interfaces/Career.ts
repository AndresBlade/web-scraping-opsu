import { ReferentialIndex } from './ReferentialIndex';

export interface Career {
	id: number;
	name: string;
	link: string;
	title: string;
	description: string;
	location_id: number;
	referential_index: ReferentialIndex;
}
