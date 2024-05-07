import {
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Heading,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { gradeList } from "../questionData";
import {
	answersSetting,
	intervalSecSetting,
	levelSetting,
	maxQuestionsSetting,
	qtypeSetting,
} from "../settings";

export function Top() {
	const navigate = useNavigate();
	const [intervalSec, setIntervalSec] = useAtom(intervalSecSetting);
	const [maxQuestions, setMaxQuestions] = useAtom(maxQuestionsSetting);
	const [level, setLevel] = useAtom(levelSetting);
	const [qType, setQType] = useAtom(qtypeSetting);
	const [, setAnswers] = useAtom(answersSetting);

	useEffect(() => {
		// clear kanji answers	when back to top page
		setAnswers([]);
	}, [setAnswers]);

	const levelOption = gradeList.map((grade) => {
		return (
			<option key={grade} value={grade}>
				{grade}
			</option>
		);
	});

	return (
		<Container maxW={"3xl"} h={"70vh"} paddingTop={"2rem"}>
			<Center h="100%">
				<VStack spacing={10}>
					<Heading
						fontWeight={700}
						fontSize={{ base: "1xl", sm: "3xl", md: "5xl" }}
					>
						漢字フラッシュカード
					</Heading>
					<Button colorScheme="blue" onClick={() => navigate("/start")}>
						スタート
					</Button>
					<FormControl>
						<VStack spacing={1} alignItems="left">
							<FormLabel>レベル設定</FormLabel>
							<Select
								value={level}
								onChange={(e) => setLevel(e.currentTarget?.value)}
							>
								{levelOption}
							</Select>
							<FormLabel>読み/書き</FormLabel>
							<Select
								value={qType}
								onChange={(e) => setQType(e.currentTarget?.value)}
							>
								<option value={"読み"}>読み</option>
								<option value={"書き"}>書き</option>
							</Select>
							<FormLabel>表示時間</FormLabel>
							<NumberInput
								defaultValue={8}
								min={2}
								max={15}
								value={intervalSec}
								onChange={(v) => setIntervalSec(Number.parseFloat(v))}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
							<FormLabel>問題数</FormLabel>
							<NumberInput
								defaultValue={10}
								min={5}
								max={20}
								value={maxQuestions}
								onChange={(v) => setMaxQuestions(Number.parseFloat(v))}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</VStack>
					</FormControl>
				</VStack>
			</Center>
		</Container>
	);
}
