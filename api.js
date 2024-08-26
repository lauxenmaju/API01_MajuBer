//1 require
const express = require ('express');
const mysql = require('mysql2');
const cors = require('cors');

const mysql_config = require ('./inc/mysql_config');
const functions = require('./inc/functions');

//2 criação de duas constantes para a definição da disponibilidade da api e da versão da api
const API_AVAILABILITY = true;
const API_VERSION = "1.0.0";

//3 iniciar o server

const app = express()
app.listen(3000,()=>{
    console.log("APi esta executando")
})

//4 checar se a API esta disponivel

app.use((req,res,next)=>{
    if(API_AVAILABILITY){
        next();
    }else{
        res.json(functions.response("Atenção", "API esta em manutenção. Sinto muito",0,null))
    }
})

//5 mysql connection

const connection = mysql.createConnection(mysql_config);

//6 cors

app.use(cors());

//7 rotas 
//rotas em inicial que vai dizer que a APi esta disṕonivel 

app.get('/',(req,res)=>{
    res.json(functions.response('sucesso','api esta rodando',0,null))
})

//9 rota para pegar todas as tarefas
app.get('/tasks', (req,res)=>{
     connection.query("SELECT * FROM tasks",(err,rows))
})
//8 mydlware para caso alguma rota não seja encontrada 

app.use((req,res)=>{
    res.json(functions.response('Atenção','rota não encontrada',0,null))
})
