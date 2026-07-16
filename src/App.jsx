import { ThemeProvider } from 'styled-components';
import { Header } from './components/Header/Header';
import { GlobalStyles } from './styles/globalStyles';
import { standardTheme } from './styles/standard';

function App() {
	return (
		<ThemeProvider theme={standardTheme}>
			<GlobalStyles />
			<Header />
		</ThemeProvider>
	);
}

export default App;
