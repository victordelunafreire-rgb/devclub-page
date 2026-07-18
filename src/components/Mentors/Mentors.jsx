import { mentors } from './Mentors.data';
import {
	Card,
	Grid,
	MentorsContainer,
	Name,
	PlayerTag,
	Portrait,
	Role,
	StatBarBackground,
	StatBarFill,
	StatLabel,
	StatRow,
	Title,
} from './Mentors.styles';

export function Mentors() {
	return (
		<MentorsContainer id="tutores">
			<Title>Tutores</Title>

			<Grid>
				{mentors.map((mentor) => (
					<Card key={mentor.id}>
						<PlayerTag>P{mentor.id}</PlayerTag>

						<Portrait $photo={mentor.photo} />
						<Name>{mentor.name}</Name>
						<Role>{mentor.role}</Role>

						{mentor.stats.map((stat) => (
							<StatRow key={stat.label}>
								<StatLabel>{stat.label}</StatLabel>
								<StatBarBackground>
									<StatBarFill $value={stat.value} />
								</StatBarBackground>
							</StatRow>
						))}
					</Card>
				))}
			</Grid>
		</MentorsContainer>
	);
}
