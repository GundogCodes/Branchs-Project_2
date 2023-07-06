
exports.goHome = async (req,res) =>{
    try {
        res.json({
        a:`Master Branch is a social networking app that enables users to create accounts, build profiles`,
        b:`and engage in discussions on a centralized platform. Users can explore topics, create focused`,
        c:`branches, and enjoy direct messaging for open and encrypted conversations. With its flexible`,
        d:`structure, Master Branch fosters meaningful connections and empowers users to exchange ideas`,
        e:`in a dynamic and collaborative environment.`,
        createAnAccountHere:'localhost:3000/users/new',        
        loginHere:'/users/login'
            })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}