// aqui definimos nuestro schema, que describe la estructura y tipo de nuestros datos
// los object types, sus relaciones y como podemos interactuar con los datos
const graphql = require('graphql');

const Book = require('../models/Book.model')
const Author = require('../models/Author.model')

// tenemos dos object types, books and authors
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


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
            return Author.findById(parent.authorId)
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
              return Book.find({authorId: parent.id})
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
        return Book.findById(args.id);
      }
    },
    author: {
        type: AuthorType,
        args: {id: {type: GraphQLID}},
        resolve(_, args) {
            return Author.findById(args.id); 
        }
    },
    books: {
        // Cuando quiera trabajar con arrays tengo que usar GraphQLList
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return Book.find()
        }
    },
    authors: {
        // Cuando quiera trabajar con arrays tengo que usar GraphQLList
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
            return Author.find()
        }
    }
  }
});


// Mutations in graphql are what allow us to change our data: delete, add, editiing...
// We need to explicity define our mutations, in the same kind of way we defined our RootQuery
const Mutations = new GraphQLObjectType({
  name: 'Mutation', 
  fields: {

    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve(_, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return Author.create(author)
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        authorId: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(_, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return Book.create(book)
      }
    }

  }
})




module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
