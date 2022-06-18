export interface Todo {
    id : number;
    title : string;
    isDone : boolean;
}

export type TodoActions = 
{ type: 'add-task', payload: {name: string}} |
{ type: 'delete-task', payload: {id: number}} |
{ type: 'edit-task', payload: {id: number, title: string}} |
{ type: 'complete-task', payload: {id: number}} 
// this literal strings in the enum act as an enum