import UserNetworkRepository from "../repositories/network/UserNetworkRepository"

const get = () => {
    return UserNetworkRepository.get()
}

const UserService = {
    get,
}

export default UserService