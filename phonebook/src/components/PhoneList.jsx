const PhoneList = ({persons, delFunctions}) => {
    //delFunctions is an array of tuples like this: [delete function, corresponding person object reference?]
    
    function findDelFunction(person) {
        const funct = delFunctions.find( f => f[1] === person)
        return funct[0]
    }
        
    return (
        <div>
            {persons.map( p =>
            <p key={p.id}>{p.name} {p.number}<button onClick={findDelFunction(p)}>Delete</button></p>
            )}
        </div>
    )
}

export default PhoneList