import Http from "../../utils/Http"

const get = () => {
    return Http.get('/users')
}

const UserNetworkRepository = {
    get,
}

export default UserNetworkRepository