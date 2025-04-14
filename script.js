document.addEventListener("DOMContentLoaded", carregarTarefas);

function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();

  if (texto !== "") {
    criarTarefa(texto);
    salvarTarefa(texto); 
    input.value = "";
  }
}

function criarTarefa(texto, concluida = false) {
  const lista = document.getElementById("listaTarefas");
  const tarefa = document.createElement("div");
  tarefa.classList.add("tarefa");
  if (concluida) tarefa.classList.add("concluida");

  const conteudo = document.createElement("div");
  conteudo.classList.add("tarefa-conteudo");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = concluida;

  const span = document.createElement("span");
  span.textContent = texto;

  const editar = document.createElement("span");
  editar.innerHTML = `<img src="Vector.png" alt="Editar" class="icone edit">`;
  editar.classList.add("icone", "edit");

  const remover = document.createElement("span");
  remover.innerHTML = `<img src="Trash.png" alt="Deletar" class="icone delete">`;
  remover.classList.add("icone", "delete");

  checkbox.addEventListener("change", () => {
    tarefa.classList.toggle("concluida", checkbox.checked);
    atualizarLocalStorage();
  });

  editar.addEventListener("click", () => {
    const novoTexto = prompt("Editar tarefa:", span.textContent);
    if (novoTexto) {
      span.textContent = novoTexto;
      atualizarLocalStorage(); 
    }
  });

  
  remover.addEventListener("click", () => {
    lista.removeChild(tarefa);
    atualizarLocalStorage(); 
  });

  conteudo.appendChild(checkbox);
  conteudo.appendChild(span);
  tarefa.appendChild(conteudo);
  tarefa.appendChild(editar);
  tarefa.appendChild(remover);
  lista.appendChild(tarefa);
}


function salvarTarefa(texto) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push({ texto, concluida: false });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(t => criarTarefa(t.texto, t.concluida));
}


function atualizarLocalStorage() {
  const listaDOM = document.querySelectorAll(".tarefa");
  const tarefas = Array.from(listaDOM).map(tarefa => {
    const texto = tarefa.querySelector("span").textContent;
    const concluida = tarefa.classList.contains("concluida");
    return { texto, concluida };
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
