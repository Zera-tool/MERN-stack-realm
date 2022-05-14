const StudentInfo = ({studentProfile}) => {
    
    const {
        adress, 
        email, 
        postal_code,
        city, 
        phonenumber, 
        instrument, 
        background,
    } = studentProfile

    return (
        <>
            <div>Adress: {adress} - {postal_code} - {city}</div>
            <div>Phone: {phonenumber}</div>
            <div>Mail: {email}</div>
            <div>Instrument: {instrument}</div>
            <div>Background: {background}</div>
        </>
    )
}

export default StudentInfo