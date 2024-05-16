export interface Comment {
        id: string,
        createdAt: Date,
        updatedAt: Date,
        votings: string[],
        comments: string[],
        reports: string[],
        voting: string[],
        actualcomment: string,
}