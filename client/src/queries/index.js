// GraphQL Query Language looks like JS but is not
// So we need help to parse it 
import { gql } from 'apollo-boost'

const GET_BOOKS = gql`
{
    books {
        name
        id
        author
        comment
        recommendedBy
        width
        height
    }
}
`

const GET_AUTHORS = gql`
{
    authors{
        name
        id
    }
}
`

const ADD_BOOK=gql`
mutation(
    $name:String!, 
    $comment:String!, 
    $author: String!, 
    $recommendedBy: String!,
    $moderated: Boolean!,
    $published: Boolean!,
    $width: String!,
    $height: String!,
    ){
    addBook(
        name:$name, 
        comment:$comment, 
        author:$author, 
        recommendedBy:$recommendedBy,
        moderated: $moderated,
        published: $published,
        width: $width,
        height: $height
    ){
        recommendedBy
    }
}
`

const ADD_USER=gql`
mutation($name:String!){
    addUser(name:$name){
        name
        id
    }
}
`

const GET_BOOK_DETAILS=gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

export {
    GET_BOOKS,
    GET_AUTHORS,
    ADD_BOOK,
    ADD_USER,
    GET_BOOK_DETAILS
}