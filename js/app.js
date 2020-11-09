//Variables 
const listaTweets = document.getElementById('lista-tweets')
const form = document.getElementById('formulario')


//Funciones

    //Añadir el tweet del formulario
const agregarTweet = (e) => {
    e.preventDefault()
    
    const tweet = document.getElementById('tweet').value
    if( tweet.trim() !== '' ){
        const fragment = document.createDocumentFragment()
        const lista = document.createElement('li')
        lista.textContent = tweet

        const botonBorrar = document.createElement('a')
        botonBorrar.classList.add('borrar-tweet')
        botonBorrar.textContent = 'X'
        lista.appendChild(botonBorrar)
    
        fragment.appendChild(lista)
        listaTweets.appendChild(fragment)
    
        form.reset()
    
        //Añadir el tweet a LocalStorage
        agregarTweetLocalStorage(tweet)
    }else{
        alert('Ingresa un pensamiento')
    }

}

    //Borrar el tweet de la lista
const borrarTweet = (e) =>{
    e.preventDefault()
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove()
        borrarTweetLocalStorage(e.target.parentElement.textContent)
    }
}


    //Añadir el tweet a LocalStorage
const agregarTweetLocalStorage = (tweet) =>{
    let tweets = obtenerTweetsLocalStorage()

    //Añade el nuevo tweet
    tweets.push(tweet)

    localStorage.setItem('tweets', JSON.stringify(tweets))
}

    //Obtenemos los tweets del localStorage
const obtenerTweetsLocalStorage = () =>{
    let tweets
    if(localStorage.getItem('tweets') === null) tweets = []
    else tweets = JSON.parse(localStorage.getItem('tweets'))
    return tweets
}
    

    //Obtenemos el contenido del LocalStorage al cargar la página
const contenidoLocalStorage = () =>{
    let tweets = obtenerTweetsLocalStorage()
    
    for(const tweet of tweets){
        const fragment = document.createDocumentFragment()
        const lista = document.createElement('li')
        lista.textContent = tweet

        const botonBorrar = document.createElement('a')
        botonBorrar.classList.add('borrar-tweet')
        botonBorrar.textContent = 'X'
        lista.appendChild(botonBorrar)

        fragment.appendChild(lista)
        listaTweets.appendChild(fragment)
    }
}


    //Elimina un Tweet de LocalStorage
const borrarTweetLocalStorage = (tweet) =>{
    let tweets = obtenerTweetsLocalStorage()
    let tweetBorrado = tweet.substring(0, tweet.length - 1)
    tweets.forEach((tweet, index) =>{
        if (tweetBorrado === tweet) {
            tweets.splice(index, 1)
        }
    })        

    localStorage.setItem('tweets', JSON.stringify(tweets))
}
//------------------------------------------------------------------------------------------------------------
//Event Listeners

const eventListeners = () =>{
    form.addEventListener('submit', agregarTweet)
    
    listaTweets.addEventListener('click', borrarTweet)

    document.addEventListener('DOMContentLoaded', contenidoLocalStorage)
}

eventListeners()

