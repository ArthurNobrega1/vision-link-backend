interface IUserDTO {
    _id: string 
    fullName: String
    username: String
    email: String
    phone: String
    password: String
    avatar?: String | null
    createdAt?: Date
    updatedAt?: Date
}

export default IUserDTO