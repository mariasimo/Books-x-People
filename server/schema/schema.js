// aqui definimos nuestro schema, que describe la estructura y tipo de nuestros datos
// los object types, sus relaciones y como podemos interactuar con los datos
const graphql = require('graphql');

// tenemos dos object types, books and authors
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//Dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
]
const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
]

// Cada tipo es una nueva instancia de GraphQLObjectType
// Es una función que toma como parámetro un objecto, que
// define la estructura de book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  // la propiedad field es una función para que cuando
  // tengamos varios tipos y estén relacionados entre ellos
  // este todo disponible al cargar el archivo gracias al hoisting
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
        type: AuthorType,
        resolve(parent, _){
            return authors.find(author => author.id === parent.authorId)
        }
    }
  })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    // la propiedad field es una función para que cuando
    // tengamos varios tipos y estén relacionados entre ellos
    // este todo disponible al cargar el archivo gracias al hoisting
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: { 
        // Instanciamos una lista de objectos de tipo BookType
          type: new GraphQLList(BookType),
          resolve(parent,_){
              return books.filter(book => book.authorId === parent.id)
          }
        }
    })
});


// Root Queries son la forma en la que el usuario salta al graph para solicitar datos
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // Cada uno de estos campos va a definir una root query
  fields: {
    // Este es el nombre del query que usamos desde el front end
    book: {
      type: BookType,
      // Esperamos que el usuario facilite una id como argumento
      // cuando haga la petición de los datos
      args: { id: { type: GraphQLID } },

      // Esta es la función que opera y devuelve los datos necesarios de la db
      resolve(_, args) {
        return books.find(book => book.id == args.id);
      }
    },
    author: {
        type: AuthorType,
        args: {id: {type: GraphQLID}},
        resolve(_, args) {
            return authors.find(author => author.id == args.id); 
        }
    },
    books: {
        // Cuando quiera trabajar con arrays tengo que usar GraphQLList
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return books
        }
    },
    authors: {
        // Cuando quiera trabajar con arrays tengo que usar GraphQLList
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            return authors
        }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
