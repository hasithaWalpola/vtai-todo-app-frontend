import { Translation } from "./translation.model";

export class Todo {
    title!: string;
    description!: string;
    user_id!: number;
    status?: string;
    role!: number;
    translation!: Translation;
    constructor() { }
}
