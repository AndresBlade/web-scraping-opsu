import { SearchOption } from '../types/SearchOption';

export interface SearchForm {
	states: { value: string; content: string; checked: boolean }[];
	managementType: null | string;
	searchOption: SearchOption;
	searchName: '';
}
