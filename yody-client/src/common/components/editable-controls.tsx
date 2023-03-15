import {
	useEditableControls,
	ButtonGroup,
	IconButton,
	Flex,
} from '@chakra-ui/react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'

export const EditableControls = () => {
	const {
		isEditing,
		getSubmitButtonProps,
		getCancelButtonProps,
		getEditButtonProps,
	} = useEditableControls()

	return isEditing ? (
		<ButtonGroup justifyContent='center' size='sm'>
			<IconButton
				icon={<AiOutlineCheck />}
				{...getSubmitButtonProps()}
				aria-label=''
			/>
			<IconButton
				icon={<AiOutlineClose />}
				{...getCancelButtonProps()}
				aria-label=''
			/>
		</ButtonGroup>
	) : (
		<Flex justifyContent='center'>
			<IconButton
				size='sm'
				icon={<FaRegEdit />}
				{...getEditButtonProps()}
				aria-label=''
			/>
		</Flex>
	)
}
