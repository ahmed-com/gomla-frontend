export type TableHeader = {
    text: string,
    sortable: boolean,
    key: string,
}

export type TableRow = {
    id: string | number,
    view?: Function,
    avatar?: string,
    img?: string,
    textData: (string | number)[],
    state?: TableRowState,
    actions?: TableRowAction[],
}

type TableRowState = {
    text: string,
    color: string,
}

type TableRowAction = {
    icon: string,
    text: string,
    handle: Function,
}