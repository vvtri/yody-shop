import {
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
	UseNumberInputReturn,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface NumberSpinnerProps
	extends Pick<
		UseNumberInputReturn,
		'getDecrementButtonProps' | 'getInputProps' | 'getIncrementButtonProps'
	> {
	width: string
	boxSize: string
}

function NumberSpinner({
	getDecrementButtonProps,
	getInputProps,
	getIncrementButtonProps,
	boxSize,
	width,
}: NumberSpinnerProps) {
	return (
		<InputGroup size='md' display='inline-block' width={width}>
			<InputLeftElement
				{...getDecrementButtonProps()}
				fontSize='md'
				borderRight='1px solid  '
				borderRightColor='chakra-border-color'
				boxSize={boxSize}
			>
				<AiOutlineMinus />
			</InputLeftElement>
			<Input {...getInputProps()} textAlign='center' h={boxSize} />
			<InputRightElement
				fontSize='md'
				{...getIncrementButtonProps()}
				borderLeft='1px solid'
				borderLeftColor='chakra-border-color'
				boxSize={boxSize}
			>
				<AiOutlinePlus />
			</InputRightElement>
		</InputGroup>
	)
}

export default NumberSpinner
