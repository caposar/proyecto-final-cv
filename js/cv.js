window.addEventListener("load", function () {
    console.log('La página ha terminado de cargarse!!');    
    DetenerLoading();
    ClearFormOnCloseModal();
    EnviarMailDesdeModal();
});

function DetenerLoading() {
    var loader = document.getElementById("loader");
    setTimeout(function () {
        //loader.style.display = "none";
        loader.remove(); // Tambien funciona como la linea de arriba
    }, 1000);
}

// Otraforma: Detener Loading Con JQuery
// $(window).ready(function() {
//     setTimeout(function () {
//         $("#loader").fadeOut("slow");
//         // $('.loader').remove();
//     }, 1000);
// });

function ClearFormOnCloseModal() {
    // $("#mailModal").modal("show");
    $('#mailModal').on('hidden.bs.modal', function () {
        $('#mailModal form')[0].reset(); // Limpia los controles dentro del form

        $("#form").removeClass("was-validated"); // Si se usan los estilos personalisados de validación de bootstrap: Para que no se pinten los controles en rojo como invalidos, se debe quitar la clase "was-validated" del form

        MostrarBotonEnviando(false);
    });
}

function MostrarBotonEnviando(opcion) {
    if (opcion) {
        $("#spinner-btnEnviar").removeClass("d-none");
        $("#btnEnviar").prop("disabled", true);
        $("#nombre-btnEnviar").text('Enviando...');
    } else {
        $("#spinner-btnEnviar").addClass("d-none"); // Si se usa el spinner de bootrap: Para que no aparezca al abrir el modal                
        $("#btnEnviar").prop("disabled", false); // Para que aparezca habilitado el boton
        $("#nombre-btnEnviar").text('Enviar'); // Para que el texto al abrir el modal sea "Enviar"
    }
}

function MostrarToastOk(opcion) {
    if (opcion) {
        $("#toast-icon-ok").removeClass("d-none");
        $("#toast-icon-nok").addClass("d-none");
        $('#toast-mensaje').text('El mensaje se envió correctamente.');
    } else {
        $("#toast-icon-nok").removeClass("d-none");
        $("#toast-icon-ok").addClass("d-none");
        $('#toast-mensaje').text('Ocurrio un error. El mensaje no se envió.');
    }
    //const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

function EnviarMailDesdeModal()
{
    emailjs.init('GrpwIhahUzcgE5PhD')
        
    const form = document.getElementById('form');
    
    const modalInstance = new bootstrap.Modal(document.getElementById('mailModal'));
    // const modalInstance = bootstrap.Modal.getOrCreateInstance('#mailModal'); // Otra forma, funciona igual que la linea de arriba
            

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const isFormValid = form.checkValidity();

        console.log("form ==> ", form);
        console.log("form.checkValidity() ==> ", isFormValid);

        if (isFormValid) {
            MostrarBotonEnviando(true);

            const serviceID = 'default_service';
            const templateID = 'template_e74x2aa';

            emailjs.sendForm(serviceID, templateID, this)
            .then(() => {                    
                modalInstance.hide();
                //alert('Sent!');
                MostrarToastOk(true);
            }, (err) => {                    
                //alert(JSON.stringify(err));
                MostrarToastOk(false);
                MostrarBotonEnviando(false);
                console.log("err ==> ", JSON.stringify(err));
            });
        }
    });
}


/* #region Agrega estilos de validación en controles de bootstrap */

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    // Ejemplo de JavaScript de inicio para deshabilitar el envío de formularios si hay campos no válidos
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        // Bucle sobre ellos y evitar el envio
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

/* #endregion */

