import "reflect-metadata";
import {createConnection} from "typeorm";
import {createApplication, createConnectionOptions} from "./application";


createConnection(createConnectionOptions()).then(async connection => {
    // here you can start to work with your entities
   // const auth = User.newUser({email: "jp@fun.com", password: "myPassword", name: "JP B", gender: Gender.MALE})
   // const authSaved = await connection.manager.save(auth)
   // console.log(authSaved)

    const entityManager = connection.createEntityManager();
    const app = createApplication(entityManager);

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log(error));
