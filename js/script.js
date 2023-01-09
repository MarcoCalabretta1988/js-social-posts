// CHECK JS LINK
console.log('JS OK');


//! TRACCIA

/*
 Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
# Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore (potrebbe mancare a qualcuno),
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali, inventatele*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=3)*
#Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
#Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
# ****BONUS**
 1. Formattare le date in formato italiano (gg/mm/aaaa)
 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola  => LF).
 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
 */

 //? CREO ARRAY DI OGGETTI

 const posts = [
    {
        id: 1,
        name: 'Phil Mangione',
        authorPic:'img/Phil.jpg',
        date: new Date('10/21/2022') ,
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, quia voluptates? Incidunt facere repudiandae et quam sunt eveniet cupiditate nesciunt, similique exercitationem quos illum dolor aliquid error voluptas vitae dicta',
        postImg:'img/Trafic.jpg',
        numberOfLike:38,
    },
    {
        id: 2,
        name: 'Anna Lorem',
        authorPic:'',
        date: new Date('3/2/2022')  ,
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, quia voluptates? Incidunt facere repudiandae et quam sunt eveniet cupiditate nesciunt, similique exercitationem quos illum dolor aliquid error voluptas vitae dicta',
        postImg:'img/Lion.jpg',
        numberOfLike:995,
    },
    {
        id: 3,
        name: 'Sergio Miglio',
        authorPic:'img/Sergio.jpg',
        date: new Date('11/7/2022')  ,
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, quia voluptates? Incidunt facere repudiandae et quam sunt eveniet cupiditate nesciunt, similique exercitationem quos illum dolor aliquid error voluptas vitae dicta',
        postImg:'img/Country.jpg',
        numberOfLike:5,
    },
    {
        id: 4,
        name: 'Sara Ipsum',
        authorPic:'img/Sara.jpg',
        date: new Date('7/11/2022')  ,
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, quia voluptates? Incidunt facere repudiandae et quam sunt eveniet cupiditate nesciunt, similique exercitationem quos illum dolor aliquid error voluptas vitae dicta',
        postImg:'img/Palace.jpg',
        numberOfLike:365,
    },
    {
        id: 5,
        name: 'Elena Baboden',
        authorPic:'img/Elena.jpg',
        date: new Date('5/5/2022')  ,
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, quia voluptates? Incidunt facere repudiandae et quam sunt eveniet cupiditate nesciunt, similique exercitationem quos illum dolor aliquid error voluptas vitae dicta',
        postImg:'img/Bridge.jpg',
        numberOfLike:55,
    }

 ];
   
 //? ------------------------------------------------FUNZIONI----------------------------------------------------------------------------------
 


 const printPosts = () => {
    let postUploaded = '';


    
     posts.forEach(({id,name,authorPic,date,text,postImg,numberOfLike},i)=>{

        const getInitials = (name) =>{
          const words = name.split(' ');
          let initials = '';
          words.forEach(word=>{
           initials += word[0];
          })
          return initials.substring(0,2).toUpperCase();
        }

        let authorPicClasses = `<img class="profile-pic" src="${authorPic}" alt="${name}" />`;
         if (!authorPic){
          const initials = getInitials(name);
         authorPicClasses = `<div class="profile-pic-default">${initials}</div>`;
        }

         postUploaded += `
         <div class="post">
         <div class="post__header">
         <div class="post-meta">
         <div class="post-meta__icon">
           ${authorPicClasses}
         </div>
         <div class="post-meta__data">
         <div class="post-meta__author">${name}</div>
         <div class="post-meta__time">${date.toLocaleDateString()}</div>
         </div>
         </div>
         </div>
         <div class="post__text">${text}</div>
         <div class="post__image">
         <img src="${postImg}" alt="" />
         </div>
         <div class="post__footer">
       <div class="likes js-likes">
         <div class="likes__cta">
           <button class="like-button js-like-button" href="#" data-postid="${id}">
           <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
           <span class="like-button__label">Mi Piace</span>
           </button>
        </div>
           <div class="likes__counter">Piace a <b id="like-counter-${i}" class="js-likes-counter">${numberOfLike}</b> persone</div>
           </div>
           </div>
           </div>
           `
         });
         
         postList.innerHTML = postUploaded;
     }


//? --------------------------------------------PRENDO ELEMENTI DAL DOM -----------------------------------------------------------------------------

const postList = document.querySelector('.posts-list');


//? ----------------------------------------------EVENTI INIZIALI------------------------------------------------------------------------------------
let isClicked = false;
         
printPosts();

const likeButton = document.querySelectorAll('.likes__cta button');


//? ---------------------------------------------EVENTI DINAMICI-------------------------------------------------------------------------------------


likeButton.forEach ((button,i)=>button.addEventListener('click', () =>{
    const likeCounter = document.getElementById(`like-counter-${i}`);
    isClicked = !isClicked;
    let newNumberOfLike = posts[i].numberOfLike;

    if(isClicked){
        event.target.classList.add('like-button--liked');
        newNumberOfLike++;
    }
    else{
        event.target.classList.remove('like-button--liked');
        newNumberOfLike = posts[i].numberOfLike; 
    }
    likeCounter.innerText = newNumberOfLike;
    return;
}));


