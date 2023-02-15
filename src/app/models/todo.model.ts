import { Translation } from "./translation.model";

export class Todo {
    id!: number;
    title!: string;
    description!: string;
    user_id!: number;
    status!: string;
    role!: number;
    createdAt!: string;
    translation!: Translation;
}
