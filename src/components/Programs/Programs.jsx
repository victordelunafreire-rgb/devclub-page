import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { programs } from './Programs.data';
import {
	Card,
	CardDescription,
	CardTitle,
	ProgramsContainer,
	StyledSwiper,
	Title,
} from './Programs.styles';

export function Programs() {
	return (
		<ProgramsContainer id="formacoes">
			<Title>Formações</Title>

			<StyledSwiper
				modules={[EffectCoverflow]}
				effect="coverflow"
				grabCursor
				centeredSlides
				slidesPerView="auto"
				coverflowEffect={{
					rotate: 30,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
			>
				{programs.map((program) => (
					<SwiperSlide key={program.id} style={{ width: '320px' }}>
						<Card>
							<CardTitle>{program.title}</CardTitle>
							<CardDescription>{program.description}</CardDescription>
						</Card>
					</SwiperSlide>
				))}
			</StyledSwiper>
		</ProgramsContainer>
	);
}
