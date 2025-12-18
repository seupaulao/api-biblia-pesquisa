const express = require('express')
const app = express()
const port = 3000
const util = require('./util')

app.get('/', (req, res) => {
  res.send('API BIBLIA PESQUISA')
})

app.get('/biblia/:livro/:capitulo/:verso', (req, res) => {
  const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
  const texto = util.get_texto_chave(chave);
  res.send(texto)
})

app.get('/grego/:livro/:capitulo/:verso', (req, res) => {
  const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
  const texto = util.get_grego_chave(chave)
  res.send(texto)
})

app.get('/hebraico/:livro/:capitulo/:verso', (req, res) => {
  const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
  const texto = util.get_hebraico_chave(chave)
  res.send(texto)
})

app.get('/transliteracao/:livro/:capitulo/:verso', (req, res) => {
  const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
  const texto = util.get_translit_chave(chave)
  res.send(texto)
})

// todas as siglas e nomes do novo e velho testamento

// quantidade de capitulos de um livro

// quantidade de versos de um capitulo

// trazer todas as referencias de uma palavra, no formato LLL_CCC_VVV, 
// onde L = sigla livro, C = numero capitulo, V = numero versiculo

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
