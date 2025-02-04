const Person = ({ person, removePerson }) => {
    return (
      <p style={{ margin: 0, lineHeight: '1.2' }}>
        {person.name}: {person.number}  
        <button onClick={removePerson} style={{ marginLeft: '10px' }}>delete</button>
      </p>
    )
  }
  
  export default Person