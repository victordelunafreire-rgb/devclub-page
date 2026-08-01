import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef } from 'react';
import { HERO_FRAME_COUNT, heroFramePaths } from './Hero.data';
import {
	FrameCanvas,
	GlowBackground,
	HeroContainer,
	PinCore,
	PinHalo,
	PinSvg,
	PinWrapper,
	Signature,
	Title,
	TitleLine,
	WhiteFlash,
} from './Hero.styles';

gsap.registerPlugin(ScrollTrigger);

const PIN_PATH_D =
	'M45,0 C20.1,0 0,20.1 0,45 C0,69.8 45,117 45,117 C45,117 90,69.8 90,45 C90,20.1 69.8,0 45,0 Z';

export function Hero() {
	const containerRef = useRef(null);
	const canvasRef = useRef(null);
	const imagesRef = useRef([]);
	const glowRef = useRef(null);
	const whiteFlashRef = useRef(null);
	const pinHaloRef = useRef(null);
	const pinCoreRef = useRef(null);
	const pinAnchorRef = useRef(null);
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
			const pinLength = pinCoreRef.current.getTotalLength();
			gsap.set([pinHaloRef.current, pinCoreRef.current], {
				strokeDasharray: pinLength,
				strokeDashoffset: pinLength,
			});

			const frameState = { frame: 0 };
			const pinScrollDistance = window.innerHeight * 5.5;

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
				.to(
					[pinHaloRef.current, pinCoreRef.current],
					{
						strokeDashoffset: 0,
						duration: 1,
						ease: 'power2.inOut',
					},
					'-=0.6',
				)
				.addLabel('pinRevealComplete')
				.from(
					line1Ref.current,
					{
						x: -80,
						opacity: 0,
						duration: 2.5,
						ease: 'power2.out',
					},
					'-=0.2',
				)
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

			const revealFraction = tl.labels.pinRevealComplete / tl.duration();
			const revealScrollY = revealFraction * pinScrollDistance;
			pinAnchorRef.current.dataset.trailRevealScrollY = String(revealScrollY);
		},
		{ scope: containerRef },
	);

	return (
		<HeroContainer id="hero" ref={containerRef}>
			<FrameCanvas ref={canvasRef} width={960} height={540} />
			<GlowBackground ref={glowRef} />
			<WhiteFlash ref={whiteFlashRef} />

			<PinWrapper id="hero-trail-start" ref={pinAnchorRef}>
				<PinSvg viewBox="0 0 90 117">
					<PinHalo ref={pinHaloRef} d={PIN_PATH_D} />
					<PinCore ref={pinCoreRef} d={PIN_PATH_D} />
				</PinSvg>
			</PinWrapper>

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
