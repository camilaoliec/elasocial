import React from 'react'
import "./Form.scss"

const Form = () => {
  const [result, setResult] = React.useState("");
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Seding...")
      
  
    }
    return (
        <form className='form' onSubmit={onSubmit}>
            <label htmlFor='name'>Nome e sobrenome:</label>
            <input type='text' placeholder='Digite seu nome e sobrenome' name='' required />
            <label htmlFor='email'>Email:</label>
            <input type="email" placeholder='Digite seu email' name='email' required />
            <label htmlFor='message'>Messagem:</label>
            <textarea name='message'rows="8" placeholder='Digite sua mensagem' required></textarea>
            <button type='submit' className="contact__submit">Enviar</button>
            {result && <p className='contact__result'>{result}</p>}    
        </form>

        
  )
}

export default Form
