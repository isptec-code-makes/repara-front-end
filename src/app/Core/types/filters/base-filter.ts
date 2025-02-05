import {EnumData} from "../../interfaces/EnumData";

export type BaseFilter = {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    isDecsending?: boolean;
    search?: string;
    creationTime?: FilterDate;
    createdOn?: string;
    dataInicio?: string;
    dataFim?: string;
}


export enum FilterDate {
    Day = 1,
    Week,
    Month,
    Year
}

export const FilterDates: Array<EnumData> = [
    {
        id: 1,
        description: "Diario"
    },
    {
        id: 2,
        description: "Semanal"
    },
    {
        id: 3,
        description: "Mensal"
    },
    {
        id: 4,
        description: "Anual"
    },
];

export function RetornaFilterDate(id: number) {
    switch (id) {
        case 1:
            return FilterDates[0];
            break;
        case 2:
            return FilterDates[1];
            break;
        default:
            return null;
            break;
    }
}
