// GraphQL Query Language looks like JS but is not
// So we need help to parse it 
import { gql } from 'apollo-boost'

const GET_BOOKS = gql`
{
    books {
        name
        id
        author
        width
        height
        createdAt
        tags{
            name
            id
        }
    }
}
`

const GET_TAGS = gql`
{
    tags{
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
    $tags: [ID!]!
    ){
    addBook(
        name:$name, 
        comment:$comment, 
        author:$author, 
        recommendedBy:$recommendedBy,
        moderated: $moderated,
        published: $published,
        width: $width,
        height: $height,
        tags: $tags
    ){
        id
        name
        comment
        author
        recommendedBy
        tags{
            name
            id
        }
    }
}
`



const ADD_TAG=gql`
mutation(
    $name:String!
    $moderated: Boolean!,
    $published: Boolean!,
    ){
    addTag(
        name:$name
        moderated: $moderated,
        published: $published
    ){
        id
    }
}
`


const GET_BOOK_DETAILS=gql`
    query($id:ID){
        book(id:$id){
            id
            name
            comment
            author
            recommendedBy
            published
            tags {
                name
                id
                moderated
                published
            }
        }
    }
`

const APPROVE_BOOK=gql`
mutation(
    $id:ID!
    ){
    approveBook(
        id:$id
    ){
        id
    }
}
`

const APPROVE_TAG=gql`
mutation(
    $id:ID!
    ){
    approveTag(
        id:$id
    ){
        id
    }
}
`



const DELETE_BOOK=gql`
mutation(
    $id:ID!
    ){
    deleteBook(
        id:$id
    ){
        id
    }
}
`

const DELETE_TAG=gql`
mutation(
    $id:ID!
    ){
    deleteTag(
        id:$id
    ){
        id
    }
}
`

export {
    GET_BOOKS,
    GET_TAGS,
    ADD_TAG,
    ADD_BOOK,
    GET_BOOK_DETAILS,
    APPROVE_BOOK,
    APPROVE_TAG,
    DELETE_BOOK,
    DELETE_TAG,
}