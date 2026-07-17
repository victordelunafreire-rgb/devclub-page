import { ThemeProvider } from 'styled-components';
import { About } from './components/About/About';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Programs } from './components/Programs/Programs';
import { Students } from './components/Students/Students';
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
		</ThemeProvider>
	);
}

export default App;
