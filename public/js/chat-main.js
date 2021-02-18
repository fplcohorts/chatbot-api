var chatbotreply =   `<div class="received-chats">
        <div class="recieved-msg">
            <div class="recieved-msg-inbox">
                <p>##chatbotreply##</p>
                    <span>##time##</span>  
            </div>
        </div>
    </div>`;

var userreply = `<div class="outgoing-chats ">
<div class="outgoing-msg">
    <div class="outgoing-msg-inbox">
      <p>##userreply##</p>
      <span>##time##</span>  
    </div>
</div>
</div>`;

document.addEventListener("DOMContentLoaded", function(event) {
    var chat_container = document.getElementsByClassName("chatbot-container")[0];
    var chat_logo = document.getElementsByClassName("chatbot-logo")[0];
    var logo_hover = document.getElementsByClassName("logo-hover")[0];
    
    chat_logo.addEventListener('mouseover',() => {
        // chat_logo.css('cursor', 'pointer');
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
    var chatSendBtn = document.getElementsByClassName("chatbot-send-button")[0];

    document.getElementsByClassName("form-control")[0].addEventListener('keyup',(event)=>{
        if (event.which == 13) {
            event.preventDefault();
            triggerMouseEvent(chatSendBtn,"mouseup")
         }
    })    

    function triggerMouseEvent (node, eventType) {
        var clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent (eventType, true, true);
        node.dispatchEvent (clickEvent);
    }


    chatSendBtn.addEventListener( 'dblclick', function(event) {  
        // alert("Double-click disabled!");  
        event.preventDefault();  
        event.stopPropagation(); 
      },  true //capturing phase!!
    );
    chatSendBtn.addEventListener('mouseup',async ()=>{
        // console.log("btn clicked");
        var textfield = document.getElementsByClassName("form-control")[0];
        // textfield.style.
        if(textfield.value != "")
        {
            
            
            //  alert(document.getElementsByClassName("form-control")[0].value);
            var lst = document.getElementsByClassName("msg-page");
            lst[0].innerHTML = lst[0].innerHTML + userreply.replace("##userreply##", textfield.value).replace("##time##",new Date().toLocaleTimeString('en-GB', { hour12: true,hour: "numeric", minute: "numeric",}));           
            lst[0].scrollTop = lst[0].scrollHeight;
            var textcal = textfield.value;
            textfield.value = "";
            const response = await fetch('http://localhost:81/api?text='+ textcal, {
                method: 'POST',
                //   "text": textfield.value}, // string or object
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const myJson = await response.json(); //extract JSON from the http response
            lst[0].innerHTML = lst[0].innerHTML + chatbotreply.replace("##chatbotreply##", myJson).replace("##time##",new Date().toLocaleTimeString('en-GB', { hour12: true,hour: "numeric", minute: "numeric",}));           
            lst[0].scrollTop = lst[0].scrollHeight;
            // do something with myJson

        }
    })
  });
