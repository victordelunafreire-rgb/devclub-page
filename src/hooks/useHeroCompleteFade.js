import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reads the scroll position Hero exposes on `#hero` so every consumer fades in at the same point, never a separately estimated value.
export function useHeroCompleteFade(ref) {
	useGSAP(() => {
		const rafId = requestAnimationFrame(() => {
			const heroEl = document.getElementById('hero');
			const heroCompleteScrollY = Number(heroEl?.dataset.heroCompleteScrollY);
			if (!ref.current || Number.isNaN(heroCompleteScrollY)) return;

			gsap.set(ref.current, { autoAlpha: 0 });

			ScrollTrigger.create({
				trigger: document.body,
				start: heroCompleteScrollY,
				onEnter: () => gsap.to(ref.current, { autoAlpha: 1, duration: 0.4 }),
				onLeaveBack: () =>
					gsap.to(ref.current, { autoAlpha: 0, duration: 0.4 }),
			});
		});

		return () => cancelAnimationFrame(rafId);
	}, []);
}
