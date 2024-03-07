import { Career } from './Career';

export interface Location {
	id: number;
	name: string;
	address: string;
	link: string;
	university_id: number;
	career: Career[];
}
