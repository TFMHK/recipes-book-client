export class Permission{
    constructor(public username, public permissions:Permissions){}
}

export enum Permissions{
    EDIT,
    WATCH
}