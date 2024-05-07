import { Heading } from "@chakra-ui/react";

import { linedText } from "./linedText";

type QuestionProps = {
	text: string;
};

export function Question(props: QuestionProps) {
	const { text: question } = props;

	const q = linedText(question);

	return (
		<Heading
			className="vertical"
			fontWeight={400}
			fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
		>
			{q}
		</Heading>
	);
}
