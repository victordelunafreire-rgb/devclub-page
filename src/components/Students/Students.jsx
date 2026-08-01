import { students } from './Students.data';
import {
	Card,
	DataRow,
	Grid,
	Name,
	Photo,
	Stamp,
	StudentsContainer,
	Title,
} from './Students.styles';

export function Students() {
	return (
		<StudentsContainer id="alunos">
			<Title>Alunos</Title>

			<Grid>
				{students.map((student) => (
					<Card key={student.id}>
						<Stamp $hired={student.status.includes('Contrat')}>
							{student.status.includes('Contrat') ? 'Aprovado' : 'Em jornada'}
						</Stamp>

						<Photo $photo={student.photo} />
						<Name>{student.name}</Name>
						<DataRow>
							Formação: <span>{student.formation}</span>
						</DataRow>
						<DataRow>
							Tempo: <span>{student.duration}</span>
						</DataRow>
						<DataRow>
							Status: <span>{student.status}</span>
						</DataRow>
					</Card>
				))}
			</Grid>
		</StudentsContainer>
	);
}
