import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { students } from './Students.data';
import {
	Caption,
	CardFrame,
	DataRow,
	Name,
	Photo,
	SpiralCard,
	SpiralLayer,
	Stamp,
	StudentsContainer,
	Title,
} from './Students.styles';

// The cards circle the page's central *vertical* axis while rising: they swing
// around from behind, cross the front, and continue up. The orbit axis has to
// point at the camera-facing vertical (x across / z depth), not lie flat in the
// screen plane — an axis inside the screen plane only produces a sideways
// wobble that reads as a slide, never as a spiral.
const ORBIT_RADIUS = 540;
const RISE_FROM = 820;
const RISE_TO = -820;
// Tuned by measuring on-screen speed rather than by feel: cards crossing the
// front peak around ~120px/s here, slow enough to read name + formação as they
// pass. The long full cycle is not felt, since the cards are phase-staggered.
const TRAVEL_DURATION = 70;
const CARD_COUNT = 18;

// Full revolutions around the axis over one rise.
const SPIRAL_TURNS = 2;

const SCALE_START = 0.72;
const SCALE_END = 1;
const FADE_IN = 0.1;
const FADE_OUT = 0.88;

// How much a card facing away from the camera dims, so the ones looping behind
// the axis read as genuinely further back.
const DEPTH_DIM = 0.4;

// Deterministic per-card variation (no Math.random, so the layout is stable
// across re-renders).
const spiralCards = Array.from({ length: CARD_COUNT }, (_, index) => {
	const width = 124 + ((index * 53) % 80);

	return {
		student: students[index % students.length],
		radius: ORBIT_RADIUS + (((index * 137) % 180) - 90),
		width,
		height: Math.round(width * (1.15 + ((index * 29) % 30) / 100)),
	};
});

export function Students() {
	const containerRef = useRef(null);
	const cardRefs = useRef([]);

	useGSAP(
		() => {
			// One tween drives every card: each card reads the same progress value
			// offset by its own phase, so they sit evenly spaced along one helix.
			const progress = { value: 0 };

			gsap.to(progress, {
				value: 1,
				duration: TRAVEL_DURATION,
				ease: 'none',
				repeat: -1,
				onUpdate: () => {
					cardRefs.current.forEach((card, index) => {
						const { radius } = spiralCards[index];
						const t = (progress.value + index / CARD_COUNT) % 1;

						const angle = t * SPIRAL_TURNS * Math.PI * 2;
						// x and z trace the circle around the vertical axis; y is the
						// independent rise that turns that circle into a helix.
						const orbitAcross = Math.sin(angle) * radius;
						const orbitDepth = Math.cos(angle) * radius;

						const fadeIn = Math.min(t / FADE_IN, 1);
						const fadeOut = Math.min((1 - t) / (1 - FADE_OUT), 1);
						const facing = (orbitDepth / radius + 1) / 2;

						gsap.set(card, {
							x: orbitAcross,
							y: RISE_FROM + (RISE_TO - RISE_FROM) * t,
							z: orbitDepth,
							scale: SCALE_START + (SCALE_END - SCALE_START) * t,
							rotationY: -Math.sin(angle) * 42,
							rotationZ: -6 + Math.sin(angle) * 5,
							opacity:
								Math.min(fadeIn, fadeOut) *
								(1 - DEPTH_DIM + DEPTH_DIM * facing),
						});
					});
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<StudentsContainer id="alunos" ref={containerRef}>
			<SpiralLayer>
				{spiralCards.map(({ student, width, height }, index) => (
					<SpiralCard
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length, never-reordered stream of slots
						key={index}
						ref={(el) => {
							cardRefs.current[index] = el;
						}}
						style={{
							width,
							height,
							marginLeft: -width / 2,
							marginTop: -height / 2,
						}}
					>
						<CardFrame>
							<Stamp $hired={student.status.includes('Contrat')}>
								{student.status.includes('Contrat') ? 'Aprovado' : 'Em jornada'}
							</Stamp>

							<Photo $photo={student.photo} />

							<Caption>
								<Name>{student.name}</Name>
								<DataRow>{student.formation}</DataRow>
							</Caption>
						</CardFrame>
					</SpiralCard>
				))}
			</SpiralLayer>

			<Title>Alunos</Title>
		</StudentsContainer>
	);
}
