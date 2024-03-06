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

	const onCheckboxChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = target;
		setFormState(formState => {
			const typedFormState = formState as Record<string, unknown>;

			const checkboxValues = typedFormState[name] as {
				value: unknown;
				checked: boolean;
				content: string;
			}[];

			const checkboxIndex = checkboxValues.findIndex(
				checkbox => checkbox.value === value
			);

			checkboxValues[checkboxIndex] = {
				value: value,
				content: checkboxValues[checkboxIndex].content,
				checked,
			};
			return {
				...formState,
				[name]: checkboxValues,
			};
		});
	};

	const onRadioChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;

		setFormState({ ...formState, [name]: value });
	};

	return {
		formState,
		onInputChange,
		setFormState,
		onSelectChange,
		onCheckboxChange,
		onRadioChange,
		...formState,
	};
};
