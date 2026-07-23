import { useState } from 'react';
import rodolfoPhoto from '../../assets/about/rodolfo-about.webp';
import rodolfoEletricista from '../../assets/about/rodolfo-eletricista.webp';
import {
	AboutContainer,
	Content,
	ImageLayer,
	ImageLayerHover,
	ImagePlaceholder,
	Text,
	Title,
} from './About.styles';

export function About() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<AboutContainer id="quemsomos">
			<Content>
				<Title>Quem Somos</Title>
				<Text>
					O DevClub nasceu para provar que ninguém precisa de faculdade, diploma
					ou anos de experiência para virar programador. Aqui você aprende na
					prática, com gente que já passou pelo mesmo caminho que você está
					prestes a começar.
				</Text>
			</Content>

			<ImagePlaceholder
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<ImageLayer
					$photo={rodolfoPhoto}
					$hovered={isHovered}
					$position="90% top"
				/>
				<ImageLayerHover
					$photo={rodolfoEletricista}
					$hovered={isHovered}
					$position="center 50%"
				/>
			</ImagePlaceholder>
		</AboutContainer>
	);
}
