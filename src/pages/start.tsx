import { Center, Progress, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { questionType } from "../questionData";
import {
	answersSetting,
	intervalSecSetting,
	levelSetting,
	maxQuestionsSetting,
	qtypeSetting,
} from "../settings";

import { Question } from "../components/question";
import { getAnswer, getQuestion, getQuestionData } from "../questionData";

function getQuestions(src: questionType, maxQuestions: number): string[] {
	if (!src) {
		return [];
	}
	const keys = Object.keys(src);
	const array = Array.from({ length: keys.length }, (_, i) => i);
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	const selectedQuestions = [] as string[];
	for (const i of array.slice(0, maxQuestions)) {
		const key = keys[i];
		selectedQuestions.push(key);
	}

	return selectedQuestions;
}

export function Start() {
	const navigate = useNavigate();

	const [question, setQuestion] = useState<string>("");
	const [keys, setKeys] = useState<string[]>([]);
	const [count, setCount] = useState<number>(0);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [sec, setSec] = useState<number>(0);
	const [intervalSec] = useAtom(intervalSecSetting);
	const [maxQuestions] = useAtom(maxQuestionsSetting);
	const [level] = useAtom(levelSetting);
	const [answers, setAnswers] = useAtom(answersSetting);
	const [qType] = useAtom(qtypeSetting);

	useEffect(() => {
		const data = getQuestionData(level);
		const keys = getQuestions(data, maxQuestions);
		setKeys(keys);
	}, [maxQuestions, level]);

	useEffect(() => {
		const data = getQuestionData(level);

		const intervalId = setInterval(() => {
			setSec(sec + 1);
			if (!isStarted && sec > 2) {
				setSec(0);
				setIsStarted(true);
				const key = keys[count];
				setQuestion(getQuestion(data, key, qType) || "");
				setAnswers([...answers, getAnswer(data, key, qType) || ""]);
				setCount(count + 1);
			}
			if (isFinished && sec > 2) {
				navigate("/result");
			}
			if (!isFinished && isStarted && sec > intervalSec - 1) {
				setSec(0);
				const key = keys[count];
				setQuestion(getQuestion(data, key, qType) || "");
				setAnswers([...answers, getAnswer(data, key, qType) || ""]);
				setCount(count + 1);
				setIsFinished(count === keys.length);
			}
		}, 1000);
		return () => clearInterval(intervalId);
	}, [
		count,
		sec,
		intervalSec,
		isFinished,
		isStarted,
		keys,
		level,
		qType,
		answers,
		navigate,
		setAnswers,
	]);
	return (
		<VStack spacing={10}>
			<Progress
				w="100%"
				colorScheme="green"
				size="sm"
				visibility={!isStarted || isFinished ? "hidden" : "visible"}
				value={sec}
				max={intervalSec}
			/>
			<Center>
				{isFinished ? (
					<Question text="終了です。" />
				) : !isStarted ? (
					<Question text="それでは問題を始めます。" />
				) : (
					<Question text={question} />
				)}
			</Center>
		</VStack>
	);
}
