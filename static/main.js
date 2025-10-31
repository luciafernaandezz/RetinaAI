document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario_completo");
  const resultadoDiv = document.getElementById("resultado");
  // Seleccionamos inputs y selects según el orden requerido
  const camposOrdenados = [
    { id: "genero2" },
    { id: "OD_12" },
    { id: "OI_12" },
    { id: "OD_22" },
    { id: "OI_22" },
    { id: "OD_32" },
    { id: "OI_32" },
    { id: "OD_42" },
    { id: "OI_42" },
    { id: "Edad_Opto2" },
    { id: "Dato_OPT2" },
    { id: "OD_52" },
    { id: "OI_52" },
    { id: "edad_erg2" },
  ];
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Rellenar FormData en el orden exacto
    camposOrdenados.forEach(({ id }) => {
      const input = document.getElementById(id);
      formData.append(id === "genero2" ? "genero" : id === "edad_erg2" ? "edad_erg" : id, input.value);
    });

    try {
      const response = await fetch("/clasificar_completo", {
        method: "POST",
        body: formData,
      });
      

      const data = await response.json();
      const modal = document.getElementById("modalResultado");
      const modalContenido = document.getElementById("contenidoModal");

      if (data.resultado === "0") {
        modalContenido.innerText = "Resultado: No degenera";
      } else if (data.resultado === "1") {
        modalContenido.innerText = "Resultado: Degenera";
      } else {
        modalContenido.innerText = "Error: " + data.error;
      }

      modal.style.display = "block";
    } catch (error) {
      resultadoDiv.innerText = "Error al conectar con el servidor.";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const resultadoDiv = document.getElementById("resultado");

  const datosIDs = [
    "OD_1",
    "OI_1",
    "OD_2",
    "OI_2",
    "OD_3",
    "OI_3",
    "OD_4",
    "OI_4",
  ];

  const generoSelect = document.getElementById("genero");
  const edadErgSelect = document.getElementById("edad_erg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 1. Agregar genero primero
    formData.append("genero", generoSelect.value);

    // 2. Luego los OD/OI
    datosIDs.forEach((id) => {
      const input = document.getElementById(id);
      formData.append(id, input.value);
    });

    // 3. Finalmente, edad_erg
    formData.append("edad_erg", edadErgSelect.value);

    try {
      const response = await fetch("/clasificar", {
        method: "POST",
        body: formData,
      });

      const modal = document.getElementById("modalResultado");
      const modalContenido = document.getElementById("contenidoModal");
      const data = await response.json();
      if (data.resultado === "0") {
        modalContenido.innerText = "Resultado: No degenera";
      } else if (data.resultado === "1") {


        modalContenido.innerText = "Resultado: Degenera";
      } else {
        modalContenido.innerText = "Error: " + data.error;
      }

      modal.style.display = "block";
    } catch (error) {
      resultadoDiv.innerText = "Error al conectar con el servidor.";
    }
  });
});

async function cargarSelect(endpoint, selectId, labelKey, valueKey) {
  try {
    const response = await fetch(`http://localhost:5000/api/${endpoint}`);
    const datos = await response.json();

    const select = document.getElementById(selectId);
    datos.forEach((item) => {
      const option = document.createElement("option");
      option.value = item[valueKey];
      option.textContent = item[labelKey];
      select.appendChild(option);
    });
  } catch (error) {
    console.error(`Error cargando ${selectId}:`, error);
  }
}

// Llama estas funciones cuando cargue tu página
document.addEventListener("DOMContentLoaded", () => {
  cargarSelect("genero", "genero", "nombre", "id");
  cargarSelect("edad_erg", "edad_erg", "nombre", "numero");
});
document.addEventListener("DOMContentLoaded", () => {
  cargarSelect("genero", "genero2", "nombre", "id");
  cargarSelect("edad_erg", "edad_erg2", "nombre", "numero");
});

// Función para mostrar la sección
function mostrar(seccion) {
  // Ocultar todas las secciones
  var secciones = document.querySelectorAll(".seccion");
  secciones.forEach(function (seccion) {
    seccion.classList.remove("activa");
  });

  // Mostrar la sección seleccionada
  document.getElementById(seccion).classList.add("activa");
}

async function fetchAnimales() {
  const response = await fetch(`http://localhost:5000/api/todos`);
  console.log(await response.json());
}

// Función para limpiar los campos
function limpiarCampos() {
  // Limpiar campos de texto
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    input.value = ""; // Vaciar el valor de los inputs
  });

  // Limpiar selects
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.selectedIndex = -1; // Limpiar la selección en los selects (deja la opción sin seleccionar)
  });
}

// Function to fetch data for the "Consultor" section and display in a table
async function fetchConsultorData() {
  try {
    const response = await fetch("http://localhost:5000/api/consultor"); // Adjust the URL to your API endpoint
    const animales = await response.json();
    const table = document.getElementById("consultor-table");
    const tableBody = table.querySelector("tbody");
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.textContent
    );

    Object.values(animales).forEach((item) => {
      const row = document.createElement("tr");

      headers.forEach((header) => {
        const cell = document.createElement("td");
        cell.textContent = item[header] !== undefined ? item[header] : "";
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching Consultor data:", error);
  }
}

// Add an event listener to show the "Consultor" section and fetch data when the button is clicked
document
  .querySelector("button[onclick=\"mostrar('consultor')\"]")
  .addEventListener("click", () => {
    fetchConsultorData();
  });

// Cerrar modal al hacer clic en la X
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("modalResultado").style.display = "none";
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modalResultado");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
