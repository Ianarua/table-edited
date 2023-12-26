export interface tableData {
    tHead: tHead[],
    tBody: tBody[]
}

type tHead = {
    key: string,
    text: string,
    editable: boolean
}

type tBody = {
    id: number,
    name: string,
    age: number,
    chinese: number,
    math: number,
    english: number,
    [key: string]: number | string;
}

export interface editDataArgs {
    index: number,
    key: string,
    value: number | string,
    text: string
}

export interface stateType {
    key: string,
    value: number | string,
    index: number,
    text: string
}