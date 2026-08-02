import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { mentors } from './Mentors.data';
import {
	Details,
	FanCard,
	FanSlot,
	FanStage,
	Hint,
	MentorsContainer,
	Name,
	PlayerTag,
	Portrait,
	Reveal,
	Role,
	StatBarBackground,
	StatBarFill,
	StatLabel,
	StatRow,
	Title,
} from './Mentors.styles';

const CARD_COUNT = mentors.length;
const CENTRE_INDEX = Math.floor(CARD_COUNT / 2);
const FAN_SPREAD = 52;

// Rotating around a pivot placed well below the card turns a single rotation
// into the card's horizontal position, its drop along the arc and its tilt —
// which is what shapes the fan without positioning each card by hand.
const FAN_PIVOT = '50% 420%';

const SELECTED_SCALE = 1.12;
const IDLE_BRIGHTNESS = 0.62;

// One card per mentor, ordered so the founder (id 0) always lands on the fan's
// middle slot — the one that starts selected — with everyone else filling the
// slots around him in their declared order.
const fanMentors = (() => {
	const founder = mentors.find((mentor) => mentor.id === 0);
	const others = mentors.filter((mentor) => mentor.id !== 0);

	return [
		...others.slice(0, CENTRE_INDEX),
		founder,
		...others.slice(CENTRE_INDEX),
	];
})();

const fanAngle = (index) =>
	-FAN_SPREAD / 2 + (FAN_SPREAD / (CARD_COUNT - 1)) * index;

export function Mentors() {
	const containerRef = useRef(null);
	const slotRefs = useRef([]);
	const cardRefs = useRef([]);
	const detailRefs = useRef([]);
	const [selected, setSelected] = useState(CENTRE_INDEX);

	useGSAP(
		() => {
			slotRefs.current.forEach((slot, index) => {
				gsap.set(slot, {
					rotation: fanAngle(index),
					transformOrigin: FAN_PIVOT,
				});
			});
			gsap.set(detailRefs.current, { autoAlpha: 0 });
		},
		{ scope: containerRef },
	);

	// Re-runs on every selection change: the fan keeps its geometry, only the
	// emphasis moves. Position and rotation are deliberately untouched here —
	// the selected card stands out where it already sits, it never travels to
	// the centre.
	useGSAP(
		() => {
			cardRefs.current.forEach((card, index) => {
				gsap.to(card, {
					scale: index === selected ? SELECTED_SCALE : 1,
					filter: `brightness(${index === selected ? 1 : IDLE_BRIGHTNESS})`,
					duration: 0.45,
					ease: 'power3.out',
				});
			});

			// Stack toward the selected card so the highlight is never clipped
			// by a neighbour overlapping it.
			slotRefs.current.forEach((slot, index) => {
				gsap.set(slot, {
					zIndex:
						index === selected
							? CARD_COUNT + 1
							: CARD_COUNT - Math.abs(index - selected),
				});
			});

			detailRefs.current.forEach((details, index) => {
				gsap.to(details, {
					autoAlpha: index === selected ? 1 : 0,
					duration: 0.35,
					ease: 'power2.out',
				});
			});
		},
		{ dependencies: [selected], scope: containerRef },
	);

	return (
		<MentorsContainer id="tutores" ref={containerRef}>
			<Title>Tutores</Title>
			<Hint>Passe o mouse sobre os cards para conhecer cada tutor</Hint>

			<FanStage>
				{fanMentors.map((mentor, index) => (
					<FanSlot
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length fan; mentors intentionally repeat
						key={index}
						ref={(el) => {
							slotRefs.current[index] = el;
						}}
					>
						<FanCard
							type="button"
							data-selected={index === selected}
							aria-pressed={index === selected}
							aria-label={`${mentor.name} — ${mentor.role}`}
							onMouseEnter={() => setSelected(index)}
							onFocus={() => setSelected(index)}
							// Touch devices have no hover, so a tap still reveals the card.
							onClick={() => setSelected(index)}
							ref={(el) => {
								cardRefs.current[index] = el;
							}}
						>
							<Portrait $photo={mentor.photo} />

							<Reveal
								ref={(el) => {
									detailRefs.current[index] = el;
								}}
							>
								<PlayerTag>P{mentor.id}</PlayerTag>

								<Details>
									<Name>{mentor.name}</Name>
									<Role>{mentor.role}</Role>

									{mentor.stats.map((stat) => (
										<StatRow key={stat.label}>
											<StatLabel>{stat.label}</StatLabel>
											<StatBarBackground>
												<StatBarFill $value={stat.value} />
											</StatBarBackground>
										</StatRow>
									))}
								</Details>
							</Reveal>
						</FanCard>
					</FanSlot>
				))}
			</FanStage>
		</MentorsContainer>
	);
}
