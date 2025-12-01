import { useState } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu } from '@mui/material'
import axios from 'axios'
import  './site.css'
import MenuLateral from './MenuLateral'
function Cliente({ setCurrentPage }) {

    const [nome,setNome]  = useState('');
    const [email,setEmail]  = useState('');
    const [senha,setSenha]  = useState('');
    const [ende,setEnde]  = useState('');
    const [errors, setErrors] = useState({
    email: '',
    password: '',
    nome: '',
    endereco: ''
  });

    
    function handleBack() {
        setCurrentPage('cliente');
    }

    function validateFields() {
        let valide = true;
        if (nome.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, nome: 'Nome é obrigatório.' }));
            valide = valide && false;
        }
        if (email.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, email: 'Email é obrigatório.' }));
            valide = valide && false;
        }
        if (senha.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Senha é obrigatória.' }));
            valide = valide && false;
        }
        if (ende.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, endereco: 'Endereço é obrigatório.' }));
            valide = valide && false;
        }
        if (valide) {
        setErrors({
            email: '',
            password: '',
            nome: '',
            endereco: ''
        });
    }
        return valide;
    }

    function handleSave() {

        if (!validateFields()) {
            return;
        }    
         
        const body = {
            name: nome,
            email: email,
            password: senha,
            endereco: ende
        };
        axios.post('http://localhost:3000/v1/clientes', body).then(response => {
         //   console.log('Cliente data:', response.data);
          //s  console.log(response.data);
            alert('Cliente cadastrado com sucesso!');
       
        }).catch(error => {
            console.error('There was an error!', error.message);
        });
      
    
    }

    return (
        <>
        <div>
         <div  className="conteudo">
            <h1>Cadastro de Cliente</h1>
            <TextField  label="Nome" required variant="outlined"
             fullWidth margin="normal" onChange={(e) => setNome(e.target.value)}
             error={!!errors.nome}
             helperText={errors.nome}
             />
            <TextField label="Email" required variant="outlined" fullWidth margin="normal" 
            onChange={(e) => setEmail(e.target.value)} 
            error={!!errors.email}
            helperText={errors.email}
            />
            <TextField label="Senha" required type="password" variant="outlined" fullWidth margin="normal"
             onChange={(e) => setSenha(e.target.value)} 
             error={!!errors.password}
             helperText={errors.password}
             />
            <TextField label="Endereço" required variant="outlined" fullWidth margin="normal" 
            onChange={(e) => setEnde(e.target.value)}
            error={!!errors.endereco}
            helperText={errors.endereco}
            />
            <Button variant="contained" required color="primary" style={{marginTop:20}} onClick={handleSave} >Cadastrar</Button>
            <div style={{width:20}}>

            </div>
            <Button variant="contained" required color="primary" style={{marginTop:20}} onClick={handleBack} >Voltar</Button>
         </div>
         </div>
        </>
    )
}



export default Cliente