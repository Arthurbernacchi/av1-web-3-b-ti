import express from "express";

const app = express();

app.use(express.json());

// Banco de dados falso (lista)
let tarefas = [
  { id: 1, titulo: "Estudar" },
  { id: 2, titulo: "Fazer trabalho" }
];

// LISTAR tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// CRIAR nova tarefa (POST)
app.post("/tarefas", (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1, // Gera um ID novo baseado no tamanho da lista
    titulo: req.body.titulo
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// EDITAR tarefa (PUT)
app.put("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const novoTitulo = req.body.titulo; 
  const tarefa = tarefas.find(t => t.id === id);

  if (tarefa) {
    tarefa.titulo = novoTitulo;
    res.send("Tarefa atualizada com sucesso");
  } else {
    res.status(404).send("Tarefa não encontrada");
  }
});

// EXCLUIR tarefa (DELETE)
app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.send("Tarefa excluída com sucesso");
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em: http://localhost:3000");
});