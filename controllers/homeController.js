
exports.goHome = async (req,res) =>{
    try {
        res.json({
        0:`Master Branch is a social networking app that enables users to create accounts, build profiles`,
        1:`and engage in discussions on a centralized platform. Users can explore topics, create focused`,
        2:`branches, and enjoy direct messaging for open and encrypted conversations. With its flexible`,
        3:`structure, Master Branch fosters meaningful connections and empowers users to exchange ideas`,
        4:` in a dynamic and collaborative environment.`,
        createAnAccountHere:'localhost:3000/users/new',        
        loginHere:'/users/login'
            })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}