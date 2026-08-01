import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { useHeroCompleteFade } from '../../hooks/useHeroCompleteFade';
import {
	CapsuleTrack,
	ProgressThumb,
	ProgressWrapper,
} from './ScrollProgress.styles';

gsap.registerPlugin(ScrollTrigger);

const CAPSULE_HEIGHT = 220;
const THUMB_SIZE = 16;
const MAX_TRAVEL = CAPSULE_HEIGHT - THUMB_SIZE;

export function ScrollProgress() {
	const wrapperRef = useRef(null);
	const thumbRef = useRef(null);

	useHeroCompleteFade(wrapperRef);

	useGSAP(() => {
		ScrollTrigger.create({
			trigger: document.body,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: (self) => {
				gsap.set(thumbRef.current, {
					top: self.progress * MAX_TRAVEL,
				});
			},
		});
	}, []);

	return (
		<ProgressWrapper ref={wrapperRef}>
			<CapsuleTrack />
			<ProgressThumb ref={thumbRef} />
		</ProgressWrapper>
	);
}
