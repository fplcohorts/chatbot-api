document.addEventListener("DOMContentLoaded", function(event) { 
    // const isHover = e => e.parentElement.querySelector(':hover') === e;    
    
    // const myDiv = document.getElementsByClassName("chatbot-logo")[0];
    // document.addEventListener('mousemove', function checkHover() {
    //   const hovered = isHover(myDiv);
    //   if (hovered !== checkHover.hovered) {
    //     console.log(hovered ?  document.getElementsByClassName("logo-hover")[0].style.visibility == "none" : 'not hovered');
    //     if(hovered)
    //     {
    //         // var chatcontainer = document.getElementsByClassName("chatbot-container")[0];
    
    //         // if(chatcontainer.style.visibility == "none"){
    //             document.getElementsByClassName("logo-hover")[0].style.visibility == "none";   
    //         // }
    //     }
        
    //     checkHover.hovered = hovered;
    //   }
    // });
    var chat_container = document.getElementsByClassName("chatbot-container")[0];
    var chat_logo = document.getElementsByClassName("chatbot-logo")[0];
    var logo_hover = document.getElementsByClassName("logo-hover")[0];
    
    chat_logo.addEventListener('mouseover',() => {
        console.log(chat_container.style.display == "");
        console.log(chat_container);
        if(document.getElementsByClassName("chatbot-container")[0].style.display == "none" || chat_container.style.display == ""){
            console.log("triggerd");
            logo_hover.style.display ="block";   
        }

    })
    
    chat_logo.addEventListener('mouseleave',() => {
        logo_hover.style.display ="none";   
    })
    chat_logo.addEventListener('mouseup',()=>{
        chat_container.style.display == "block" ? chat_container.style.display = "none" :
        chat_container.style.display = "block";
        if(logo_hover.style.display == "block")
        {
            logo_hover.style.display = "none";
        }

    })
  });
