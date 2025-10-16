let alunos = [];
let indiceEdicao = null;

function cadastrarAluno() {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  if (!nome || !idade || !notaFinal) {
    alert("Preencha todos os campos!");
    return;
  }

  const aluno = { nome, idade, curso, notaFinal };

  if (indiceEdicao !== null) {
    alunos[indiceEdicao] = aluno;
    indiceEdicao = null;
  } else {
    alunos.push(aluno);
  }

  atualizarTabela();
  document.getElementById("form-aluno").reset();
}

function atualizarTabela() {
  const corpo = document.getElementById("tabela-alunos");
  corpo.innerHTML = "";
  alunos.forEach((a, i) => {
    const linha = `<tr>
      <td>${a.nome}</td>
      <td>${a.idade}</td>
      <td>${a.curso}</td>
      <td>${a.notaFinal}</td>
      <td>
        <button onclick="editarAluno(${i})">Editar</button>
        <button onclick="excluirAluno(${i})">Excluir</button>
      </td>
    </tr>`;
    corpo.innerHTML += linha;
  });
}

function editarAluno(i) {
  const aluno = alunos[i];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
  indiceEdicao = i;
}

function excluirAluno(i) {
  alunos.splice(i, 1);
  atualizarTabela();
}