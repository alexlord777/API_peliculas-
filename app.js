let pagina=1;

const btnAnterior= document.getElementById('btnAnterior');
const btnSiguiente= document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', ()=>{
	if(pagina<1000){
		pagina++;
		obtenerPeliculas();
	}
});

btnAnterior.addEventListener('click', ()=>{
	if(pagina>1){
		pagina--;
		obtenerPeliculas();
	}
})


const obtenerPeliculas= async()=>{

	try {
		const respuesta =await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=974fd412d182d9977956fe012eeac5b1&language=es-MX&page=${pagina}`);
        console.log(respuesta);
		
		//si la respuesta es correcta

		if(respuesta.status===200){

            const datos= await respuesta.json();
			let peliculas='';
			datos.results.forEach(pelicula => {
			   peliculas+=`
			   <div class="pelicula">
			     <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
				 <h3 class="titulo">${pelicula.title}</h3>
			   </div>`
			});   

			document.getElementById('contenedor').innerHTML=peliculas;


		}else if(respuesta.status===401){
			console.log('error de sintaxis');
		}else if(respuesta.status===404){
			console.log('La peliula no existe');
		}else{
			console.log('N o sabemos que paso');
		}


	} catch (error) {
		console.log(error);
	}
}

obtenerPeliculas();