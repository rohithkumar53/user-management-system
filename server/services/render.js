const axios=require("axios");
exports.homeRoutes=(req,res)=>{
    axios.get(`${process.env.API}/api/users`)  // "http://localhost:3000/api/users"
        .then(response=>{
            res.render("index",{users:response.data});
        })
        .catch(err=>{
            res.status(500).send({message:"error has occured"});
        })

};
exports.add_user=(req,res)=>{
    res.render("add_user");
}
exports.update_user=(req,res)=>{
    axios.get(`${process.env.API}/api/users`,{params:{id:req.query.id}})
        .then(response=>{
            console.log(response.data);
            res.render("update_user",{user:response.data});
        })    
        .catch(err=>{
            res.status(500).send({message:"Error occured while updating"});
        })
}
