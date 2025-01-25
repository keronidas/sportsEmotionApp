import { RESTUser } from "../interfaces/rest-user.interface"
import { User } from "../interfaces/user.interface"

export class UserMapper {

    static mapRestUserToUser(restUser: RESTUser): User {
        return {
            userId: restUser.id,
            name: restUser.name,
            username: restUser.username,
            email: restUser.email,
            phone: restUser.phone
        }
    }

    static mapRestUserArrayToUserArray(restUsers: RESTUser[]): User[] {
        return restUsers.map((task) => this.mapRestUserToUser(task))
    }
}