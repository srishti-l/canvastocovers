const BookCard = ({title, thumbnail, author, description }) => {
    return (
        <div className="book">
            <img src={thumbnail} alt="book"></img>
            <h4>{title}</h4>
            <p>By {author}</p>
            {/* <h4>Book Description</h4>
            <p>{description}</p> */}
        </div>
    )
}

export default BookCard; 