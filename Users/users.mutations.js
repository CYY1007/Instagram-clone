import client from "../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default {
    Mutation:{
        createAccount: async (_,{firstName,lastName,username,email, password})=>
        {
            try{
                const existing = await client.user.findFirst
                ({
                    where:{ OR:[{username},{email}]}
                })
                console.log(existing);
                if (existing)
                    throw new Error("This username/email is already taken.")
                const hashedPass = await bcrypt.hash(password,10);
                return await client.user.create({
                    data:
                    {
                        username,email,
                        firstName,lastName,
                        password:hashedPass
                    }
                })
            }catch(error){
                return error;
            }
        },
        login: async (_,{username,password}) =>
        {
            const user = await client.user.findFirst({
                where:{username}
            })
            if (!user) {
                return {
                    ok:false,
                    error:"user is not found"
                }
            }
            const passwordOk = await bcrypt.compare(password,user.password);
            if (!passwordOk){
                return{
                    ok:false,
                    error:"password is wrong"
                }
            }
            const token = await jwt.sign({
                id:user.id},process.env.SECRET_KEY);
            return{
                ok: true,
                token
            }
        },
    }
    
}