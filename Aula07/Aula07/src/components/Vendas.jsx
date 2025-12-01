import { useEffect, useState } from 'react'

import viteLogo from '/vite.svg'
import { TextField, Button, Menu, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import './site.css'
import MenuLateral from './MenuLateral'
function Vendas({ setCurrentPage }) {

    const [idCliente, setIdCliente] = useState(1);
    const [idProduto, setIdProduto] = useState(1);
    const [listaClientes, setListaClientes] = useState([]);
    const [listProdutos, setListaProdutos] = useState([]);

    const [preco, setPreco] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [ende, setEnde] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        nome: '',
        endereco: ''
    });


    useEffect(() => {
        console.log('obter lista de clientes',);

        axios.get(`http://localhost:3000/v1/clientes`).then(response => {
            setListaClientes(response.data);
            console.log('Clientes:', response.data);

        }).catch(error => {
            console.error('There was an error!', error.message);
        });

        axios.get(`http://localhost:3000/v1/produtos`).then(response => {
            setListaProdutos(response.data);
            console.log('Produtos:', response.data);

        }).catch(error => {
            console.error('There was an error!', error.message);
        });
    }, [idCliente]);

    function handleBack() {
        setCurrentPage('vendas');
    }



    function handleChange(event) {
        setIdCliente(event.target.value);
    }

    function handleChangeIdProduto(event) {
        setIdProduto(event.target.value);
    }


    function handleSave() {

        const usuarioLogado = localStorage.getItem('usuario');
        console.log('Usuario logado:', usuarioLogado);
        //alert('Usuario logado: '+usuarioLogado);

        const itens = [
            {
                idProduto: idProduto,
                quantidade: 1,
                precoUnitario: preco,
            }
        ];

        const body = {
            idUser: usuarioLogado,
            idCliente: idCliente,
            itens: itens,
        };

         axios.post('http://localhost:3000/v1/vendas', body).then(response => {
             //   console.log('Cliente data:', response.data);
             //s  console.log(response.data);
             alert('Venda cadastrada com sucesso!');
 
         }).catch(error => {
             console.error('There was an error!', error.message);
         });
 

    }

    return (
        <>
            <div>
                <div className="conteudo">
                    <h1>Cadastro de Vendas</h1>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idCliente}
                            label="Cliente"
                            onChange={handleChange}
                        >

                            {listaClientes.map((cliente) => (
                                <MenuItem key={cliente.id} value={cliente.id}>{cliente.name}</MenuItem>))}
                        </Select>
                    </FormControl>

                    <div style={{ height: 15 }}></div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Produto</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idProduto}
                            label="Produto"
                            onChange={(e) => setIdProduto(e.target.value)}
                        >

                            {listProdutos.map((produto) => (
                                <MenuItem key={produto.id} value={produto.id}>{produto.name}  -  {
                                    new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(produto.preco)
                                }</MenuItem>))}
                        </Select>
                    </FormControl>

                    <div style={{ height: 15 }}></div>
                    <TextField label="Preço" variant="outlined" fullWidth margin="normal" type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />

                    <Button variant="contained" required color="primary" style={{ marginTop: 20 }} onClick={handleSave} >Cadastrar</Button>
                    <div style={{ width: 20 }}>

                    </div>
                    <Button variant="contained" required color="primary" style={{ marginTop: 20 }} onClick={handleBack} >Voltar</Button>
                </div>
            </div>
        </>
    )
}



export default Vendas