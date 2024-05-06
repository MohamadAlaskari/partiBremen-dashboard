export class Comment {
    constructor(
        public id: string,
        public createdAt: string,
        public updatedAt: string,
        public votings: string[],
        public comments: string[],
        public reports: string[],
        public voting: string[],
        public actualcomment: string,
    ) {}
}