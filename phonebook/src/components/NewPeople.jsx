const NewPeople = ({nameValue, numberValue, nameOnChange, numberOnChange, onSmash}) => {
    return (
        <form>
        <div>
          name: <input
          value={nameValue}
          onChange={nameOnChange} />          
        </div>
        <div>
          number: <input
          value = {numberValue}
          onChange={numberOnChange} />
        </div>
        <div>
          <button type="submit" onClick={onSmash}>add</button>
        </div>
      </form>
    )
}

export default NewPeople