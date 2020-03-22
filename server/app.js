require( 'dotenv' ).config()
const express   = require('express')
const schema    = require('./schema/schema')
const mongoose  = require('mongoose')
const cors      = require('cors');
const path         = require('path');


//Connect to db 
mongoose.connect(process.env.DBSTR,
{ useUnifiedTopology: true,
    useNewUrlParser: true 
})
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})

// Express-graphQL es un modulo permite a express entender graphql
// Provee un método sencillo de montar un servidor 
// express que corra la api de graphql
// Usamos esta const como middleware de una única ruta
// para interactuar con los datos de graphql

// Cuando usamos graphql tenemos un único super endpoint
// al que mandamos todos los queries de graphQL
const graphqlHTTP = require('express-graphql')

const app = express();

app.use(cors());


// Cuando alguien haga una petición a esta ruta, cedemos el control del request a express graphql
// Para ello, usamos la fn graphqlHTTP(). Este middleware debe tener como parámetro un schema, que 
// da instrucciones sobre la estructura y el tipo de nuestros datos
// El objetivo de este servidor de graphql es hacer peticiones a diferentes puntos del graph
// y para ello necesita saber como es nuestro graph, y lo hace mediante el schema
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
