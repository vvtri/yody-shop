import { useMediaQuery } from '@chakra-ui/react'

export const useResponsive = () => {
	const [isMobile, isTablet, isDesktop] = useMediaQuery([
		'(min-width: 768px)',
		'(min-width: 1024px)',
		'(min-width: 1280px)',
	])
  return {isMobile, isTablet, isDesktop}
}
