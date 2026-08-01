import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import rodolfoPhoto from '../../assets/about/rodolfo-about.webp';
import rodolfoEletricista from '../../assets/about/rodolfo-eletricista.webp';
import {
	AboutContainer,
	Content,
	ImageLayerBase,
	ImageLayerFade,
	ImagePlaceholder,
	Text,
	Title,
} from './About.styles';

gsap.registerPlugin(ScrollTrigger);

export function About() {
	const containerRef = useRef(null);
	const imageRef = useRef(null);
	const fadeLayerRef = useRef(null);

	useGSAP(
		() => {
			gsap.set(fadeLayerRef.current, { opacity: 0 });

			ScrollTrigger.create({
				trigger: imageRef.current,
				start: 'top bottom',
				end: () => `+=${imageRef.current.offsetHeight * 1.5}`,
				scrub: 1,
				onUpdate: (self) => {
					gsap.set(fadeLayerRef.current, { opacity: self.progress });
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<AboutContainer id="quemsomos" ref={containerRef}>
			<Content>
				<Title>Quem Somos</Title>
				<Text>
					O DevClub nasceu para provar que ninguém precisa de faculdade, diploma
					ou anos de experiência para virar programador. Aqui você aprende na
					prática, com gente que já passou pelo mesmo caminho que você está
					prestes a começar.
				</Text>
			</Content>

			<ImagePlaceholder ref={imageRef}>
				<ImageLayerBase $photo={rodolfoEletricista} $position="center 50%" />
				<ImageLayerFade
					ref={fadeLayerRef}
					$photo={rodolfoPhoto}
					$position="90% top"
				/>
			</ImagePlaceholder>
		</AboutContainer>
	);
}
