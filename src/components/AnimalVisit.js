import "../styles/AnimalVisit.css";

const AnimalVisit = ({ visit, handleRemove }) => {
    const parseDate = (visitDate) => {
        const splitted = visitDate.split('T');
        const day = splitted[0];
        const hour = splitted[1].split('.')[0];
        return day + " " + hour;
    }
    return (
        <div className="animal-visit">
            <span>
                <strong>Data wizyty:</strong> {parseDate(visit.visit_date)}
            </span>
            <span>
                <strong>Opis:</strong> {visit.notes}
            </span>
            <span>
                <strong>Powód:</strong> {visit.visit_type}
            </span>
            <button onClick={() => handleRemove(visit)}>Usuń wizyte</button>
        </div>
    )
}

export default AnimalVisit;
