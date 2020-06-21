<template>
	<v-col :cols="4">
		<v-card class="pa-4 ml-8">
			<v-card-title class="text-center">Add Ingredient</v-card-title>
			<v-card-text>
				<v-form @submit.prevent="addIngredient()">
					<div>
						<v-text-field class="pa-0" v-model="ingredient.name" label="Name" />
						<v-text-field class="pa-0" v-model="ingredient.amount" :rules="amountRules" label="Amount" />
						<v-text-field class="pa-0" v-model="ingredient.expiry" label="Expiry Date" />
					</div>
					<v-card-actions class="mx-0 px-0 my-2">
						<v-btn type="submit" color="info">Add</v-btn>
						<v-spacer />
						<v-btn v-on:click="speechRecognition()" id="button" value = 0 color="secondary" class="fab small">
							<v-icon>mdi-microphone</v-icon>
						</v-btn>
						<div id="result"></div>
					</v-card-actions>
				</v-form>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: "NewIngredient",
	props: {},
	data() {
		return {
			ingredient: {
				name: "",
				amount: "",
				expiry: ""
			}
		};
	},
	computed: {
		amountRules() {
			const rules = [];
			rules.push(v => /[0-9]+( |[A-z])*/g.test(v) || "Input a valid amount");
			return rules;
		}
	},
	methods: {
		addIngredient() {
			this.$store.commit("addIngredient", this.ingredient);
			this.$store.dispatch("pushIngredients", this.ingredient).then(
				(this.ingredient = {
					name: "",
					amount: "",
					expiry: ""
				})
			);
		}, // rules
		speechRecognition() {
			const button = document.getElementById("button");
			let listening;

			if(button.value == 0){
				button.value = 1;
				listening = true;
			}
			else{
				button.value = 0;
				listening = false;
			}

			const result = document.getElementById("result");
			

			let months = new Map([
				["January", "01"],
				["February", "02"],
				["March", "03"],
				["April", "04"],
				["May", "05"],
				["June", "06"],
				["July", "07"],
				["August", "08"],
				["September", "09"],
				["October", "10"],
				["November", "11"],
				["December", "12"]
			]);

			let res;


			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			if (typeof SpeechRecognition !== "undefined") {
				const recognition = new SpeechRecognition();
				recognition.continuous = true;
				recognition.interimResults = true;
				recognition.addEventListener("result", onResult);

				if(listening){
					start();
				}

				else{
					stop();
				}

				const stop = () => {
					

					recognition.stop();
					button.textContent = "Start listening";

					finalStr = "";
					for (let i = 0; i < result.children.length; i++) {
						finalStr += result.children[i].innerHTML;
					}

					if (finalStr.indexOf("of a ") >= 0)
						finalStr = finalStr.replace("of a ", "");
					if (finalStr.indexOf("to ") >= 0)
						finalStr = finalStr.replace("to ", "2 ");

					str = finalStr.split(" ");

					for (let j = 0; j < str.length - 1; j++) {
						if (str[j].toLowerCase().includes("ingredient")) {
							ingredients = str[j + 1];
							console.log("Ingredient: " + ingredients);
						}
						if (str[j].toLowerCase().includes("amount")) {
							amounts = str[j + 1] + " " + str[j + 2];
							console.log("Amount: " + amounts);
						}
						if (str[j].toLowerCase().includes("date")) {
							month = str[j + 1];
							formatMonth = months.get(month);
							day = str[j + 2].substring(0, str[j + 2].length - 2);
							if (day.length == 1) day = "0" + day;
							year = str[j + 3];
							console.log("Date: " + formatMonth + "/" + day + "/" + year);
						}
					}
				};

				const start = () => {
				
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
				
				
			} 
			else { }
		}
	}
};

/*
const button = document.getElementById("button");
const result = document.getElementById("result");

let months = new Map([['January', '01'], ['February', '02'], ['March', '03'],
['April', '04'], ['May', '05'], ['June', '06'], ['July', '07'],
['August', '08'], ['September', '09'], ['October', '10'], ['November', '11'],
['December', '12']]);


let res;

let listening = false;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();

    const stop = () => {
     

        recognition.stop();
        button.textContent = "Start listening";

        finalStr = "";
        for (let i = 0; i < result.children.length; i++) {
            finalStr += result.children[i].innerHTML;
        }


        if (finalStr.indexOf("of a ") >= 0) finalStr = finalStr.replace("of a ", "");
        if (finalStr.indexOf("to ") >= 0) finalStr = finalStr.replace("to ", '2 ');

        str = finalStr.split(" ");

        for (let j = 0; j < str.length - 1; j++) {
            if (str[j].toLowerCase().includes("ingredient")) {
                ingredients = str[j + 1]
                console.log("Ingredient: " + ingredients);
            }
            if (str[j].toLowerCase().includes("amount")) {
                amounts = str[j + 1] + " " + str[j + 2];
                console.log("Amount: " + amounts);
            }
            if (str[j].toLowerCase().includes("date")) {
                month = str[j + 1];
                formatMonth = months.get(month);
                day = str[j + 2].substring(0, str[j + 2].length - 2);
                if (day.length == 1) day = "0" + day;
                year = str[j + 3];
                console.log("Date: " + formatMonth + "/" + day + "/" + year);
            }

        }



    };

    const start = () => {
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

*/
</script>


<style>
</style>