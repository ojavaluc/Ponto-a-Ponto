let dados = [];

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "") // remove marcas diacríticas
    .replace(/[^\w\s]/gi, "") // remove pontuação
    .trim();
}

document.getElementById("cidade").addEventListener("change", async (e) => {
  const cidade = e.target.value;
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";
  dados = [];

  if (cidade) {
    try {
const response = await fetch(`./${cidade}.json`);
      dados = await response.json();
    } catch (error) {
      resultadosDiv.innerHTML = `<p style="color:red">Erro ao carregar dados da cidade.</p>`;
    }
  }
});

document.getElementById("busca").addEventListener("input", () => {
  const termo = normalizarTexto(document.getElementById("busca").value);
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  if (termo.length === 0 || dados.length === 0) return;

  const resultadosFiltrados = dados.filter((item) => {
    const textoItem = normalizarTexto(`${item.rua} ${item.numero} ${item.bairro}`);
    return textoItem.includes(termo);
  });

  if (resultadosFiltrados.length === 0) {
    resultadosDiv.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  resultadosFiltrados.forEach((item) => {
    const enderecoCompleto = `${item.rua}, ${item.numero} - ${item.bairro}`;
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;

    const div = document.createElement("div");
    div.classList.add("resultado-item");
    div.innerHTML = `
      <strong>${item.rua}, ${item.numero}</strong><br>
      Bairro: ${item.bairro}<br>
      <a href="${mapsLink}" target="_blank" style="color: #ff5c00; text-decoration: underline;">Ver no mapa</a>
    `;
    resultadosDiv.appendChild(div);
  });
});
