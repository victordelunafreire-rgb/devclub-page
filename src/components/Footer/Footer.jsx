import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import {
	ColumnTitle,
	Content,
	CopyRight,
	FooterContainer,
	FooterLink,
	LinkColumn,
	Logo,
	SocialLink,
	SocialRow,
} from './Footer.styles';

const socials = [
	{
		name: 'Instagram',
		icon: FaInstagram,
		href: 'https://www.instagram.com/rodolfomorii',
	},
	{
		name: 'YouTube',
		icon: FaYoutube,
		href: 'https://www.youtube.com/@canaldevclub',
	},
	{
		name: 'LinkedIn',
		icon: FaLinkedinIn,
		href: 'https://www.linkedin.com/search/results/all/?keywords=Dev%20Club&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A74680005&position=0',
	},
];

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
					<SocialRow>
						{socials.map((social) => (
							<SocialLink
								key={social.name}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.name}
								title={social.name}
							>
								<social.icon size={18} />
							</SocialLink>
						))}
					</SocialRow>
				</LinkColumn>
			</Content>

			<CopyRight>
				© {new Date().getFullYear()} DevClub. Todos os direitos reservados
			</CopyRight>
		</FooterContainer>
	);
}
