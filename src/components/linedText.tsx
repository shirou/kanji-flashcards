import { Text } from "@chakra-ui/react";
const re = /(.*)『(.+)』(.*)/;

export function linedText(src: string) {
	const found = src.match(re);
	if (!found || found.length !== 4) {
		return <Text>{src}</Text>;
	}
	return (
		<Text>
			{found[1]}
			<span className="lined">{found[2]}</span>
			{found[3]}
		</Text>
	);
}
