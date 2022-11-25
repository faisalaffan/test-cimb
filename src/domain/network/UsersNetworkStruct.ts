export class UserNetworkStruct {
    id: Number = 1
    name: string = ''
    email: string = ''
    gender: string = ''
    status: string = ''

    constructor(input: Partial<UserNetworkStruct>) {
        this.id = input.id || this.id;
        this.name = input.name || this.name;
        this.email = input.email || this.email;
        this.gender = input.gender || this.gender;
        this.status = input.status || this.status;
    }
}

export class UserNetworkStructPayload {
    name: string = ''
    email: string = ''
    gender: string = ''
    status: string = ''

    constructor(input: Partial<UserNetworkStructPayload>) {
        this.name = input.name || this.name;
        this.email = input.email || this.email;
        this.gender = input.gender || this.gender;
        this.status = input.status || this.status;
    }
}