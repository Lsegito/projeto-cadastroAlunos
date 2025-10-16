class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = parseFloat(notaFinal);
  }
  isAprovado = () => this.notaFinal >= 7;
  toString = () => `${this.nome} (${this.curso}) - Nota: ${this.notaFinal}`;
}

let alunos = [];
let indiceEdicao = null;

document.getElementById("form-aluno").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  if (!nome || !idade || !notaFinal) {
    alert("Preencha todos os campos!");
    return;
  }

  const aluno = new Aluno(nome, idade, curso, notaFinal);
  if (indiceEdicao !== null) {
    alunos[indiceEdicao] = aluno;
    indiceEdicao = null;
    alert("Aluno atualizado!");
  } else {
    alunos.push(aluno);
    alert("Aluno cadastrado!");
  }

  atualizarTabela();
  e.target.reset();
});

const atualizarTabela = () => {
  const corpo = document.getElementById("tabela-alunos");
  corpo.innerHTML = "";
  alunos.forEach((a, i) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${a.nome}</td>
      <td>${a.idade}</td>
      <td>${a.curso}</td>
      <td>${a.notaFinal}</td>
      <td>
        <button class="editar" data-i="${i}">Editar</button>
        <button class="excluir" data-i="${i}">Excluir</button>
      </td>`;
    corpo.appendChild(linha);
  });

  document.querySelectorAll(".editar").forEach(btn =>
    btn.addEventListener("click", (e) => editarAluno(e.target.dataset.i))
  );
  document.querySelectorAll(".excluir").forEach(btn =>
    btn.addEventListener("click", (e) => excluirAluno(e.target.dataset.i))
  );
};

const editarAluno = (i) => {
  const a = alunos[i];
  document.getElementById("nome").value = a.nome;
  document.getElementById("idade").value = a.idade;
  document.getElementById("curso").value = a.curso;
  document.getElementById("notaFinal").value = a.notaFinal;
  indiceEdicao = i;
};

const excluirAluno = (i) => {
  alunos.splice(i, 1);
  atualizarTabela();
  alert("Aluno excluído!");
};

const saida = document.getElementById("saida-relatorio");

const listarAprovados = () => {
  const aprovados = alunos.filter(a => a.isAprovado());
  saida.textContent = aprovados.map(a => a.toString()).join("\n") || "Nenhum aluno aprovado";
};

const mediaNotas = () => {
  const media = alunos.reduce((acc, a) => acc + a.notaFinal, 0) / alunos.length || 0;
  saida.textContent = `Média das notas: ${media.toFixed(2)}`;
};

const mediaIdades = () => {
  const media = alunos.reduce((acc, a) => acc + parseInt(a.idade), 0) / alunos.length || 0;
  saida.textContent = `Média das idades: ${media.toFixed(1)}`;
};

const nomesOrdemAlfabetica = () => {
  const nomes = alunos.map(a => a.nome).sort();
  saida.textContent = nomes.join("\n") || "Nenhum aluno cadastrado";
};

const quantidadePorCurso = () => {
  const qtd = alunos.reduce((acc, a) => {
    acc[a.curso] = (acc[a.curso] || 0) + 1;
    return acc;
  }, {});
  saida.textContent = Object.entries(qtd)
    .map(([curso, total]) => `${curso}: ${total}`)
    .join("\n") || "Nenhum curso cadastrado";
};