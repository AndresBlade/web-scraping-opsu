import { ChangeEvent, useState } from 'react';

export const useForm = <Form>(initialValue: Form) => {
	const [formState, setFormState] = useState<Form>(initialValue);

	const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;
		setFormState({ ...formState, [name]: value });
	};

	const onSelectChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
		const { name, selectedOptions } = target;
		setFormState({
			...formState,
			[name]: selectedOptions[0]?.value,
		});
	};

	return {
		formState,
		onInputChange,
		setFormState,
		onSelectChange,
		...formState,
	};
};
