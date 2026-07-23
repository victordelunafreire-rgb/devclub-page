import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { standardTheme } from '../../styles/standard.js';
import { AmbientParticles } from '../AmbientParticles/AmbientParticles';
import { programs } from './Programs.data';
import {
	Card,
	CardDescription,
	CardTitle,
	IconWrapper,
	ProgramsContainer,
	Title,
	Track,
} from './Programs.styles';

gsap.registerPlugin(ScrollTrigger);

export function Programs() {
	const containerRef = useRef(null);
	const trackRef = useRef(null);

	useGSAP(
		() => {
			const track = trackRef.current;

			ScrollTrigger.matchMedia({
				'(min-width: 796px)': () => {
					const scrollDistance = track.scrollWidth - window.innerWidth;

					gsap.to(track, {
						x: -scrollDistance,
						ease: 'none',
						scrollTrigger: {
							trigger: containerRef.current,
							start: 'top top',
							end: () => `+=${scrollDistance * 3}`,
							pin: true,
							scrub: 1,
							invalidateOnRefresh: true,
						},
					});
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<ProgramsContainer id="formacoes" ref={containerRef}>
			<AmbientParticles />

			<Title>Formações</Title>

			<Track ref={trackRef}>
				{programs.map((program) => (
					<Card key={program.id}>
						<IconWrapper>
							<program.icon size={32} color={standardTheme.primary} />
						</IconWrapper>

						<CardTitle>{program.title}</CardTitle>
						<CardDescription>{program.description}</CardDescription>
					</Card>
				))}
			</Track>
		</ProgramsContainer>
	);
}
