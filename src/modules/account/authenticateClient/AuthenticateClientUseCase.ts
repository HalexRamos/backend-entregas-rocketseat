import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateUserUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error('Username or password invalid!')
        }

        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error('Username or password invalid!')
        }

        const token = sign({username}, '06815bd40fd200990fda809fe2166a35', {
            subject: client.id,
            expiresIn: '1d'
        })

        return token
    }
}