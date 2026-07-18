import { partners } from './Partners.data';
import {
	LogoWrapper,
	PartnerContainer,
	Title,
	Track,
	Wordmark,
} from './Partners.styles';

export function Partners() {
	return (
		<PartnerContainer id="empresas">
			<Title>+300 empresas parceiras</Title>

			<Track>
				{[...partners, ...partners].map((partner, index) => (
					<LogoWrapper
						key={`partner-${partner.id}-${index < partners.length ? 'a' : 'b'}`}
					>
						{partner.logo ? (
							<img src={partner.logo} alt={partner.name} />
						) : (
							<Wordmark>{partner.name}</Wordmark>
						)}
					</LogoWrapper>
				))}
			</Track>
		</PartnerContainer>
	);
}
