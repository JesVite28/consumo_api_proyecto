/**
 * Para utilizar esta api seguimos la seleccion por letra del abecedario
 */


//Letra para la página principal 
let letra = "a";

//botones para siguiente o anterior
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//titulo categoria del abecedario
const categoriaTitulo = document.getElementById('categoria');

//cambiar de letra segun el abecedario
const abecedario = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let i = 0; // Índice inicial en el abecedario

// Función para cargar cócteles
const cargarCocteles = async () => {
    try {
        //cargar la api desde la letra final

        const respuesta = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`);
        
        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            //variables para obtener los datos de los cocteles
            const datos = await respuesta.json();
            const cocktails = datos.drinks;
            let cocteles = "";

            //para cada coctel se crea un contenedor en el html con los datos siguientes: Iamgen y Nombre
            cocktails.forEach(drink => {
                cocteles += `
                    <div class="coctel">
                        <img class="poster" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <h3 class="titulo">${drink.strDrink}</h3>
                    </div>
                `;
            });

            document.getElementById('contenedor').innerHTML = cocteles;

            //Cargar la letra en la que se encuentra el listado
            categoriaTitulo.textContent = `Categoría por nombre: ${letra.toUpperCase()}`;

            //si la respuesta es 404: hay un error en la solicitud
        } else if (respuesta.status === 404) {
            console.log('No se encontraron cócteles para esta letra.');
            document.getElementById('contenedor').innerHTML = "<p>No se encontraron resultados.</p>";
            // Actualizar el título de categoría incluso si no hay resultados
            categoriaTitulo.textContent = `Categoría por nombre: ${letra.toUpperCase()}`;
        } else {
            //si el error es diferente entonces marca error inesperado
            console.log('Hubo un error inesperado.');
        }

    } catch (error) {
        console.log(error);
    }
};

// Evento para el botón "Siguiente"
btnSiguiente.addEventListener('click', () => {
    if (i < abecedario.length - 1) {
        i++; // Incrementar el índice
        letra = abecedario[i]; // Actualizar la letra
        cargarCocteles(); // Cargar cócteles para la nueva letra
    }
});

// Evento para el botón "Anterior"
btnAnterior.addEventListener('click', () => {
    if (i > 0) {
        i--; // Decrementar el índice
        letra = abecedario[i]; // Actualizar la letra
        cargarCocteles(); // Cargar cócteles para la nueva letra
    }
});

// Cargar cócteles iniciales
cargarCocteles();