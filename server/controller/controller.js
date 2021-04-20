var Userdb = require("../model/model");

//create and save a new user
exports.create=(req,res)=>{
// validate request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }
    //new user
    const user= new Userdb({
        name: req.body.name,
        email:req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save the user to the database
    user
        .save(user)
        .then(data =>{
            // res.send(data);
            res.redirect("/add-user");
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Some error occured while creating the create operation "});
        });
}

// retrieve all users or single user
exports.find=(req,res)=>{
    if(req.query.id){
        Userdb.findById(req.query.id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Error occured , maybe id not present"});
                }
                else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error occured while finding opeartion"});
            })
    }
    else{
        Userdb.find()
        .then(users=>{
            res.send(users)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error occured while retreiving users information"});
        })
    }
    
}

// update a user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message: "Data to update cannot be empty"});
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with id ${id} Maybe not found`});
            }
            else{
                res.send(data);
                // alert("Data updated successfully");
                

            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error occured updating"});
        })
}
// delete a user by user id specified in the request
exports.delete=(req,res)=>{
    const id= req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete with id ${id} Maybe id is wrong`});
            }
            else{
                res.send({message:"User deleted successfully"});
                
            }
            
        })
        .catch(err=>{
            res.status(500).send({message:`Could not delete the user with id ${id}`});
        });
}