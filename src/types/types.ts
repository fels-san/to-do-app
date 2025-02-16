export type TaskType = {
  id: string;
  text: string;
  description: string;
  creationDate: string;
  deadline: string;
  status: "active" | "completed";
};

type SortOrder = "ascending" | "descending";

export type SortType = {
  sortName: "creation date" | "priority" | "deadline" | "status";
  order: SortOrder;
};

export type TabType = "all" | "active" | "completed";
