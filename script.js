let dados = [];

document.getElementById("cidade").addEventListener("change", async (e) => {
  const cidade = e.target.value;
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";
  dados = [];

  if (cidade) {
    try {
      const response = await fetch(`dados/${cidade}.json`);
      dados = await response.json();
    } catch (error) {
      resultadosDiv.innerHTML = `<p style="color:red">Erro ao carregar dados da cidade.</p>`;
    }
  }
});

document.getElementById("busca").addEventListener("input", () => {
  const termo = document.getElementById("busca").value.toLowerCase();
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  if (termo.length === 0 || dados.length === 0) return;

  const resultadosFiltrados = dados.filter((item) =>
    item.rua.toLowerCase().includes(termo) ||
    item.numero.toLowerCase().includes(termo) ||
    item.bairro.toLowerCase().includes(termo)
  );

  if (resultadosFiltrados.length === 0) {
    resultadosDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  resultadosFiltrados.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("resultado-item");
    div.innerHTML = `<strong>${item.rua}, ${item.numero}</strong><br>Bairro: ${item.bairro}`;
    resultadosDiv.appendChild(div);
  });
});
