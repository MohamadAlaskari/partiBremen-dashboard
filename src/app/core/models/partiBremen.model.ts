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
    public role: string | null,
    public active: boolean
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
    public titel: string
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
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public voteType: string,
    public votedSurvey: Survey | null,
    public votedComment: Comment | null,
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
    public poi: Poi,
    public votings: string[],
    public comments: string[],
    public reports: string[],
    public actualComment: string
  ) {}
}
