import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import store from "../store/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@emotion/react';
// import theme from '../theme/thema';



function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className='py-7 px-5'>
			<ToastContainer />
			{/* <ThemeProvider theme={theme}> */}
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
			{/* </ThemeProvider> */}
		</div>
	)
}

export default MyApp
