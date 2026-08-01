import { ThemeProvider } from 'styled-components';
import { About } from './components/About/About';
import { CTA } from './components/CTA/CTA';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Mentors } from './components/Mentors/Mentors';
import { Partners } from './components/Partners/Partners';
import { Programs } from './components/Programs/Programs';
import { Students } from './components/Students/Students';
import { Trail } from './components/Trail/Trail';
import { GlobalStyles } from './styles/globalStyles';
import { standardTheme } from './styles/standard';

function App() {
	return (
		<ThemeProvider theme={standardTheme}>
			<GlobalStyles />
			<Header />
			<Hero />
			<About />
			<Programs />
			<Students />
			<Partners />
			<Mentors />
			<CTA />
			<Footer />
			<Trail />
		</ThemeProvider>
	);
}

export default App;
