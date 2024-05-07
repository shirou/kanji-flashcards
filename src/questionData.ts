import grade2 from "./assets/grade-2.csv?raw";
import grade10 from "./assets/grade-10.csv?raw";
import subGrade2 from "./assets/sub-grade-2.csv?raw";

export type questionType = { [question: string]: string };

export const gradeList = ["漢字検定二級", "漢字検定準二級", "漢字検定十級"];

export function getQuestionData(grade: string): questionType {
	switch (grade) {
		case "漢字検定二級":
			return parseCSV(grade2);
		case "漢字検定準二級":
			return parseCSV(subGrade2);
		case "漢字検定十級":
			return parseCSV(grade10);
	}
	return {};
}

export function getQuestion(
	questions: questionType,
	key: string,
	type: string,
): string {
	const q = questions[key];
	if (type === "読み") {
		return key;
	}
	return q;
}

export function getAnswer(
	questions: questionType,
	key: string,
	type: string,
): string {
	const q = questions[key];
	if (type === "読み") {
		return q;
	}
	return key;
}

function parseCSV(csvString: string): questionType {
	const lines = csvString.split("\n");

	const result: questionType = {};
	for (const line of lines) {
		const columns = line.replace(/"/g, "").split(",");
		// 2番目のカラムをキー、3番目のカラムを値としてオブジェクトに追加
		if (columns.length >= 3) {
			result[columns[1].trim()] = columns[2].trim();
		}
	}
	return result;
}
