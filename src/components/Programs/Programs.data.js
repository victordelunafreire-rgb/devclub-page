import {
	LuChartBar,
	LuInfinity,
	LuLayers,
	LuSmartphone,
	LuSparkles,
} from 'react-icons/lu';
import { SiN8N, SiNodedotjs, SiReact } from 'react-icons/si';

export const programs = [
	{
		id: 1,
		title: 'Front-end',
		description: 'HTML, CSS, JavaScript e React do zero ao avançado.',
		icon: SiReact,
	},
	{
		id: 2,
		title: 'Back-end',
		description: 'Node.js, banco de dados e APIs robustas.',
		icon: SiNodedotjs,
	},
	{
		id: 3,
		title: 'Full Stack',
		description: 'A jornada completa, do front ao back, num só lugar.',
		icon: LuLayers,
	},
	{
		id: 4,
		title: 'Mobile',
		description: 'React Native para levar seu código para o bolso das pessoas.',
		icon: LuSmartphone,
	},
	{
		id: 5,
		title: 'N8N',
		description: 'Automação e agentes de IA sem escrever uma linha de código.',
		icon: SiN8N,
	},
	{
		id: 6,
		title: 'IA para Devs',
		description:
			'Use inteligência artificial para programar mais rápido e melhor.',
		icon: LuSparkles,
	},
	{
		id: 7,
		title: 'Análise de Dados',
		description: 'Transforme dados brutos em decisões inteligentes.',
		icon: LuChartBar,
	},
	{
		id: 8,
		title: 'DevOps',
		description: 'Deploy, CI/CD e infraestrutura na palma da sua mão.',
		icon: LuInfinity,
	},
];
