import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register = async(req, res) => {
    const {username, email, password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword)
      
        const newUser = await prisma.user.create({
          data:{
              username,
              email,
              password: hashedPassword
          }
        })
        console.log(newUser)
      
        res.status(201).json({message:"User Created succesfully!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Filed to create user"})
    }
}

export const login = async(req, res) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where:{username}
        })

        if(!user) return res.status(401).json({message:"Invalid credentials!"})

        const isPasswordValid = await bcrypt.compare(password, user.password)   
        
        if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials!"})


        const age = 1000 * 60 * 60 * 24 * 7;

            const token = jwt.sign(
                {
                  id: user.id,
                  isAdmin: false,
                },
                  process.env.JWT_SECRECT_KEY, 
                { expiresIn: age }
        );

            const {password: userPassword, ...userInfo} = user;

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            maxAge: age
        })
        
        .status(200)
        .json(userInfo)    
        console.log(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Failed to login!"})
    }
    }
    

export const logout = (req, res) => {
res.clearCookie("token").status(200).json({message:"Logout succesful"})
}