import { Box, ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { Footer } from '../src/common/components/footer'
import { Header } from '../src/common/components/header/header'
import { AppWrapper } from '../src/common/hoc/app-wrapper.hoc'
import { ToastContainer } from 'react-toastify'
import NextNProgress from 'nextjs-progressbar'

import { theme } from '../src/common/theme/index.theme'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<AppWrapper>
						<NextNProgress />
						<Header />
						<Box mt='90px' overflowX='hidden'>
							<Component {...pageProps} />
						</Box>
						<Footer />
						<ToastContainer />
					</AppWrapper>
					<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
				</QueryClientProvider>
			</ChakraProvider>
		</Provider>
	)
}

export default MyApp
