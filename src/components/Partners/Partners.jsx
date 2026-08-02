import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { PARTNER_CELLS, partners } from './Partners.data';
import {
	Cell,
	Grid,
	LogoLayer,
	PartnerContainer,
	Title,
} from './Partners.styles';

const SWAP_INTERVAL = [900, 2200];
const ENTER_DURATION = 0.6;
const LEAVE_DURATION = 0.35;

const randomBetween = ([min, max]) => min + Math.random() * (max - min);

function PartnerCell({ partnerIndex }) {
	const cellRef = useRef(null);
	// Both the outgoing and incoming logos have to exist at once for one to push
	// the other out, so a swap appends and the finished animation trims back.
	const [stack, setStack] = useState([{ key: 0, partnerIndex }]);
	const isInitialRender = useRef(true);

	useEffect(() => {
		if (isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}

		setStack((prev) => [
			...prev,
			{ key: prev[prev.length - 1].key + 1, partnerIndex },
		]);
	}, [partnerIndex]);

	useGSAP(
		() => {
			if (stack.length < 2) return;

			const [outgoing, incoming] = cellRef.current.children;

			gsap.fromTo(
				incoming,
				{ yPercent: 100 },
				{ yPercent: 0, duration: ENTER_DURATION, ease: 'power3.out' },
			);

			gsap.to(outgoing, {
				yPercent: -100,
				opacity: 0,
				duration: LEAVE_DURATION,
				ease: 'power2.in',
				// Drop the logo that just left so the cell holds a single layer again.
				onComplete: () => setStack((prev) => prev.slice(-1)),
			});
		},
		{ dependencies: [stack], scope: cellRef },
	);

	return (
		<Cell ref={cellRef}>
			{stack.map(({ key, partnerIndex: index }) => {
				const partner = partners[index];
				const Logo = partner.icon;

				return (
					<LogoLayer key={key} $scale={partner.scale} title={partner.name}>
						<Logo role="img" aria-label={partner.name} />
					</LogoLayer>
				);
			})}
		</Cell>
	);
}

export function Partners() {
	const [cells, setCells] = useState(() =>
		Array.from({ length: PARTNER_CELLS }, (_, index) => index),
	);

	// One scheduler for the whole grid: it picks a random cell and swaps it for a
	// brand that is not on screen. Choosing centrally is what makes duplicates
	// impossible — a per-cell timer could not know what its neighbours show.
	useEffect(() => {
		let timeoutId;

		const scheduleSwap = () => {
			timeoutId = setTimeout(() => {
				setCells((prev) => {
					const onScreen = new Set(prev);
					const available = partners
						.map((_, index) => index)
						.filter((index) => !onScreen.has(index));

					if (available.length === 0) return prev;

					const next = [...prev];
					next[Math.floor(Math.random() * next.length)] =
						available[Math.floor(Math.random() * available.length)];

					return next;
				});

				scheduleSwap();
			}, randomBetween(SWAP_INTERVAL));
		};

		scheduleSwap();

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<PartnerContainer id="empresas">
			<Title>Algumas das empresas que buscam nossos alunos</Title>

			<Grid>
				{cells.map((partnerIndex, cellIndex) => (
					<PartnerCell
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed grid slots that never reorder
						key={cellIndex}
						partnerIndex={partnerIndex}
					/>
				))}
			</Grid>
		</PartnerContainer>
	);
}
