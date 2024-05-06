export class Poi {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public description: string,
    public active: boolean,
    public creator: User,
    public reports: Report[],
    public surveys: Survey[],
    public votings: Voting[],
    public comments: Comment[],
    public voting: Voting[],
    public titel: string,
    public answerer: User
  ) {}
}

export class User {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public name: string,
    public surname: string,
    public dob: Date | null,
    public email: string,
    public password: string,
    public verified: boolean
  ) {}
}

export class Report {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public kommentar: string,
    public title: string,
    public reporter: User,
    public reportedUser: User,
    public reportedPoi: string,
    public reportedComment: Comment
  ) {}
}

export class Survey {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public titel: string,
    public beschreibung: string,
    public expiresAt: string,
    public creator: User,
    public poi: string
  ) {}
}

export class Voting {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public voteType: string,
    public votedSurvey: Survey,
    public votedComment: Comment,
    public votedPoi: string,
    public voter: User
  ) {}
}

export class Comment {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public commentComment: string,
    public commenter: User,
    public poI: string,
    public votings: string[],
    public comments: string[],
    public reports: string[],
    public voting: string[],
    public actualcomment: string
  ) {}
}
