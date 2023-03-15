import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import styles from './style.module.css'

interface LoadingScreenProps {
	h?: string
}

export const LoadingScreen = ({
	h = 'calc(100vh - 90px)',
}: LoadingScreenProps) => {
	return (
		<Flex
			className={styles.loadingScreen}
			justifyContent='center'
			alignItems='center'
			h={h}
			bg='white'
		>
			<svg width='200' height='200' className={styles.svg}>
				<circle id='dot1' className={styles.shape} />
				<circle id='dot2' className={styles.shape} />
				<circle id='dot3' className={styles.shape} />
				<circle id='dot4' className={styles.shape} />
			</svg>
		</Flex>
	)
}
