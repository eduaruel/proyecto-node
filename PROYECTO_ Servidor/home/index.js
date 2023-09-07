const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification')

formC.addEventListener('submit',async e=>{
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/user');{

        method:'GET' //get es para obtener o consultar

    }
    

    const users = await respuesta.json();

    const user = users.find(user=>user.nombre === createInput.value);
    console.log(user);
    //validaciones
    if(!createInput.value){
        //el campo estas vacio
        console.log('el usuario no puede estar vacio');
        notificacion.innerHTML=`el usuario no puede estar vacio`;
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2000);
    }else if(user){

       //console.log('si existe');

       notificacion.innerHTML="el usuario ya existe";
       notificacion.classList.add('show-notification');

       setTimeout(()=>{
        notificacion.classList.remove('show-notification')
       },2000)
    }else{
        await fetch('http://localhost:3000/user',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({nombre:createInput.value})
        });

        notificacion.innerHTML = `el usuario ${createInput.value} ha sido creado`;
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.add('show-notification');
        },3000);
    }
    createInput.value = '';

})

formL.addEventListener('submit',async e=>{
    e.preventDefault()

    const respuesta = await fetch('http://localhost:3000/user',{
        method:'GET'
    })

    const users = await respuesta.json();

    const user = users.find(user=>user.nombre === loginInput.value);

    if(!user){
        notificacion.innerHTML= "el usuario no existe";
        notificacion.classList.add('show-notification');
        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000);
    }else{
        localStorage.setItem('user',JSON.stringify(user));
        window.location.href = '../tareas/tareas.html';


    }

})
