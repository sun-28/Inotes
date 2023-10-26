import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
export default function Login() {
	let navigate = useNavigate(); 
  const context = useContext(noteContext);
  const {setalert} = context;
    const [cred, setcred] = useState({email:"",password:""})
    const onchange = (e) => {
        setcred({...cred,[e.target.name]:e.target.value});
    }
	const handlesubmit = async (e) => {
		e.preventDefault();
		const response= await fetch('https://inote-backend-edbn.onrender.com/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(cred)
        	}
		)
		const json = await response.json();
		if(json.success){
			localStorage.setItem('token',json.authtoken)
			navigate('/');
      setalert({success: true,type:"success",msg:"Login Successful"})
      setTimeout(() => {
        setalert({success: false,type:"danger",msg:""})
      }, 3000);
		}
		else{
      setalert({success: true,type:"danger",msg:json.error})
      setTimeout(() => {
        setalert({success: false,type:"danger",msg:json.error})
      }, 3000);      
		}
	}
  return (
	<div className='mlogin'> 
    <form className="lform form" onSubmit={handlesubmit}>
      <h2 className='text-center lll'>Log In</h2>
  <span className="input-span">
  <label htmlFor="email" className="label">Email</label>
  <input type="text" name="email" onChange={onchange} value={cred.email} id="email"/></span>
  <span className="input-span">
  <label htmlFor="password" className="label">Password</label>
  <input type="password" name="password" onChange={onchange} value={cred.password} id="password"/></span>
  <button className="submit text-center" type="submit">Log in</button>
  <span className="span">Don't have an account? <Link to="/signup">Sign up</Link></span>
</form>
	</div>
  )
}
