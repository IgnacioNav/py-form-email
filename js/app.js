// Variables
const btnEnviar = document.querySelector('#enviar');
const btnLimpiar = document.querySelector('#limpiarBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Validar un email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    

eventListeners();
function eventListeners() {
    // Se ejecuta cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Limpia el formulario
    btnLimpiar.addEventListener('click', resetearFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
}


// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {
    
    // Si la validación es correcta..
    if(e.target.value.length > 0) {

        // Elimina alerta de errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        
        if(er.test( e.target.value )){
            
            // Elimina alerta de errores
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no válido');
        }
    }
    
    if( er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

// Alerta de errores
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-200', 'text-red-600', 'p-2', 'mt-5', 'text-center', 'error', 'font-bold', 'uppercase');

    const errores = document.querySelectorAll('.error');

    // Validamos que solamente genere 1 mensaje de error
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
    
}

// Envia el email
function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Ocultar spinner luego de 3 segundos
    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje al usuario
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Insertamos el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner); 
        
        // Eliminar mensaje
        setTimeout(() => {
            parrafo.remove();

            resetearFormulario(); 
        }, 4000);
        
    }, 3000 );
}

// Limpiar el formulario
function resetearFormulario() {
    formulario.reset();

    // iniciamos App nuevamente para que enviar comience desabilitado..
   iniciarApp();
}