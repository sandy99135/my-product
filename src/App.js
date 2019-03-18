import { confirmAlert } from 'react-confirm-alert'; // Import 
import './App.css';
import React, { useState ,useEffect } from 'react';
import './App.css';
import './bootstrap/dist/css/bootstrap.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

const App = () => {
	const usersData = [ ]
	const initialFormState = { id: null, name: '', username: '' }

	const [ users, setUsers ] = useState(usersData)
	const [count, setCount] = useState(0);
	const [ currentUser, setCurrentUser ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

  const addUser = user => {
		user.id = count
		setUsers([ ...users, user ])
  }
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
    
	}
	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	}
	const editRow = user => {
		
		setEditing(true) 

		setCurrentUser({ id:user.id,name:user.name,username: user.username })
	}
	return (
		<div  className="container">
			<div className="flex-row">
				<div className="flex-large">
          <AddUserForm addUser={addUser} setCount={setCount} count={count}/>
				</div>
	 			<div className="flex-large">
          <UserTable users={users} deleteUser={deleteUser} updateUser={updateUser} editRow={editRow} setCurrentUser={setCurrentUser} currentUser={ currentUser} editing={editing} />
		  
				</div>
			</div>
		</div>
	)
}
const UserTable = props => {
	const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
	)
	const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
	}
	
	return(
	
	<div >
		<table  className="table">
			<thead className="thead-dark">
				<tr>
					<th className="lit" scope="col">Id</th>
					<th scope="col">Produits</th> 
					<th scope="col">Prix</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
			{  ( props.users.length >= 0 )? (
					props.users.map(user => (
						<tr key={user.id}>
						<td scope="col">{user.id}</td>
							<td>{user.name[0].toUpperCase()+user.name.split("").splice(1).join("").toLowerCase()}</td>
							<td id="td">{user.username}</td>
							<td>
							<button className="btn btn-danger" onClick={() => {
												confirmAlert({
													title: 'Supression Produit',
													message: user.name,
													buttons: [
														{
															label: 'OUI',
															onClick: () => props.deleteUser(user.id),
															className:" btn btn-danger"
														},
														{
															label: 'NON',
															onClick: () => ''
														}
													]
												})
											}
	
	
							}>X</button>
							<button className="btn btn-success" onClick={() => {
						 document.getElementById("aff").style.display="block"
						 props.editRow(user) 
							}
							}>Edit</button>
							</td>
						</tr>
					))
				) : (
					<tr>
					</tr>
				)}
			</tbody>
		</table>
		<div id="aff" className="container">
			<form 
				onSubmit={event => {
					event.preventDefault()
					if(isNaN(user.username)||document.getElementById("in").value ==' '){
						document.getElementById("aff").style.display="block"
						document.getElementById("aff3").innerHTML="entrer un nombre"
						document.getElementById("in").style.border="solid red"
					}
					else{
					
						props.updateUser(user.id, user)
						document.getElementById("aff").style.display="none"
						document.getElementById("aff3").innerHTML=" "
					}
					
				}}
			>
				
		
				<input type="text" id="in" name="username" value={user.username} onChange={handleInputChange} /><br></br>
				<span id="aff3" className=" text text-danger"></span><br></br>
				<button className="btn btn-success" id="buton">OK</button>
				<button id="buton"onClick={() =>{
				 document.getElementById("aff").style.display="none"
				
				}
					
				
			 } className="button muted-button">
				 Annuler
				</button>
			</form></div>
		
			<button onClick={()=>{
					
						let total=0;
						for(let i=0;i<props.users.length;i++){
								total=total+parseInt(props.users[i].username);
						}
						 let a=[total]
			 
					var numberFormat = new Intl.NumberFormat("es-ES");
						var formatted = a.map(numberFormat.format);
			 
						document.getElementById("total").innerHTML= formatted.join(";")
						}
			
				
		
	} className="button muted-button">
				TOTAL
				</button>
				<div id="aff4">
				<h2>TOTAL = <span id="total"></span> AR</h2>	
					</div>	
		</div>)
	
}
const AddUserForm = props => {
  const initialFormState = { id: null, name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}
	return (
		<div  className="container">
			<form onSubmit={event => {
      event.preventDefault()
      if (!user.name || !user.username) return
			if(!isNaN(user.username)){
				props.addUser(user)
				props.setCount(props.count + 1)
				setUser(initialFormState)
				document.getElementById("aff2").innerHTML=" "
			}
			
			else {
				document.getElementById("aff2").innerHTML="entrer un nombre"
			}
		
		
    }}>
			<table  className="table">
			<tr key={user.id}>
			<td scope="col"><label id="buton">Produit</label></td>
			<td scope="col"><input id="buton" type="text" name="name" value={user.name} onChange={handleInputChange} /></td>
			<td scope="col"><label id="buton">Prix</label></td>
			<td scope="col"><input id="buton" id="g"type="text" name="username" value={user.username} onChange={handleInputChange}  />Ar</td>
			<td scope="col"><button class="btn btn-success" id="buton">Ajouter</button><br></br></td>
			</tr>
			</table>
			
			<span id="aff2" className=" text text-danger"></span>
		</form></div>
	
	)
}

  export default App;

	