import express from "express";

import { MongoClient,ServerApiVersion } from "mongodb";

const app=express();

const uri = "mongodb+srv://ayajansari:mongodb_ayaj@cluster1.g2wrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
//above uri is from node.js drive connection string from mongodb atlas

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // Send a ping to confirm a successful connection
    const db=client.db("blog");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
    // Ensures that the client will close when you finish/error
    const coll=await db.listCollections().toArray();
    console.log("collections :",coll);

    const posts = await db.collection("posts").find({}).toArray();
    console.log("Posts:", posts);
    // await client.close();
  
}
run().catch(console.dir);

app.listen(3001,()=>{
    console.log(`server is running on port ${3001}`);
})

