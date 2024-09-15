export type Tuple<T, MaxLength extends number = 10, Current extends T[] = []> = Current["length"] extends MaxLength
  ? Current
  : Current | Tuple<T, MaxLength, [T, ...Current]>;

export interface FilterOption {
  _id: string;
  count: number;
}

export type CountResult = {
  _id: string;
  count: number;
};

export type IssueMetadataCounts = {
  labelCount: CountResult[];
  languageCount: CountResult[];
};

export type FilterValues = {
  languages: string;
  labels: string;
  noAssignee: boolean;
};
