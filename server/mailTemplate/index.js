module.exports = {
    templateNotification: (book, tags) => { return ` 
<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <title>
          Books x People Notification
        </title>
    </head>
        <body>
            <div>
                <p>Hi,</p>
                <p>Someone has submitted a new book at Books x People! Nice.</p>
                <p>These are the data:</p>
                <h3>Title:${book.name}</h3>
                <p>Author: ${book.author}</p>
                <p>Comment: ${book.comment}</p>
                <p>Tags: ${tags}</p>
                <p>Recommended by ${book.recommendedBy}</p>
    
                <a href="http://localhost:3000/approved/${book.id}">Ok, publish it!</a></p>
                <p>Best!</p>
            </div>
        </body>
    </html>`
    }
}
