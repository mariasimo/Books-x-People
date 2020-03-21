// aqui definimos nuestro schema, que describe la estructura y tipo de nuestros datos
// los object types, sus relaciones y como podemos interactuar con los datos
const graphql = require('graphql');

const Book = require('../models/Book.model')
const Tag = require('../models/Tag.model')

// tenemos dos object types, books and authors
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLList
} = graphql;


// Cada tipo es una nueva instancia de GraphQLObjectType
// Es una función que toma como parámetro un objecto, que define la estructura

const BookType = new GraphQLObjectType({
  name: 'Book',
  // field se envuelve en una función para que este todo disponible al cargar el archivo gracias al hoisting
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    comment: {type: GraphQLString},
    author: {type: GraphQLString},
    recommendedBy: {type: GraphQLString},
    moderated: {type: GraphQLBoolean},
    published: {type: GraphQLBoolean},
    height: {type: GraphQLString},
    width: {type: GraphQLString},
    tags: {type: GraphQLList(TagType)}
  })
});

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})

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
    books: {
        // Cuando quiera trabajar con arrays tengo que usar GraphQLList
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return Book.find()
        }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args){
          return Tag.find()
      }
    }
  }
});


// Mutations in graphql are what allow us to change our data: delete, add, editiing...
// We need to explicity define our mutations, in the same kind of way we defined our RootQuery
const Mutations = new GraphQLObjectType({
  name: 'Mutation', 
  fields: {
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        recommendedBy: { type: GraphQLNonNull(GraphQLString) },
        moderated: {type: GraphQLBoolean},
        published: {type: GraphQLBoolean},
        width: {type: GraphQLString},
        height: {type: GraphQLString}
      },
      resolve(_, args){
        let book = new Book({
          name: args.name,
          comment: args.comment,
          recommendedBy: args.recommendedBy,
          author: args.author,
          moderated: args.moderated,
          published: args.published,
          width: args.width,
          height: args.height,
        });
        return Book.create(book)
      }
    },
    addTag: {
      type: TagType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        let tag = new Tag({
          name:args.name
        });
        return Tag.create(tag)
      } 
    }

  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
