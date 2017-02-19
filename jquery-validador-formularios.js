var ValidadorTelcel = {


  validador_correo: function( email ){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var obj = $(email);
    var cont = obj.closest('div');

    cont.find('.help-block').remove();

    if(!re.test(email.value)){
      cont.addClass('has-error');
      obj.after('<span class="help-block form-error">'+email.getAttribute('data-validation-error-msg')+'</span>');
    }else{
      cont.removeClass('has-error');
      cont.find('.help-block').remove();
    }

  },

  validador_requerido: function( campo ){
    var obj = $(campo);
    var cont = obj.closest('div');

    cont.find('.help-block').remove();

    if( campo.value.length === 0 ){
      cont.addClass('has-error');
      obj.after('<span class="help-block form-error">'+campo.getAttribute('data-validation-error-msg')+'</span>');
    }else{
      cont.removeClass('has-error');
      cont.find('.help-block').remove();
    }
  },

  validador_confirmacion: function( campo ){

    var obj = $(campo);
    var cont = obj.closest('div');
    cont.find('.help-block').remove();

    var validar_con = campo.getAttribute('data-validation-confirm');
    if( campo.value != $('#'+validar_con).val() ){
      cont.addClass('has-error');
      obj.after('<span class="help-block form-error">'+campo.getAttribute('data-validation-error-msg')+'</span>');
    }else{
      cont.removeClass('has-error');
      cont.find('.help-block').remove();
    }

  },


  validador_password: function( campo ){

    var obj = $(campo);
    var cont = obj.closest('div');
    var longitud = parseInt(campo.value.length);
    cont.find('.help-block').remove();

    var re = /^[a-zA-Z0-9 \-_]*$/;

    if( longitud < 7 || longitud > 12 ){
      cont.addClass('has-error');
      obj.after('<span class="help-block form-error">'+campo.getAttribute('data-validation-error-msg')+'</span>');
    }else if( !re.test(campo.value) ){
      cont.addClass('has-error');
      obj.after('<span class="help-block form-error">'+campo.getAttribute('data-validation-error-msg')+'</span>');
    }
    else{
      cont.removeClass('has-error');
      cont.find('.help-block').remove();
    }

  },


  validador_min_lenght: function( campo ){

    var obj = $(campo);
    var cont = obj.closest('div');
    var longitud = parseInt(campo.value.length);
    var min_length = obj.data('validationMinLength');
    cont.find('.help-block').remove();

    if( longitud < min_length ){
      cont.addClass('has-error');
      obj.after('<span class="help-block form-error">'+campo.getAttribute('data-validation-error-msg')+'</span>');
    }else{
      cont.removeClass('has-error');
      cont.find('.help-block').remove();
    }

  },


  show_password: function(){

    var markup = '<a href="#" class="mostrar-contrasena-boton" style="display:none;"><div class="col-md-1 col-sm-1 col-xs-2 columna-xs-2"><i class="icon-Eye f-z-22"></i></div><div class="col-md-10 col-sm-10 col-xs-10 columna-xs-10 label-mostrar-contrasena">Mostrar contraseña</div></a>';
    var inputs, index;

    var mostarOcultarPassword = function(input){

      var a = input.closest('div').find('.mostrar-contrasena-boton');
      if( input.val() !== '' ) a.show();
      else a.hide();

    };


    $(document).on('click','.mostrar-contrasena-boton',function(e){
      e.preventDefault();

      var input = $(this).closest('div').find('input');
      var label = $(this).find('.label-mostrar-contrasena');

      if( input.attr('type') === "text" ){
          input.attr('type', 'password');
          label.html('Mostrar contraseña');
      }else{
        input.attr('type', 'text');
        label.html('Ocultar contraseña');
      }

    });


    inputs = document.getElementsByTagName('input');

    for (index = 0; index < inputs.length; ++index) {
        var input = inputs[index];
        if( $(input).hasClass('show-password') ) $(input).after( markup );
    }

    $(document).on('keyup','.show-password',function(e){
      mostarOcultarPassword($(this));
    });


  },


  //disparador del formulario, solo verifica si no hay errores y sube el formulario
  disparador: function( formulario ){
    var f = $('#'+formulario);
    if( f.find('.help-block').length === 0 ) f.submit();
  },


  clasificador: function(input){

    //Tipo: Requerido, email, confirmacion
    var tipo = input.getAttribute('data-validation');

    if( tipo === 'email' ) ValidadorTelcel.validador_correo( input );
    else if( tipo === 'required' ) ValidadorTelcel.validador_requerido( input );
    else if( tipo === 'confirmation' ) ValidadorTelcel.validador_confirmacion( input );
    else if( tipo === 'password' ) ValidadorTelcel.validador_password( input );
    else if( tipo === 'minlength' ) ValidadorTelcel.validador_min_lenght( input );

  },

  buscador: function(id){
    var inputs, index;

    inputs = document.getElementById(id);
    for (index = 0; index < inputs.length; ++index) {
        var input = inputs[index];
        if( input.hasAttribute('data-validation') ) ValidadorTelcel.clasificador( input );
    }
  },

  inicializar: function(id){
    ValidadorTelcel.buscador(id);
    ValidadorTelcel.disparador(id);
  }

};
