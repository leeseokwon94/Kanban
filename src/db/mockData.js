import { v4 as uuidv4 } from "uuid";

export const mockData = [
	{
		id: uuidv4(),
		title: "Column title",
		limitedTasksNum: 4,
		tasks: [
			{
				id: uuidv4(),
				title: "Task name1",
				assigned: "Assigned",
				timeDeadline: "14:00",
				dayDeadline: "2022-12-01",
			},
			{
				id: uuidv4(),
				title: "Task name2",
				assigned: "Assigned",
				timeDeadline: "14:00",
				dayDeadline: "2022-12-01",
			},
		],
	},
	{
		id: uuidv4(),
		title: "Column title",
		limitedTasksNum: 4,
		tasks: [
			{
				id: uuidv4(),
				title: "Task name3",
				assigned: "Assigned",
				timeDeadline: "14:00",
				dayDeadline: "2022-12-01",
			},
			{
				id: uuidv4(),
				title: "Task name4",
				assigned: "Assigned",
				timeDeadline: "14:00",
				dayDeadline: "2022-12-01",
			},
		],
	},
];
