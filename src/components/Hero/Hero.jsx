import { GlowBackground, HeroContainer, Title } from './Hero.styles';

export function Hero() {
	return (
		<HeroContainer id="hero">
			<GlowBackground />

			<Title>Você não precisa saber nada. Só precisa começar.</Title>
		</HeroContainer>
	);
}
