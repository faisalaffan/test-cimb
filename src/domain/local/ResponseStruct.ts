export class ResponseStruct {
    code: string = ''
    success: boolean = false
    message: string = ''
    data: Array<any> = []
    error: Array<any> = []
    pagination: any = null
    constructor(payload: Partial<ResponseStruct>) {
        this.code = payload.code || this.code
        this.success = payload.success || this.success
        this.message = payload.message || this.message
        this.data = payload.data || this.data
        this.error = payload.error || this.error
        this.pagination = payload.pagination || this.pagination
    }
}

export const ResponseTimeout = () => {
    const response = new ResponseStruct({
        code: '400',
        success: false,
        message: 'Timeout Get Request Kelamaan From Frontend',
        data: [],
        error: [],
        pagination: null,
    })
    return response
}
