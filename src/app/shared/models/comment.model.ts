import { Voting } from "../../core/models/partiBremen.model";

export interface Comment {
        id: string,
        createdAt: Date,
        updatedAt: Date,
        votings: Voting[],
        comments: string[],
        reports: string[],
        voting: string[],
        actualcomment: string,
}
