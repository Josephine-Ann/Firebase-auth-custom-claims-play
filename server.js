const app = require("express")()
const admin = require("firebase-admin");
const serviceAccount = require("./react-my-mini-blog-firebase-admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-my-mini-blog-2ac12.firebaseio.com"
});

app.get('/setAdmin', async () => {
    admin.auth().setCustomUserClaims('MXgzzIVO28VaWPvYriyrQy7VmPU2', { admin: false })
        .then(() => console.log('done'))
})

app.get('/getAdmin', async () => {
    admin.auth().getUser('MXgzzIVO28VaWPvYriyrQy7VmPU2').then((userRecord) => {
        console.log(userRecord.customClaims['admin']);
    });
})


app.listen(4000, () => console.log('listening on port 4000'))