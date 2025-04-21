const Recommender = () => {
    return (
        <>
            <button
                className='btn btn-sm btn-danger done'
                type="button"
                // onClick={book}
                > Find Books </button> 
                {/* generate a book */}

            <button
                className='btn btn-sm btn-danger done'
                type="button"
                // onClick={art}
                > Find Similar Artworks</button>
                {/* generate some similar artworks */}

        </>
    )

}

export default Recommender;