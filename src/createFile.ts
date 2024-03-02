import { PrismaClient } from '@prisma/client';
import fsp from 'node:fs/promises';

(async () => {
	const prisma = new PrismaClient();
	let universitiesDB = await prisma.university.findMany({
		include: {
			location: {
				include: { career: { include: { referential_index: true } } },
			},
		},
	});

	const universities = universitiesDB.map(university =>
		university.location.map(location =>
			location.career.map(career => ({
				...career,
				name: career.name.trim(),
			}))
		)
	);

	// for (let university of universities) {
	// 	let universityFileContent = '';
	// 	universityFileContent += `Nombre de la universidad: ${university.name}\n`;
	// 	universityFileContent += `Link de la universidad: ${university.link}\n`;
	// 	universityFileContent += `	Localidades de ${university.name}\n`;
	// 	universityFileContent += `________________________________________________\n`;

	// 	university.location.forEach(async (location, index) => {
	// 		universityFileContent += `	Nombre de la localidad: ${location.name}\n`;
	// 		universityFileContent += `	Link de la localidad: ${location.link}\n`;
	// 		universityFileContent += `	Dirección de la localidad: ${location.address}\n`;
	// 		universityFileContent += `		Carreras que ofrece la localidad ${location.name}\n`;
	// 		universityFileContent += `		=====================================================\n`;

	// 		if (university.location.length) {
	// 			university.location[index]?.career.forEach(career => {
	// 				universityFileContent += `			Nombre de la carrera: ${career.name}\n`;
	// 				universityFileContent += `			Link de la carrera: ${career.link}\n`;
	// 				// universityFileContent += `			descripción de la carrera: ${career.description}\n`;
	// 				universityFileContent += `			Índice referencial de la carrera: ${career.referential_index?.index} (${career.referential_index?.year})\n`;
	// 			});
	// 		}

	// 		if (!university.location.length)
	// 			universityFileContent += `				NO SE ENCONTRARON CARRERAS\n`;

	// 		universityFileContent += `		++++++++++++++++++++++++++++++++++++++++++++++++++++++\n`;

	// 		const path = `./output/universidades/${university.management}`;

	// 		await fsp.mkdir(path, { recursive: true });
	// 		await fsp.writeFile(
	// 			`${path}/${university.id}.txt`,
	// 			universityFileContent
	// 		);
	// 	});
	// }

	await fsp.mkdir('./output/json/', { recursive: true });

	console.log(universities.length);

	await fsp.writeFile(
		'./output/json/universities.json',
		JSON.stringify(universities)
			.replace(/\\n/g, '')
			.replace(/o\\y/g, 'y/o')
			.replace(/\\/g, '')
	);
})();
