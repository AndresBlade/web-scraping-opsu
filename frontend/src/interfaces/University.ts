import { Location } from './Location';

export interface University {
	id: number;
	name: string;
	link: string;
	management: string;
	location: Location[];
	image_path: string;
}
