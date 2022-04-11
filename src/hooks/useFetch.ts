import { useEffect, useState } from "react";

export function useFetch(url: string): any {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setData(data);
			});
	}, [url]);

	return data;
}
