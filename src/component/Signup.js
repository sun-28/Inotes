import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

export default function Signup() {
    let navigate = useNavigate();
    const context = useContext(noteContext);
  const {setalert} = context;
    const [cred, setcred] = useState({name:"",semail:"",spassword:"",repassword:""})
    const onchange = (e) => {
        setcred({...cred,[e.target.name]:e.target.value});
    }
	const handlesubmit = async (e) => {
		e.preventDefault();
        if(cred.spassword===cred.repassword){

            const creds = {name:cred.name,email:cred.semail,password:cred.spassword}
            const response= await fetch('https://inote-backend-edbn.onrender.com/api/auth/createuser',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body:JSON.stringify(creds)
        	}
            )
            const json = await response.json();
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                navigate('/login');
                setalert({success: true,type:"success",msg:"Account Created Successfully"})
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
        else{
            setalert({success: true,type:"warning",msg:"Password Doesn't Match"})
      setTimeout(() => {
        setalert({success: false,type:"warning",msg:"Password Doesn't Match"})
      }, 3000);
        }
	}
  return (
    <div className='mlogin'> 
    <form className="lform form" onSubmit={handlesubmit}>
    <h2 className='text-center lls'>Sign Up</h2>
  <span className="input-span">
  <label htmlFor="name" className="label">Name</label>
  <input type='text' name="name" onChange={onchange} value={cred.name} id="name"/></span>
  <span className="input-span">
  <label htmlFor="email" className="label">Email</label>
  <input type="text" name="semail" onChange={onchange} value={cred.semail} id="semail"/></span>
  <span className="input-span">
  <label htmlFor="password" className="label">Password</label>
  <input type="password" name="spassword" onChange={onchange} value={cred.spassword} id="spassword"/></span>
  <span className="input-span">
  <label htmlFor="repassword" className="label">Re-Enter Password</label>
  <input type="password" name="repassword" onChange={onchange} value={cred.repassword} id="repassword"/></span>
  <button className="submit" type="submit">Sign up</button>
  <span className="span">Have an account? <Link to="/login">Log in</Link></span>
    </form>
</div>
  )
}
