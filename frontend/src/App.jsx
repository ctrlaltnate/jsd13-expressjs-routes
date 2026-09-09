import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('register')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [account, setAccount] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const isRegister = activeTab === 'register'

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isRegister) {
      setAccount({ name: form.name, email: form.email, password: form.password })
      setForm({ name: form.name, email: form.email, password: '' })
      setMessage('Account created. You can log in now.')
      setActiveTab('login')
      return
    }

    const canLogIn = account && account.email === form.email && account.password === form.password

    if (!canLogIn) {
      setMessage('Email or password is incorrect. Try the account you just registered.')
      return
    }

    setIsLoggedIn(true)
    setMessage('')
  }

  const showRegister = () => {
    setIsLoggedIn(false)
    setActiveTab('register')
    setForm({ name: '', email: '', password: '' })
    setMessage('')
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setActiveTab('login')
    setForm({ name: '', email: '', password: '' })
  }

  return (
    <main className='app-shell'>
      <nav className='navbar' aria-label='Main navigation'>
        <button className='brand' type='button' onClick={showRegister} aria-label='Go to registration'>
          <span className='brand-mark'>N</span>
          <span>northstar</span>
        </button>
        <div className='nav-status'><span className='status-dot' />Local workspace</div>
      </nav>

      {isLoggedIn ? (
        <section className='welcome-panel'>
          <span className='eyebrow'>You are signed in</span>
          <h1>Good to see you, {account.name}.</h1>
          <p>Your local account is ready. This is the place where your app content will live.</p>
          <div className='welcome-actions'>
            <button className='button button-primary' type='button' onClick={logOut}>Log out</button>
            <button className='button button-quiet' type='button' onClick={showRegister}>Create a new account</button>
          </div>
        </section>
      ) : (
        <section className='auth-layout'>
          <div className='intro-panel'>
            <span className='eyebrow'>A calmer way forward</span>
            <h1>Make room for what matters.</h1>
            <p>Set up your personal workspace and keep your next steps close at hand.</p>
            <div className='intro-note'><span className='note-icon'>✦</span><span>Simple now. Ready for your API later.</span></div>
          </div>

          <div className='auth-card'>
            <div className='card-heading'>
              <span className='eyebrow'>Welcome</span>
              <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
              <p>{isRegister ? 'Start with a few details.' : 'Log in to continue to your workspace.'}</p>
            </div>
            <div className='tabs' role='tablist' aria-label='Authentication options'>
              <button className={isRegister ? 'tab active' : 'tab'} type='button' role='tab' aria-selected={isRegister} onClick={() => { setActiveTab('register'); setMessage('') }}>Register</button>
              <button className={!isRegister ? 'tab active' : 'tab'} type='button' role='tab' aria-selected={!isRegister} onClick={() => { setActiveTab('login'); setMessage('') }}>Login</button>
            </div>
            <form className='auth-form' onSubmit={handleSubmit}>
              {isRegister && <label>Your name<input name='name' type='text' value={form.name} onChange={handleChange} placeholder='Alex Morgan' required /></label>}
              <label>Email address<input name='email' type='email' value={form.email} onChange={handleChange} placeholder='you@example.com' required /></label>
              <label>Password<input name='password' type='password' value={form.password} onChange={handleChange} placeholder='At least 8 characters' minLength='8' required /></label>
              {message && <p className={message.startsWith('Account') ? 'form-message success' : 'form-message'}>{message}</p>}
              <button className='button button-primary submit-button' type='submit'>{isRegister ? 'Create account' : 'Log in'} <span aria-hidden='true'>↗</span></button>
            </form>
          </div>
        </section>
      )}
      <footer className='footer'><span>© 2026 Northstar</span><span>Built for your next chapter</span></footer>
    </main>
  )
}

export default App
