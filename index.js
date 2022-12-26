const express=require("express");
const cors=require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
const port=process.env.PORT || 5000;




app.get("/", (req, res)=> {
    res.send("Simple node server running...");
})

//midleware
app.use(cors());
app.use(express.json());

const users = [
    {id: 01, name: "mr. x", email: "mrx@gmail.com"}, 
    {id: 02, name: "mr. y", email: "mry@gmail.com"}, 
    {id: 03, name: "mr. z", email: "mrz@gmail.com"}
]; 

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection =client.db("simpleNode").collection("users");
        // const user={name: "Mr. xyz", email: "xyz@gmail.com"};
        // const result=await userCollection.insertOne(user);
        // console.log(result);

        //get 
        app.get("/users", async (req, res) => {
            const cursor=userCollection.find({});
            const users=await cursor.toArray();
            res.send(users);
        })

        //post
        app.post("/users", async (req, res) => {
            const user=req.body; 
            const result=await userCollection.insertOne(user);
            console.log(result);
            user._id=result.insertedId;
            res.send(user); 
        
        })
    } 
    finally {

    }
}

run().catch(err=>{console.log(err)});


// app.get("/users", (req, res) => {
//     console.log(req.query.name);
//     if(req.query.name)
//     {
//         //filter here
//         const searchQuery=req.query.name;
//         const filteredUsers=users.filter(user => user.name.indexOf(searchQuery) >=0);
//         res.send(filteredUsers);
//     }
//     else 
//     {
//         res.send(users);
//     }
    
// });

// app.post("/users", (req, res) => {
//     console.log("posst api is called");
//     const user=req.body; 
//     user.id=users.length+1;
//     users.push(user);
//     console.log(user);
//     res.send(user); 

// })

app.listen(port, () => {
    console.log(`Simple node server is running on port: ${port}`);
})

