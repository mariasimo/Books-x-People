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
mutation($name:String!, $comment:String!, $author: String!, $recommendedBy: String!){
    addBook(name:$name, comment:$comment, author:$author, recommendedBy:$recommendedBy){
        name
        comment
        author
        recommendedBy
        id
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