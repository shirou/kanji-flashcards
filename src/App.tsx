import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import "./App.css";

import Fonts from "./Fonts";
import { Result } from "./pages/result.tsx";
import { Start } from "./pages/start.tsx";
import { Top } from "./pages/top.tsx";
import theme from "./theme";

const routes = [
	{
		path: "/",
		element: <Top />,
	},
	{
		path: "/start",
		element: <Start />,
	},
	{
		path: "/result",
		element: <Result />,
	},
];

const router = createMemoryRouter(routes);

export function App() {
	return (
		<ChakraProvider theme={theme}>
			<Fonts />
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}
