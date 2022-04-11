import React from "react";
import { Draggable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { ITask } from "./Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Task.scss";

type IProps = {
	task: ITask;
	removeTask(id: string): void;
};

export function Task({ task, removeTask }: IProps): React.ReactElement {
	const { id, title, assigned, timeDeadline, dayDeadline } = task;
	const onRemove = () => {
		removeTask(id);
	};
	return (
		<div className="Task">
			<div className="TaskTitle">
				<input
					className="TaskTitlenput"
					type="textarea"
					name="task_title"
					defaultValue={title}
				/>
				<button className="taskDelButton" onClick={onRemove}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>

			<div className="taskInfo">
				<input
					className="AssignedInput"
					type="text"
					name="assigned"
					defaultValue={assigned}
				/>
				<div className="Deadline">
					<input type="time" defaultValue={timeDeadline} />
					<input type="date" defaultValue={dayDeadline} />
				</div>
			</div>
			<div>
				<input className="Description" type="text" defaultValue="Description" />
			</div>
		</div>
	);
}
