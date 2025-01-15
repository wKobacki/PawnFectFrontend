import "./AnimalOwner.css"

const AnimalOwner = ({ user, handleRemoval }) => {
    const renderAccessLevel = () => {
        switch(user.access_level){
            case 0:
                return "👑";
            case 1:
                return "📝";
            case 2:
                return "👀";
            default:
                return "?";
        }
    }

    return (
        <div className="animal-owner-container">
            <img
                alt="user zdjecie xddd"
                src={user.image ? user.image : "https://via.placeholder.com/64"}
                className="animal-owner-img"
            />
            <div className="animal-owner-details">
                <span>{user.username}</span>
                <span>{renderAccessLevel()}</span>
            </div>
            <button className="animal-owner-remove-btn" onClick={() => handleRemoval(user)}>
                Usuń
            </button>
        </div>
    )
}

export default AnimalOwner;
