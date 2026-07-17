import { AboutContainer, Content, Text, Title } from './About.styles';

export function About() {
	return (
		<AboutContainer>
			<Content>
				<Title>Quem Somos</Title>
				<Text>
					O DevClub nasceu para provar que ninguém precisa de faculdade, diploma
					ou anos de experiência para virar programador. Aqui você aprende na
					prática, com gente que já passou pelo mesmo caminho que você está
					prestes a começar.
				</Text>
			</Content>
		</AboutContainer>
	);
}
