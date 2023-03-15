import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

interface AuthFormContainerProps {
	handleSubmit?: (data: any) => void
	title: string
	children: (JSX.Element | string | boolean)[]
}

const AuthFormContainer = ({
	handleSubmit,
	title,
	children,
}: AuthFormContainerProps) => {
	return (
		<Box backgroundImage='/images/bg_login.jpg' pt='60px' pb='130px'>
			<Box
				as='form'
				onSubmit={handleSubmit}
				bg='white'
				maxW={{ base: 'auto', lg: '500px' }}
				mx={{ base: '14', lg: 'auto' }}
				p='16'
				noValidate
			>
				<Heading
					as='h6'
					size='lg'
					textAlign='center'
					mb='8'
					color='yellow'
					fontWeight='500'
					textTransform='uppercase'
				>
					{title}
				</Heading>

				<>{children}</>
			</Box>
		</Box>
	)
}

export default AuthFormContainer
