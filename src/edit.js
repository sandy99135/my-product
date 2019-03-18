import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
	const [ user, setUser ] = useState(props.currentUser)

	const handleInputChange1 = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}
    useEffect(
        () => {
          setUser(props.currentUser)
        },
        [ props ]
      )
	return (
		<form
			onSubmit={event => {
				event.preventDefault()

				props.updateUser(user.id, user)
			}}
		>
			
			<input type="text" name="username" value={user.prenom} onChange={handleInputChange1} /><br></br>
			<button  >Ok</button>
			<button onClick={() => props.setEditing(false)} className="button muted-button">
				Cancel
			</button>
		</form>
	)
}

export default EditUserForm