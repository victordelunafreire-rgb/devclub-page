import linustorvaldPhoto from '../../assets/mentors/linus-torvald.webp';
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
];
