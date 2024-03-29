const jwt = require('jsonwebtoken')
const shortId = require('shortid')
const secret = "Hellow Helllo Hellloo/\\"

function verify(req, res, next){
    jwt.verify(req.body.token, secret, function(err, decoded) {
        if (err) return res.status(400).send({ message: 'Failed to authenticate token.' });
        
        req.user = decoded.address
        next()
    });
}

module.exports = function (app, dbe){
    const db= dbe.collection('SkejjProject')
    const user = dbe.collection('SkejjUsers')

    app.post('/login', (req, res)=>{
        const address = req.body.address
        if(address){
            user.findOne({address}, (err,doc)=>{
                if(doc){
                    var token = jwt.sign({email: doc.email, address} , secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.json({message: "User registered", data: doc, token})
                }else{
                    res.status(400).json({message:"User not yet registered"})
                }
            })
        }else{
            res.status(400).json({message:"Address missing", error:true})
        }
    })

    app.post('/register', (req,res)=>{
        const {address, email, firstName, lastName, location} = req.body
        if(address && email && firstName && lastName && location){
            var token = jwt.sign({email: email, address} , secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            user.insertOne({address, email, firstName, lastName, location, balance}, (err, docs)=>{
                res.json({message:"registered successfully", token})
            })
        }else{
            res.status(400).json({message: "One or more required fields not provided", error:true})
        }
    })

    app.post('/addProject',verify, (req, res)=>{
        const {name, pictures, description, reason, tier1, tier2, tier3, time, preview } = req.body
        if(name && pictures && description && reason){
            const id = shortId.generate()
            db.insertOne({name, user: req.user, id, pictures, time, description,preview, reason, tier1, tier2, tier3, goal, current:0}, (err,doc)=>{
                res.json({message:"Project created successfully",name, id })
            })
        }else{
            res.status(400).json({error:true, message:"One or more required fields not provided"})
        }
    })

    app.get('/listProjects',verify, (req,res)=>{
        const data = db.find().toArray()
        res.json({data})
    })

    app.post('/project', verify, (req,res)=>{
        const id = req.body.id
        if(id){
            db.findOne({id}, (err,doc)=>{
                if(doc){
                    res.json({message:"Found successfully", data:doc})
                }else{
                    res.status(400).json({message:"Incorrect Id"})
                }
            })
        }else{
            res.status(400).json({error:true, message: "No id given"})
        }
    })

    app.post('/user', verify, (req, res)=>{
        const address = req.body.address
        if(address){
            user.findOne({address}, (err,doc)=>{
                if(doc){
                    json({message: "User registered", data: doc})
                }else{
                    res.status(400).json({message:"User not yet registered"})
                }
            })
        }else{
            res.status(400).json({message:"Address missing", error:true})
        }
    })

    app.post('/addBalance', verify, (req,res)=>{
        const address = req.body.address
        if(address){
            user.findOne({address}, (err,doc)=>{
                if(doc){
                    user.findOneAndUpdate({address}, { $add: {balance: req.body.amount} })
                    res.json({message: "Balance Updated", data: doc})
                }else{
                    res.status(400).json({message:"User not yet registered"})
                }
            })
        }else{
            res.status(400).json({message:"Address missing", error:true})
        }
    })

    app.post('/reduceBalance', verify, (req,res)=>{
        const address = req.body.address
        if(address){
            user.findOne({address}, (err,doc)=>{
                if(doc){
                    user.findOneAndUpdate({address}, { $add: {balance: req.body.amount*-1} })
                    res.json({message: "Balance Updated", data: doc})
                }else{
                    res.status(400).json({message:"User not yet registered"})
                }
            })
        }else{
            res.status(400).json({message:"Address missing", error:true})
        }
    })
}