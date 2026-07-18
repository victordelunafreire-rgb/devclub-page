import {
	ColumnTitle,
	Content,
	CopyRight,
	FooterContainer,
	FooterLink,
	LinkColumn,
	Logo,
} from './Footer.styles';

export function Footer() {
	return (
		<FooterContainer>
			<Content>
				<Logo>
					Dev<span>Club{'/>'}</span>
				</Logo>

				<LinkColumn>
					<ColumnTitle>Navegação</ColumnTitle>
					<FooterLink href="#formacoes">Formações</FooterLink>
					<FooterLink href="#alunos">Alunos</FooterLink>
					<FooterLink href="#empresas">Empresas</FooterLink>
					<FooterLink href="#tutores">Tutores</FooterLink>
				</LinkColumn>

				<LinkColumn>
					<ColumnTitle>Redes</ColumnTitle>
					<FooterLink
						href="https://www.instagram.com/rodolfomorii"
						target="_blank"
						rel="noopener noreferrer"
					>
						Instagram
					</FooterLink>
					<FooterLink
						href="https://www.youtube.com/@canaldevclub"
						target="_blank"
						rel="noopener noreferrer"
					>
						YouTube
					</FooterLink>
					<FooterLink
						href="https://www.linkedin.com/search/results/all/?keywords=Dev%20Club&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A74680005&position=0"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</FooterLink>
				</LinkColumn>
			</Content>

			<CopyRight>
				© {new Date().getFullYear()} DevClub. Todos os direitos reservados
			</CopyRight>
		</FooterContainer>
	);
}
