export interface University {
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
