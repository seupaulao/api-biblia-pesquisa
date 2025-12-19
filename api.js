const express = require('express')
const app = express()
const port = 3000
const util = require('./util')

app.get('/', (_, res) => {
  res.send('API BIBLIA PESQUISA')
})

app.get('/biblia/:livro/:capitulo/:verso', (req, res) => {
  const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
  const texto = util.get_texto_chave(chave);
  res.send(texto)
})

app.get('/grego/:livro/:capitulo/:verso', (req, res) => {
  if (util.in_novo(req.params["livro"])) {
    const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
    const texto = util.get_grego_chave(chave)
    res.send(texto)
  } else {
    res.send(`Esse livro : ${req.params["livro"]}, não existe no grego`);
  }
})

app.get('/hebraico/:livro/:capitulo/:verso', (req, res) => {
   if (util.in_velho(req.params["livro"])) {
    const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
    const texto = util.get_hebraico_chave(chave)
    res.send(texto)
  } else {
    res.send(`Esse livro : ${req.params["livro"]}, não existe no hebraico`);
  }
})

app.get('/transliteracao/:livro/:capitulo/:verso', (req, res) => {
  const chave = req.params["livro"] + "_" + req.params["capitulo"] + "_" + req.params["verso"]
  const texto = util.get_translit_chave(chave)
  res.send(texto)
})

app.get('/livros', (_, res) => {
  
  let texto = "Velho<br>";
  const velhoS = util.get_siglas("velho");
  const velhoN = util.get_nomes_livros("velho");
  for(let i=0;i<velhoN.length;i++)  {
    texto += `${velhoS[i]} - ${velhoN[i]}<br>`;
  }
  texto += "<br><br>Novo<br>"
  const nS = util.get_siglas("novo");
  const nN = util.get_nomes_livros("novo");
  for(let i=0;i<nN.length;i++)  {
    texto += `${nS[i]} - ${nN[i]}<br>`;
  }

  res.send(texto)
})


app.get('/capitulos/:livro', (req,res) => {
  const posicao = util.get_refs().indexOf(req.params["livro"]);
  res.send(util.get_capitulos(posicao)+"");
});


app.get('/versos/:livro/:capitulo', (req,res) => {
  const posicao = util.get_refs().indexOf(req.params["livro"]);
  res.send( util.get_qtd_versos(posicao, req.params["capitulo"])+"" );
});

// TODO : trazer todas as referencias de uma palavra, no formato LLL_CCC_VVV, 
// onde L = sigla livro, C = numero capitulo, V = numero versiculo



//função principal para ouvir na porta do serviço
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
