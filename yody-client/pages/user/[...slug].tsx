import { Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { LoadingScreen } from '../../src/common/components/loading-screen/loading-screen'
import { useNotSigninRedirect, useUser } from '../../src/common/hooks/use-auth'
import ChangePasswordTab from '../../src/user/components/change-password-tab'
import InfoTab from '../../src/user/components/info-tab'
import { PurchaseDetailTab } from '../../src/user/components/purchase-detail-tab'
import PurchaseTab from '../../src/user/components/purchase-history-tab'
import { TabNames } from '../../src/user/constant/user.constant'

interface CurrentTabState {
	name: TabNames | ''
	parameter: string
}

const UserPage = () => {
	useNotSigninRedirect()
	const { isLoading, user } = useUser()
	const router = useRouter()

	const [currentTab, setCurrentTab] = useState<CurrentTabState>({
		name: '',
		parameter: '',
	})

	useEffect(() => {
		if (!router.isReady) return
		let tabName = router.query.slug![0] as TabNames
		setCurrentTab({ name: tabName, parameter: router.query.slug?.[1] || '' })
	}, [router.isReady, router.query])

	return isLoading ? (
		<LoadingScreen />
	) : (
		<Box maxW={{ xl: 'container.xl' }} mx='auto' pt='100px' pb='100px'>
			<Flex
				boxShadow='rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
				borderRadius='5px'
				py='8'
				px='14'
			>
				<Box flexShrink='0'>
					<Link href='/user/info' shallow>
						<Box
							as='a'
							display='block'
							bg={currentTab.name === 'info' ? 'yellow' : 'orange.100'}
							color={currentTab.name === 'info' ? 'white' : 'purple'}
							px='6'
							py='3'
							borderRadius='5px'
							cursor='pointer'
							_hover={{ bg: 'yellow', color: 'white' }}
							mb='3'
							transition='all 0.3s ease-in'
							textTransform='capitalize'
						>
							Thông tin cá nhân
						</Box>
					</Link>
					<Link href='purchase' shallow>
						<Box
							as='a'
							display='flex'
							bg={currentTab.name === 'purchase' ? 'yellow' : 'orange.100'}
							color={currentTab.name === 'purchase' ? 'white' : 'purple'}
							px='6'
							borderRadius='5px'
							py='3'
							mb='3'
							cursor='pointer'
							_hover={{ bg: 'yellow', color: 'white' }}
							transition='all 0.3s ease-in'
							textTransform='capitalize'
						>
							Thông tin mua hàng
						</Box>
					</Link>
					<Link href='change-password' shallow>
						<Box
							as='a'
							display='flex'
							bg={
								currentTab.name === 'change-password' ? 'yellow' : 'orange.100'
							}
							color={currentTab.name === 'change-password' ? 'white' : 'purple'}
							px='6'
							borderRadius='5px'
							py='3'
							cursor='pointer'
							_hover={{ bg: 'yellow', color: 'white' }}
							transition='all 0.3s ease-in'
							textTransform='capitalize'
						>
							Đổi mật khẩu
						</Box>
					</Link>
				</Box>

				{currentTab.name === 'info' && <InfoTab />}
				{currentTab.name === 'purchase' && currentTab.parameter !== '' && (
					<PurchaseDetailTab purchaseId={+currentTab.parameter} />
				)}
				{currentTab.name === 'purchase' && currentTab.parameter === '' && (
					<PurchaseTab />
				)}
				{currentTab.name === 'change-password' && <ChangePasswordTab />}
			</Flex>
		</Box>
	)
}

export default UserPage
