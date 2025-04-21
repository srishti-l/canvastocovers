const ArtworkCard = ({id, title, url, detailHandler, onError}) => {

    return (
        <>
            <img src={url} className="logo" alt={`image of ${title}`} width={'40%'} onClick={detailHandler} />
            
        </>
    )

}

export default ArtworkCard; 