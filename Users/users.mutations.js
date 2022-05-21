import client from "../client"
import bcrypt from "bcrypt"
import e from "express";

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
        }
    }
    
}