import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { GlowBackground, HeroContainer, Signature, Title } from './Hero.styles';

export function Hero() {
	const containerRef = useRef(null);
	const glowRef = useRef(null);
	const titleRef = useRef(null);
	const signatureRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline();

			tl.from(glowRef.current, {
				opacity: 0,
				scale: 0.5,
				duration: 2,
				ease: 'power1.out',
			})
				.from(
					titleRef.current,
					{
						y: 40,
						opacity: 0,
						duration: 1.5,
						ease: 'power2.out',
					},
					'-=0.8',
				)
				.from(signatureRef.current, {
					opacity: 0,
					y: 10,
					duration: 0.8,
					ease: 'power2.out',
				});
		},
		{ scope: containerRef },
	);

	return (
		<HeroContainer id="hero" ref={containerRef}>
			<GlowBackground ref={glowRef} />

			<Title ref={titleRef}>
				Você não precisa saber nada. Só precisa começar.
			</Title>

			<Signature ref={signatureRef}>
				Dev<span>Club{'/>'}</span>
			</Signature>
		</HeroContainer>
	);
}
