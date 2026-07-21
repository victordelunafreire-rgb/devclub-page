import rodolfoPhoto from '../../assets/about/rodolfo-about.webp';
import {
	AboutContainer,
	Content,
	ImagePlaceholder,
	Text,
	Title,
} from './About.styles';

export function About() {
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

			<ImagePlaceholder $photo={rodolfoPhoto} />
		</AboutContainer>
	);
}
