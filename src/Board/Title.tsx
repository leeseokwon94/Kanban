import React, {
	MouseEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import "./Title.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../hooks/useFetch";

export interface ITitleInfo {
	title: string;
	startDate: string;
	endDate: string;
}

export function Title() {
	const [inputs, setInputs] = useState<ITitleInfo>({
		title: "",
		startDate: "",
		endDate: "",
	});
  
	const { title, startDate, endDate } = inputs;
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setInputs({
				...inputs,
				[name]: value,
			});
		},
		[inputs]
	);

	const onKeyPress = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && titleRef.current) {
				const title = titleRef.current.value;
				setInputs({ ...inputs, title });
				titleRef.current.blur();
			}
		},
		[inputs]
	);
	const titleRef = useRef<HTMLInputElement>(null);

	return (
		<div className="Title">
			{/* <form className="TitleInputForm" onSubmit={onSubmit}> */}
			<input
				name="title"
				className="TitleInput"
				type="text"
				placeholder="Title"
				defaultValue={title}
				onChange={onChange}
				// onSubmit={onSubmit}
				onKeyPress={onKeyPress}
				autoComplete="off"
				onFocus={(e) => (e.target.placeholder = "")}
				ref={titleRef}
			/>
			{/* </form> */}

			<div className="deadLine">
				<input
					type="date"
					name="startDate"
					defaultValue={startDate}
					onChange={onChange}
				/>
				<span>&nbsp;&nbsp;~</span>
				<input
					type="date"
					name="endDate"
					defaultValue={endDate}
					onChange={onChange}
				/>
			</div>
		</div>
	);
}
