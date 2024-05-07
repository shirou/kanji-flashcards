import {
	Button,
	Center,
	ListItem,
	UnorderedList,
	VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";

import { useNavigate } from "react-router-dom";
import { answersSetting } from "../settings";

import { Answer } from "../components/answer";

export function Result() {
	const navigate = useNavigate();

	const [answers] = useAtom(answersSetting);

	const results = answers.map((answer) => {
		if (answer === "") {
			return null;
		}
		return (
			<ListItem key={answer} w={10} listStyleType={"none"}>
				<Answer text={answer} />
			</ListItem>
		);
	});

	return (
		<VStack spacing={10} h={500}>
			<Button colorScheme="blue" onClick={() => navigate("/")}>
				戻る
			</Button>
			<Center flexDirection={"row"} w={"70vw"}>
				<UnorderedList className="verticalUL" padding={0}>
					{results}
				</UnorderedList>
			</Center>
		</VStack>
	);
}
