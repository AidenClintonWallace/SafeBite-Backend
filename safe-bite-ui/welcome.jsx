"use client"
import { useState } from 'react';

export default function Welcome() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login:' : 'SignUp:', form);
    // will connect to /api/auth/login or /api/auth/signup
  };

  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', background:'linear-gradient(to bottom, #ff8a2a, #ff6a00)', padding:'20px'}}>
      <div style={{textAlign:'center', color:'white', margin:'30px 0'}}>
        <h1 style={{fontSize:'32px', fontWeight:'bold'}}>SafeBite</h1>
        <p>eat safe, every day</p>
        <h2 style={{marginTop:'20px', fontSize:'24px'}}>Welcome to SafeBite</h2>
      </div>

      <div style={{background:'white', borderRadius:'20px', padding:'20px', width:'100%', maxWidth:'400px'}}>
        <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
          <button onClick={()=>setIsLogin(true)} style={{flex:1, padding:'10px', borderRadius:'10px', border:'none', background: isLogin ? '#ff6a00' : '#eee', color: isLogin ? 'white' : 'black'}}>Log In</button>
          <button onClick={()=>setIsLogin(false)} style={{flex:1, padding:'10px', borderRadius:'10px', border:'none', background: !isLogin ? '#ff6a00' : '#eee', color: !isLogin ? 'white' : 'black'}}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
          {!isLogin && (
            <>
              <input placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
              <input placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
            </>
          )}
          <input placeholder="Email Address" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
          <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required style={{padding:'12px', borderRadius:'10px', border:'1px solid #ddd'}} />
          
          <button type="submit" style={{padding:'12px', borderRadius:'10px', border:'none', background:'#ff6a00', color:'white', fontWeight:'bold'}}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <p style={{textAlign:'center', marginTop:'15px', fontSize:'14px'}}>
          {isLogin ? 'New to SafeBite? ' : 'Already have an account? '}
          <span onClick={()=>setIsLogin(!isLogin)} style={{color:'#ff6a00', cursor:'pointer', fontWeight:'bold'}}>
            {isLogin ? 'Create an account' : 'Log In'}
          </span>
        </p>
      </div>
    </div>
  )
}

