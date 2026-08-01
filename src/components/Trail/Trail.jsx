import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { standardTheme } from '../../styles/standard';
import {
	TRAIL_SECTION_ORDER,
	TRAIL_WAYPOINT_X_RATIOS,
	TRAIL_WIGGLE_WAVELENGTH,
} from './Trail.data';
import {
	MarkerCore,
	MarkerGlow,
	PinnedSectionBackdrop,
	TrailCore,
	TrailHalo,
	TrailSvg,
	TrailWrapper,
} from './Trail.styles';

gsap.registerPlugin(ScrollTrigger);

function measureAnchors() {
	const startEl = document.getElementById('hero-trail-start');
	const endEl = document.getElementById('cta-trail-end');
	if (!startEl || !endEl) return null;

	const scrollY = window.scrollY;
	const viewportWidth = window.innerWidth;

	const startRect = startEl.getBoundingClientRect();
	const endRect = endEl.getBoundingClientRect();

	const start = {
		x: startRect.left + startRect.width / 2,
		y: startRect.bottom + scrollY,
	};
	const revealScrollY = Number(startEl.dataset.trailRevealScrollY);
	const end = {
		x: endRect.left + endRect.width / 2,
		y: endRect.top + scrollY + endRect.height / 2,
	};

	const ctaSectionEl = document.getElementById('cta');
	const wrapperHeight = ctaSectionEl
		? ctaSectionEl.getBoundingClientRect().bottom + scrollY
		: end.y;

	const programsEl = document.getElementById('formacoes');
	const programsBackdrop = programsEl
		? {
				top: programsEl.getBoundingClientRect().top + scrollY,
				height: programsEl.getBoundingClientRect().height,
			}
		: null;

	const transitionCount = TRAIL_SECTION_ORDER.length - 1;
	const anchors = [];
	for (let index = 0; index < transitionCount; index++) {
		const earlierId = TRAIL_SECTION_ORDER[index];
		const laterId = TRAIL_SECTION_ORDER[index + 1];
		const earlierEl = document.getElementById(earlierId);
		if (!earlierEl) continue;

		anchors.push({
			earlierId,
			laterId,
			x: viewportWidth * TRAIL_WAYPOINT_X_RATIOS[index],
			y: earlierEl.getBoundingClientRect().bottom + scrollY,
		});
	}

	return {
		start,
		end,
		anchors,
		revealScrollY,
		wrapperHeight,
		programsBackdrop,
		viewportWidth,
	};
}

function buildWigglePoints(p0, p1, viewportWidth) {
	const dy = p1.y - p0.y;
	const steps = Math.max(1, Math.round(dy / TRAIL_WIGGLE_WAVELENGTH));
	const centerX = viewportWidth * 0.5;
	const amplitude = viewportWidth * 0.22;
	const startSign = p0.x >= centerX ? 1 : -1;

	const points = [];
	for (let step = 1; step < steps; step++) {
		const t = step / steps;
		const sign = step % 2 === 0 ? startSign : -startSign;
		points.push({
			x: centerX + sign * amplitude,
			y: p0.y + dy * t,
		});
	}
	return points;
}

function catmullRomToBezierPath(points) {
	if (points.length < 2) return '';

	let d = `M ${points[0].x} ${points[0].y}`;

	for (let i = 0; i < points.length - 1; i++) {
		const p0 = points[i - 1] || points[i];
		const p1 = points[i];
		const p2 = points[i + 1];
		const p3 = points[i + 2] || p2;

		const c1x = p1.x + (p2.x - p0.x) / 6;
		const c1y = p1.y + (p2.y - p0.y) / 6;
		const c2x = p2.x - (p3.x - p1.x) / 6;
		const c2y = p2.y - (p3.y - p1.y) / 6;

		d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
	}

	return d;
}

export function Trail() {
	const wrapperRef = useRef(null);
	const programsBackdropRef = useRef(null);
	const haloRef = useRef(null);
	const coreRef = useRef(null);
	const markerGroupRefs = useRef([]);

	markerGroupRefs.current = [];
	const addMarkerGroupRef = (el) => {
		if (el) markerGroupRefs.current.push(el);
	};

	useGSAP(
		() => {
			let innerRafId = null;

			const outerRafId = requestAnimationFrame(() => {
				innerRafId = requestAnimationFrame(() => {
					const measured = measureAnchors();
					if (!measured) return;

					wrapperRef.current.style.height = `${measured.wrapperHeight}px`;

					if (measured.programsBackdrop && programsBackdropRef.current) {
						programsBackdropRef.current.style.top = `${measured.programsBackdrop.top}px`;
						programsBackdropRef.current.style.height = `${measured.programsBackdrop.height}px`;
					}

					const fullPoints = [measured.start];
					for (const anchor of measured.anchors) {
						const prev = fullPoints[fullPoints.length - 1];
						fullPoints.push(
							...buildWigglePoints(prev, anchor, measured.viewportWidth),
						);
						fullPoints.push(anchor);
					}
					fullPoints.push(
						...buildWigglePoints(
							fullPoints[fullPoints.length - 1],
							measured.end,
							measured.viewportWidth,
						),
					);
					fullPoints.push(measured.end);

					const d = catmullRomToBezierPath(fullPoints);
					haloRef.current.setAttribute('d', d);
					coreRef.current.setAttribute('d', d);

					gsap.set([haloRef.current, coreRef.current], { opacity: 0 });
					if (!Number.isNaN(measured.revealScrollY)) {
						gsap.to([haloRef.current, coreRef.current], {
							opacity: 1,
							scrollTrigger: {
								trigger: document.body,
								start: measured.revealScrollY,
								end: measured.revealScrollY + 400,
								scrub: 0.3,
							},
						});
					}

					gsap.set(markerGroupRefs.current, {
						opacity: 0.25,
						scale: 0.6,
						transformOrigin: '0px 0px',
					});

					measured.anchors.forEach((anchor, index) => {
						const group = markerGroupRefs.current[index];
						if (!group) return;

						group.setAttribute(
							'transform',
							`translate(${anchor.x}, ${anchor.y})`,
						);

						ScrollTrigger.create({
							trigger: document.getElementById(anchor.laterId),
							start: 'top bottom',
							end: 'top center',
							scrub: 1,
							onUpdate: (self) => {
								gsap.set(group, {
									opacity: 0.25 + self.progress * 0.75,
									scale: 0.6 + self.progress * 0.4,
								});
							},
						});
					});

					ScrollTrigger.refresh();
				});
			});

			return () => {
				cancelAnimationFrame(outerRafId);
				if (innerRafId) cancelAnimationFrame(innerRafId);
			};
		},
		{ scope: wrapperRef },
	);

	return (
		<TrailWrapper ref={wrapperRef}>
			<PinnedSectionBackdrop ref={programsBackdropRef} />

			<TrailSvg id="trail-svg">
				<defs>
					<radialGradient id="trail-marker-gradient">
						<stop offset="0%" stopColor="#ffffff" />
						<stop offset="100%" stopColor={standardTheme.primary} />
					</radialGradient>
				</defs>

				<TrailHalo ref={haloRef} id="trail-halo-path" />
				<TrailCore ref={coreRef} id="trail-core-path" />

				{TRAIL_SECTION_ORDER.slice(0, -1).map((id) => (
					<g key={id} ref={addMarkerGroupRef}>
						<MarkerGlow r="16" />
						<MarkerCore r="8" />
					</g>
				))}
			</TrailSvg>
		</TrailWrapper>
	);
}
