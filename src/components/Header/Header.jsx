import {
	CTAButton,
	HeaderContainer,
	Logo,
	Nav,
	NavLink,
} from './Header.styles';

export function Header() {
	return (
		<HeaderContainer>
			<Logo>
				Dev<span>Club{'/>'}</span>
			</Logo>

			<Nav>
				<NavLink href="#formacoes">Formações</NavLink>
				<NavLink href="#alunos">Alunos</NavLink>
				<NavLink href="#empresas">Empresas</NavLink>
				<NavLink href="#tutores">Tutores</NavLink>
			</Nav>

			<CTAButton>Comece agora</CTAButton>
		</HeaderContainer>
	);
}
