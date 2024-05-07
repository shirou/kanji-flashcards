import { Heading } from "@chakra-ui/react";
import { linedText } from "./linedText";

type AnswerProps = {
	text: string;
};

export function Answer(props: AnswerProps) {
	const { text } = props;

	const q = linedText(text);

	return (
		<Heading className="vertical" fontWeight={400} fontSize={"md"}>
			{q}
		</Heading>
	);
}
