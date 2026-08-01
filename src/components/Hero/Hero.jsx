import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef } from 'react';
import { HERO_FRAME_COUNT, heroFramePaths } from './Hero.data';
import {
	FrameCanvas,
	GlowBackground,
	HeroContainer,
	Signature,
	Title,
	TitleLine,
	WhiteFlash,
} from './Hero.styles';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
	const containerRef = useRef(null);
	const canvasRef = useRef(null);
	const imagesRef = useRef([]);
	const glowRef = useRef(null);
	const whiteFlashRef = useRef(null);
	const line1Ref = useRef(null);
	const line2Ref = useRef(null);
	const line3Ref = useRef(null);
	const signatureRef = useRef(null);

	const drawFrame = useCallback((index) => {
		const canvas = canvasRef.current;
		const image = imagesRef.current[index];
		if (!canvas || !image?.complete) return;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	}, []);

	useEffect(() => {
		imagesRef.current = heroFramePaths.map((src) => {
			const image = new Image();
			image.src = src;
			return image;
		});

		const firstFrame = imagesRef.current[0];
		if (firstFrame.complete) {
			drawFrame(0);
		} else {
			firstFrame.addEventListener('load', () => drawFrame(0), { once: true });
		}
	}, [drawFrame]);

	useGSAP(
		() => {
			const frameState = { frame: 0 };
			const pinScrollDistance = window.innerHeight * 5.5;
			containerRef.current.dataset.heroCompleteScrollY =
				String(pinScrollDistance);

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: () => `+=${pinScrollDistance}`,
					scrub: 1,
					pin: true,
					invalidateOnRefresh: true,
				},
			});

			tl.to(frameState, {
				frame: HERO_FRAME_COUNT - 1,
				duration: 6,
				ease: 'none',
				onUpdate: () => drawFrame(Math.round(frameState.frame)),
			})
				.from(glowRef.current, {
					opacity: 0,
					scale: 0.5,
					duration: 2,
					ease: 'power1.out',
				})
				.to(whiteFlashRef.current, {
					opacity: 1,
					duration: 0.4,
					ease: 'power1.in',
				})
				.set(canvasRef.current, { opacity: 0 })
				.to(whiteFlashRef.current, {
					scale: 0.12,
					duration: 0.9,
					ease: 'power3.inOut',
				})
				.to(
					whiteFlashRef.current,
					{
						opacity: 0,
						duration: 0.4,
						ease: 'power1.out',
					},
					'-=0.3',
				)
				.from(line1Ref.current, {
					x: -80,
					opacity: 0,
					duration: 2.5,
					ease: 'power2.out',
				})
				.from(line2Ref.current, {
					x: 80,
					opacity: 0,
					duration: 2.5,
					ease: 'power2.out',
				})
				.from(line3Ref.current, {
					y: 60,
					opacity: 0,
					duration: 2.5,
					ease: 'power2.out',
				})
				.from(signatureRef.current, {
					opacity: 0,
					y: 10,
					duration: 1,
					ease: 'power2.out',
				});
		},
		{ scope: containerRef },
	);

	return (
		<HeroContainer id="hero" ref={containerRef}>
			<FrameCanvas ref={canvasRef} width={960} height={540} />
			<GlowBackground ref={glowRef} />
			<WhiteFlash ref={whiteFlashRef} />

			<Title>
				<TitleLine ref={line1Ref}>O primeiro passo</TitleLine>
				<TitleLine ref={line2Ref}>da sua nova jornada</TitleLine>
				<TitleLine ref={line3Ref}>começa aqui</TitleLine>
			</Title>

			<Signature ref={signatureRef}>
				Dev<span>Club{'/>'}</span>
			</Signature>
		</HeroContainer>
	);
}
