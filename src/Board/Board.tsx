import React, { useCallback, useEffect, useState } from "react";
import { Column } from "./Column";
import { Title } from "./Title";
import "./Board.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { mockData } from "../db/mockData.js";

export type IColumn = {
	id: string;
	title: string;
	limitedTasksNum: number | undefined;
	tasks: ITask[];
};

export type ITask = {
	id: string;
	title: string;
	assigned: string;
	timeDeadline: string;
	dayDeadline: string;
};

type IBoardData = IColumn[];

export function Board(): React.ReactElement {
	const [boardData, setBoardData] = useState<IBoardData>(mockData);

	const addColumn = () => {
		const newColumn: IColumn = {
			id: uuidv4(),
			title: "Colmun title",
			limitedTasksNum: 4,
			tasks: [],
		};
		setBoardData(boardData.concat(newColumn));
	};

	const addTask = (id: string) => {
		const newTask: ITask = {
			id: uuidv4(),
			title: "Task name",
			assigned: "Assigned",
			timeDeadline: "",
			dayDeadline: "",
		};

		setBoardData(
			boardData.map((column) =>
				column.id === id
					? { ...column, tasks: column.tasks.concat(newTask) }
					: column
			)
		);
	};

	const removeTask = (id: string) => {
		setBoardData(
			boardData.map((column) => ({
				...column,
				tasks: column.tasks.filter((task) => task.id !== id),
			}))
		);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColIndex = boardData.findIndex(
				(e) => e.id === source.droppableId
			);
			const destinationColIndex = boardData.findIndex(
				(e) => e.id === destination.droppableId
			);

			const sourceCol = boardData[sourceColIndex];
			const destinationCol = boardData[destinationColIndex];

			const sourceTask = [...sourceCol.tasks];
			const destinationTask = [...destinationCol.tasks];

			const [removed] = sourceTask.splice(source.index, 1);
			destinationTask.splice(destination.index, 0, removed);

			boardData[sourceColIndex].tasks = sourceTask;
			boardData[destinationColIndex].tasks = destinationTask;

			setBoardData(boardData);
		}
	};

	return (
		<div className="Board">
			<Title />
			<DragDropContext onDragEnd={onDragEnd}>
				<div className="columnList">
					{boardData.map((column) => (
						<Droppable key={column.id} droppableId={column.id}>
							{(provided) => (
								<div
									className="columnWrap"
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<Column
										key={column.id}
										column={column}
										addTask={addTask}
										removeTask={removeTask}
									/>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
					<button className="columnAddButton" onClick={addColumn}>
						<FontAwesomeIcon icon={faPlus} /> <div></div>
					</button>
				</div>
			</DragDropContext>
		</div>
	);
}
