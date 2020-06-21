    const button = document.getElementById("button");
    const result = document.getElementById("result");
    const main = document.getElementsByTagName("main")[0];

    let months = new Map([['January','01'],['February','02'],['March','03'],
    ['April','04'],['May','05'],['June','06'],['July','07'],
    ['August','08'],['September','09'],['October','10'],['November','11'],
    ['December','12']]);
    
    console.log(months);
    
    let res;
    
    let listening = false;  

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (typeof SpeechRecognition !== "undefined") {
        const recognition = new SpeechRecognition();

        const stop = () => {
            main.classList.remove("speaking");
          
            recognition.stop();
            button.textContent = "Start listening";

            finalStr = "";
            for(let i=0; i<result.children.length; i++){
                finalStr += result.children[i].innerHTML;
            }

   
            if(finalStr.indexOf("of a ") >= 0) finalStr = finalStr.replace("of a ", ""); 
            if(finalStr.indexOf("to ") >= 0) finalStr = finalStr.replace("to ", '2 ');       

            str = finalStr.split(" ");
            
            for(let j = 0; j<str.length-1;j++){
                if(str[j].toLowerCase().includes("ingredient")){
                    ingredients = str[j+1]
                    console.log("Ingredient: " + ingredients);
                }
                if(str[j].toLowerCase().includes("amount")){
                    amounts = str[j+1] + " " + str[j+2];
                    console.log("Amount: " + amounts);
                }
                if(str[j].toLowerCase().includes("date")){
                    month = str[j+1];
                    formatMonth = months.get(month);
                    day = str[j+2].substring(0, str[j+2].length-2);
                    if(day.length == 1) day = "0" + day;
                    year = str[j+3];
                    console.log("Date: " + formatMonth + "/" + day + "/" + year);
                }
                
            }

        
            
        };

        const start = () => {
            main.classList.add("speaking");
            recognition.start();
            button.textContent = "Stop listening";
        };

        const onResult = event => {

            result.innerHTML = "";

            
            for (res of event.results) {
                
                const text = document.createTextNode(res[0].transcript);
                const p = document.createElement("p");
                if (res.isFinal) {  
                    p.classList.add("final");
                }

                p.appendChild(text);
                result.appendChild(p);
                
            }
        };
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.addEventListener("result", onResult);
        button.addEventListener("click", event => {
            listening ? stop() : start();
            listening = !listening;
        });
    } else {
        button.remove();
        const message = document.getElementById("message");
        message.removeAttribute("hidden");
        message.setAttribute("aria-hidden", "false");
    }





