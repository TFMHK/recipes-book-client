export class User{
    id:number;
    private _token: string;

    public get token() : string {
        if(!this._tokenExpirationDate || new Date > this._tokenExpirationDate)
            return null;
        return this._token;
    }

    
    public set token(v : string) {
        this._token = v;
    }
    
    
    constructor(public username: string, public email: string, public password:string, token: string, private _tokenExpirationDate: Date){
        this.id = Math.random() * 1000000000;
        this.token = token;
    }
}