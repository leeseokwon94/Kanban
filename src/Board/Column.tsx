import React from "react";
import { Task } from "./Task";
import "./Column.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IColumn, ITask } from "./Board";
import { useFetch } from "../hooks/useFetch";
import { Draggable, Droppable } from "react-beautiful-dnd";

type IProps = {
	column: IColumn;
	addTask(id: string): void;
	removeTask(id: string): void;
	removeColumn(id: string): void;
};

export function Column({
	column,
	addTask,
	removeTask,
	removeColumn,
}: IProps): React.ReactElement {
	const { id, title, limitedTasksNum, tasks } = column;
	const onTaskAdd = () => {
		addTask(id);
	};

	const onColumnRemove = () => {
		removeColumn(id);
	};
	return (
		<div className="Column">
			<div className="columnForm">
				<input type="text" defaultValue={title} />
				<select
					className="limitSelectForm"
					name="limit"
					defaultValue={limitedTasksNum}
					// onChange={onChange}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
					<option value="8">8</option>
					<option value="none" selected>
						None
					</option>
				</select>
				<button className="columnDelButton" onClick={onColumnRemove}>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
			{tasks.map((task, index) => (
				<Draggable key={task.id} draggableId={task.id} index={index}>
					{(provided, snapshot) => (
						<div
							className="taskWrap"
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							style={{
								...provided.draggableProps.style,
								opacity: snapshot.isDragging ? "0.5" : "1",
							}}>
							<Task key={task.id} task={task} removeTask={removeTask} />
						</div>
					)}
				</Draggable>
			))}
			<button className="TaskAddButton" onClick={onTaskAdd}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	);
}
