import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { LuCheck } from 'react-icons/lu';
import { standardTheme } from '../../styles/standard.js';
import { AmbientParticles } from '../AmbientParticles/AmbientParticles';
import { programs } from './Programs.data';
import {
	Card,
	CardDescription,
	CardReveal,
	CardStack,
	CardTitle,
	CheckBadge,
	IconGlyph,
	IconWrapper,
	ParticlesArea,
	ProgramsContainer,
	Title,
} from './Programs.styles';

gsap.registerPlugin(ScrollTrigger);

const visiblePrograms = programs.slice(0, 5);

const CARD_EXPANDED_HEIGHT = 150;
const CARD_EXPANDED_PADDING = 28;
const CARD_COLLAPSED_HEIGHT = 60;
const CARD_COLLAPSED_PADDING = 14;
const CARD_ACTIVE_GAP = 20;
const CARD_GROUPED_GAP = 2;

export function Programs() {
	const containerRef = useRef(null);
	const revealRefs = useRef([]);
	const boxRefs = useRef([]);
	const iconRefs = useRef([]);
	const checkRefs = useRef([]);
	const descriptionRefs = useRef([]);

	useGSAP(
		() => {
			const reveals = revealRefs.current;
			const boxes = boxRefs.current;
			const icons = iconRefs.current;
			const checks = checkRefs.current;
			const descriptions = descriptionRefs.current;
			const last = reveals.length - 1;

			ScrollTrigger.matchMedia({
				'(min-width: 796px)': () => {
					gsap.set(reveals, { opacity: 0, y: 60, marginTop: CARD_ACTIVE_GAP });
					gsap.set(reveals[0], { marginTop: 0 });
					gsap.set(boxes, {
						height: CARD_EXPANDED_HEIGHT,
						paddingTop: CARD_EXPANDED_PADDING,
						paddingBottom: CARD_EXPANDED_PADDING,
					});
					gsap.set(checks, { opacity: 0 });

					const collapse = (tl, index, position) => {
						tl.to(
							boxes[index],
							{
								height: CARD_COLLAPSED_HEIGHT,
								paddingTop: CARD_COLLAPSED_PADDING,
								paddingBottom: CARD_COLLAPSED_PADDING,
								duration: 1,
							},
							position,
						)
							.to(icons[index], { opacity: 0, duration: 0.6 }, position)
							.to(checks[index], { opacity: 1, duration: 0.6 }, position)
							.to(descriptions[index], { opacity: 0, duration: 0.6 }, position)
							.to(
								reveals[index],
								{ marginTop: CARD_GROUPED_GAP, duration: 1 },
								position,
							);
					};

					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: containerRef.current,
							start: 'top top',
							end: () => `+=${window.innerHeight * (reveals.length + 1)}`,
							scrub: 1,
							pin: true,
							invalidateOnRefresh: true,
						},
					});

					tl.to(reveals[0], { opacity: 1, y: 0, duration: 1 });

					for (let i = 1; i <= last; i++) {
						const prev = i - 1;
						tl.to(reveals[i], { opacity: 1, y: 0, duration: 1 }, '+=0.1');
						collapse(tl, prev, '<');
					}

					tl.addLabel('finalCollapse', '+=0.1');
					collapse(tl, last, 'finalCollapse');
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<ProgramsContainer id="formacoes" ref={containerRef}>
			<ParticlesArea>
				<AmbientParticles />
			</ParticlesArea>

			<Title>Formações</Title>

			<CardStack>
				{visiblePrograms.map((program, index) => (
					<CardReveal
						key={program.id}
						ref={(el) => {
							revealRefs.current[index] = el;
						}}
					>
						<Card
							ref={(el) => {
								boxRefs.current[index] = el;
							}}
						>
							<IconWrapper>
								<IconGlyph
									ref={(el) => {
										iconRefs.current[index] = el;
									}}
								>
									<program.icon size={22} color={standardTheme.primary} />
								</IconGlyph>
								<IconGlyph
									ref={(el) => {
										checkRefs.current[index] = el;
									}}
								>
									<CheckBadge>
										<LuCheck size={16} color={standardTheme.background} />
									</CheckBadge>
								</IconGlyph>
							</IconWrapper>

							<CardTitle>{program.title}</CardTitle>
							<CardDescription
								ref={(el) => {
									descriptionRefs.current[index] = el;
								}}
							>
								{program.description}
							</CardDescription>
						</Card>
					</CardReveal>
				))}
			</CardStack>
		</ProgramsContainer>
	);
}
