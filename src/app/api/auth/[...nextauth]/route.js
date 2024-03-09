import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import User from "@/models/user";
import { signJwtToken } from "@/lib/jwtSign";
import bcrypt from 'bcrypt'
import { dbConnect } from "@/lib/dbConnect";
import { userAgent } from "next/server";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {label: 'Email', type: 'text', placeholder: 'JohnDoe@example.com'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                const {email, password} = credentials

                await dbConnect()
                                
                const user = await User.findOne({ email })

                if(!user){
                    throw new Error("Invalid input")
                }

                const comparePass = await bcrypt.compare(password, user.password)

                if(!comparePass){
                    throw new Error("Invalid input")
                } else {
                    const {password, ...currentUser} = user._doc

                    const accessToken = signJwtToken(currentUser, {expiresIn: '1d'})

                    return {
                        ...currentUser,
                        accessToken
                    }
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}){
            if(user){
                
                token.accessToken = user.accessToken
                token.user=user
            }

            return token
        },
        async session({session, token}){
            if(token){
                session.user = token.user
                session.user.accessToken = token.accessToken
            }

            return session
        }
    }
})

export {handler as GET, handler as POST}