import alberteinsteinPhoto from '../../assets/mentors/albert-einstein.jpg';
import batmanPhoto from '../../assets/mentors/batman.jpg';
import linustorvaldPhoto from '../../assets/mentors/linus-torvald.webp';
import michaeljordanPhoto from '../../assets/mentors/michael-jordan.webp';
import nikolateslaPhoto from '../../assets/mentors/nikola-tesla.jpg';
import rodolfoPhoto from '../../assets/mentors/rodolfo-mori.png';
import shakiraPhoto from '../../assets/mentors/shakira-backend.jpg';
import stevejobsPhoto from '../../assets/mentors/steve-jobs.webp';

export const mentors = [
	{
		id: 0,
		name: 'Rodolfo Mori',
		role: 'Fundador & Mentor Full Stack',
		photo: rodolfoPhoto,
		stats: [
			{ label: 'Front-end', value: 99 },
			{ label: 'Back-end', value: 88 },
			{ label: 'Sangue no zóio', value: 100 },
		],
	},
	{
		id: 1,
		name: 'Linus Torvalds',
		role: 'Mentor Full Stack',
		photo: linustorvaldPhoto,
		stats: [
			{ label: 'Front-end', value: 45 },
			{ label: 'Back-end', value: 100 },
			{ label: 'Paciência', value: 15 },
		],
	},
	{
		id: 2,
		name: 'Shakira',
		role: 'Mentora Back-end',
		photo: shakiraPhoto,
		stats: [
			{ label: 'Back-end', value: 92 },
			{ label: "Hips Don't Lie", value: 100 },
			{ label: 'Ranking FIFA', value: 100 },
		],
	},
	{
		id: 3,
		name: 'Steve Jobs',
		role: 'Mentor Front-end',
		photo: stevejobsPhoto,
		stats: [
			{ label: 'Front-end', value: 90 },
			{ label: 'UI/UX', value: 100 },
			{ label: 'Carisma no palco', value: 100 },
		],
	},
	{
		id: 4,
		name: 'Albert Einstein',
		role: 'Mentor de Algoritmos & Lógica',
		photo: alberteinsteinPhoto,
		stats: [
			{ label: 'Lógica', value: 98 },
			{ label: 'Estrutura de Dados', value: 85 },
			{ label: 'Explica de forma simples', value: 15 },
		],
	},
	{
		id: 5,
		name: 'Michael Jordan',
		role: 'Mentor de Performance',
		photo: michaeljordanPhoto,
		stats: [
			{ label: 'Otimização', value: 95 },
			{ label: 'Clutch em Sprint Review', value: 90 },
			{ label: 'Trabalho em equipe', value: 20 },
		],
	},
	{
		id: 6,
		name: 'Nikola Tesla',
		role: 'Mentor de Infraestrutura',
		photo: nikolateslaPhoto,
		stats: [
			{ label: 'Arquitetura de Sistemas', value: 97 },
			{ label: 'Escalabilidade', value: 88 },
			{ label: 'Gestão Financeira', value: 10 },
		],
	},
	{
		id: 7,
		name: 'Batman',
		role: 'Mentor de Debugging',
		photo: batmanPhoto,
		stats: [
			{ label: 'Encontra bug em produção', value: 99 },
			{ label: 'Análise forense de stack trace', value: 92 },
			{ label: 'Superpoderes', value: 0 },
		],
	},
];
