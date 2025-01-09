const Person = ({ person }) => {
    return (
      <p style={{ margin: 0, lineHeight: '1.2' }}>{person.name}: {person.number}</p>
    )
  }
  
  export default Person