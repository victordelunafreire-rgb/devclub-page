import { useState } from 'react';
import {
	CTAButton,
	HeaderContainer,
	Logo,
	MenuButton,
	MobileMenu,
	Nav,
	NavLink,
} from './Header.styles';

export function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

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

			<CTAButton>Quero ser aluno</CTAButton>

			<MenuButton onClick={() => setMenuOpen(!menuOpen)}>
				<span />
				<span />
				<span />
			</MenuButton>

			<MobileMenu $open={menuOpen}>
				<NavLink href="#formacoes" onClick={() => setMenuOpen(false)}>
					Formações
				</NavLink>
				<NavLink href="#alunos" onClick={() => setMenuOpen(false)}>
					Alunos
				</NavLink>
				<NavLink href="#empresas" onClick={() => setMenuOpen(false)}>
					Empresas
				</NavLink>
				<NavLink href="#tutores" onClick={() => setMenuOpen(false)}>
					Tutores
				</NavLink>
				<CTAButton
					style={{ display: 'block' }}
					onClick={() => setMenuOpen(false)}
				>
					Quero ser aluno
				</CTAButton>
			</MobileMenu>
		</HeaderContainer>
	);
}
