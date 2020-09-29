const app = require("express")()
const admin = require("firebase-admin");
const serviceAccount = require("./react-my-mini-blog-firebase-admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-my-mini-blog-2ac12.firebaseio.com"
});

// TO RUN THIS FILE AND CHECK BASIC CONCEPTS:
// 1. Navigate to folder in terminal and run node server.js
// 2. In browser navigate to localhost:4000/setAdmin and the terminal
// ...should say 'done'. This is because of ***
// 3. Then navigate to localhost:4000/getAdmin and the terminal should say 
// ... whether the user is an admin or not
// 4. change the value set in setAdmin again and continue to test the concept

app.get('/setAdmin', async () => {
    admin.auth().setCustomUserClaims('MXgzzIVO28VaWPvYriyrQy7VmPU2', { admin: false })
        .then(() => console.log('done'))
    // *** this part here, which hard codes admin: false on custom claims of this
    //user id
})

app.get('/getAdmin', async () => {
    admin.auth().getUser('MXgzzIVO28VaWPvYriyrQy7VmPU2').then((userRecord) => {
        let admin = userRecord.customClaims['admin']
        if (admin) {
            console.log('User is admin')
        } else {
            console.log('User is not admin')
        }
    });
})


app.listen(4000, () => console.log('listening on port 4000'))