// src/app/shared/models/poi.model.ts
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
    public verified: boolean,
    public isDeleted: boolean,
    public role: string | null,
    public active: boolean,
    public blockStatus: string | null,
    public blockUntilDatum: Date | null,
    public img:string
  ) {}
}

export class Poi {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public description: string,
    public active: boolean,
    public latitude: number,
    public longitude: number,
    public creator: User,
    public reports: Report[],
    public surveys: Survey[],
    public votings: Voting[],
    public comments: Comment[],
    public titel: string,
    public img: string
  ) {}
}

export class Report {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public kommentar: string,
    public title: string,
    public reporterId: string,
    public reportedUserId: string | null,
    public reportedPoiId: string | null,
    public reportedCommentId: string | null,
    public status: 'PENDING' | 'DISMISSED' | 'RESOLVED' | 'REVIEWED'
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
    public voteType: string,
    public votedPoiId?: string,
    public voterId?: string,
    public voter?: User,
    public id?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public votedCommentID?: string,
    public votedComment?: Comment
  ) {}
}

export class Comment {
  constructor(
    public id: string,
    public createdAt: Date,
    public updatedAt: Date,
    public commentComment: string,
    public commenter: User,
    public poi: Poi,
    public votings: Voting[],
    public comments: Comment[],
    public reports: Report[],
    public actualcomment: string
  ) {}
}