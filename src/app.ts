import puppeteer, { Page } from 'puppeteer';
import fsp from 'node:fs/promises';

interface University {
	name: string;
	link: string;
	locations: {
		name: string;
		address: string;
		link: string;
		careers: {
			name: string;
			link: string;
			title: string;
			description: string;
			referentialIndex: {
				year: number;
				index: number;
			};
		}[];
	}[];
}

const saveUniversities = async (universities: University[]) => {
	let universitiesFileContent = '';

	universities.forEach(university => {
		universitiesFileContent += `Nombre de la universidad: ${university.name}\n`;
		universitiesFileContent += `Link de la universidad: ${university.link}\n`;
		universitiesFileContent += `	Localidades de ${university.name}\n`;
		universitiesFileContent += `________________________________________________\n`;

		university.locations?.forEach((location, index) => {
			universitiesFileContent += `	Nombre de la localidad: ${location.name}\n`;
			universitiesFileContent += `	Link de la localidad: ${location.link}\n`;
			universitiesFileContent += `	Dirección de la localidad: ${location.address}\n`;
			universitiesFileContent += `		Carreras que ofrece la localidad ${location.name}\n`;
			universitiesFileContent += `		=====================================================\n`;

			if (university.locations) {
				university.locations[index]?.careers.forEach(career => {
					universitiesFileContent += `			Nombre de la carrera: ${career.name}\n`;
					universitiesFileContent += `			Link de la carrera: ${career.link}\n`;
					universitiesFileContent += `			descripción de la carrera: ${career.description}\n`;
					universitiesFileContent += `			Índice referencial de la carrera: ${career.referentialIndex.index} (${career.referentialIndex.year})\n`;
				});
			}

			if (!university.locations)
				universitiesFileContent += `				NO SE ENCONTRARON CARRERAS\n`;

			universitiesFileContent += `		++++++++++++++++++++++++++++++++++++++++++++++++++++++\n`;
		});
	});
	await fsp.mkdir('./output', { recursive: true });
	await fsp.writeFile('./output/universidades.txt', universitiesFileContent);
};

const getUniversitiesGeneralInfo = async (page: Page) =>
	await page.evaluate(() => {
		return Array.from(
			document.querySelectorAll<HTMLAnchorElement>('[href*=detalle-ieu]')
		)
			.filter(
				(university, index, universitiesHref) =>
					universitiesHref.findIndex(
						({ href }) => href === university.href
					) === index
			)
			.map(university => ({
				name: university.textContent || '',
				link: university.href,
			}));
	});

const getCareer = async (page: Page) =>
	await page.evaluate(() => {
		const careerTableCells = document.querySelectorAll('dd');
		const name = careerTableCells[5]?.textContent || '';
		const title = careerTableCells[9]?.textContent || '';
		const description = careerTableCells[7]?.textContent || '';

		const referentialIndexTableCells = document.querySelectorAll('td');

		const referentialIndex = {
			year: +(referentialIndexTableCells[0]?.textContent || 0),
			index: +(referentialIndexTableCells[1]?.textContent || 0),
		};

		return {
			name,
			link: document.location.href,
			title,
			description,
			referentialIndex,
		};
	});

const getAllUniversityLocations = async (page: Page) =>
	await page.evaluate(() => {
		return Array.from(
			document.querySelectorAll<HTMLAnchorElement>(
				'[href*=detalle-localidad]'
			)
		).map(location => location.href);
	});

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://loeu.opsu.gob.ve/ieu/');

	const stateTextarea = await page.waitForSelector(
		'textarea[aria-describedby=select2-id_estado-container]'
	);

	await stateTextarea?.click();

	const stateList = await page.waitForSelector('#select2-id_estado-results');

	await stateList?.hover();

	await stateList?.evaluate(element => {
		element.scroll({ top: 800 });
	});

	await new Promise(resolve => {
		setTimeout(() => resolve(true), 3000);
	});

	const stateToSelect = await stateList?.evaluateHandle(element => {
		element.scroll({ top: 800 });

		const options: HTMLOptionElement[] = Array.from(
			element.querySelectorAll('.select2-results__option')
		);
		const stateToSelect =
			options.find(option => option.textContent === 'LARA') ||
			new HTMLOptionElement();

		return stateToSelect;
	});

	await stateToSelect?.click();

	await Promise.all([
		page.waitForNavigation(),
		page.click('button[type=submit]'),
	]);

	const universitiesGeneralInfo = await getUniversitiesGeneralInfo(page);

	const locationsLinksPrincipalPage = await page.evaluate(() => {
		return Array.from(
			document.querySelectorAll<HTMLAnchorElement>(
				'[href*=detalle-localidad]'
			)
		).map(location => location.href);
	});

	const universitiesLocations: {
		name: string;
		address: string;
		link: string;
		careers: {
			name: string;
			link: string;
			title: string;
			description: string;
			referentialIndex: {
				year: number;
				index: number;
			};
		}[];
	}[][] = [];

	for (let universityGeneralInfo of universitiesGeneralInfo) {
		const { link: universityLink } = universityGeneralInfo;
		await page.goto(universityLink, { waitUntil: 'load' });

		const locationsLinksUnfiltered = await getAllUniversityLocations(page);

		const locationsLinks = locationsLinksUnfiltered.filter(locationLink =>
			locationsLinksPrincipalPage.some(
				locationPrincipalPageLink =>
					locationPrincipalPageLink === locationLink
			)
		);

		const universityLocations: {
			name: string;
			address: string;
			link: string;
			careers: {
				name: string;
				link: string;
				title: string;
				description: string;
				referentialIndex: {
					year: number;
					index: number;
				};
			}[];
		}[] = [];

		for (let locationLink of locationsLinks) {
			await page.goto(locationLink);

			const careersInfoFromLocation = await page.evaluate(() => {
				const locationTableCells = document.querySelectorAll('dd');

				const name = locationTableCells[3]?.textContent || '';
				const address = locationTableCells[5]?.textContent || '';

				const careersLinks = Array.from(
					document.querySelectorAll<HTMLAnchorElement>(
						'[href*=detalle-programa]'
					)
				).map(career => career.href);

				return {
					careersLinks,
					name,
					address,
				};
			});

			const { name, address, careersLinks } = careersInfoFromLocation;

			const careers: {
				name: string;
				link: string;
				title: string;
				description: string;
				referentialIndex: {
					year: number;
					index: number;
				};
			}[] = [];

			if (careersLinks.length) {
				for (let careerLink of careersLinks) {
					await page.goto(careerLink);
					const career = await getCareer(page);
					careers.push(career);
				}
			}

			universityLocations.push({
				name,
				address,
				link: locationLink,
				careers,
			});
		}

		universitiesLocations.push(universityLocations);
	}

	const universities: University[] = universitiesGeneralInfo.map(
		(universityGeneralInfo, index) => ({
			name: universityGeneralInfo.name,
			link: universityGeneralInfo.link,
			locations: universitiesLocations[index] || [],
		})
	);

	console.log(universities);

	await saveUniversities(universities);

	await browser.close();
})();
