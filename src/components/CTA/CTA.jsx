import { SectionBackdropFill } from '../SectionBackdrop/SectionBackdrop.styles';
import { Button, CTAContainer, GlowBackground, Title } from './CTA.styles';

export function CTA() {
	return (
		<CTAContainer id="cta">
			<SectionBackdropFill />
			<GlowBackground />

			<Title>Sua vaga como programador começa com um clique</Title>

			<Button id="cta-trail-end">Quero ser aluno</Button>
		</CTAContainer>
	);
}
