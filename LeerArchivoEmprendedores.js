function LeerArchivoEmprendedores() {
    const filename = 'emprendedores.json';

    fetch(filename)
        .then(resultado => resultado.json())
        .then(datos => {
            console.log(datos);
            doctores = datos;
        })
        .catch(error => console.error(error));
}
