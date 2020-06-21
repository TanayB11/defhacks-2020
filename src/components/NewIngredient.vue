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
						<!-- "{{ resultText }}" -->
					</div>
					<v-card-actions class="mx-0 px-0 my-2">
						<v-btn type="submit" color="info">Add</v-btn>
						<v-spacer />
						<v-btn @click="speechRecognition()" id="button" :color="isListening ? 'primary' : 'secondary'" class="fab small">
							<v-icon v-if="!btnTxt">mdi-microphone</v-icon>
							{{ btnTxt }}
						</v-btn>
						<!-- <div id="result" style="display: none;"></div> -->
					</v-card-actions>
				</v-form>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
export default {
	name: "NewIngredient",
	props: {},
	data() {
		return {
			ingredient: {
				name: "",
				amount: "",
				expiry: ""
			},
			isListening: false,
			btnTxt: "",
			resultText: ""
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
			this.$store.commit("sortExpiry");
			this.$store.dispatch("pushIngredients", this.ingredient).then(
				(this.ingredient = {
					name: "",
					amount: "",
					expiry: ""
				})
			);
		},
		speechRecognition() {

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

			this.isListening = !this.isListening;
			if (this.isListening) {
				recognition.start();
			} else {
				recognition.stop();
			}

			recognition.onresult = event => {
				let finalStr = event.results[0][0].transcript;
				this.resultText = finalStr;

				if (finalStr.indexOf("of a ") >= 0)
					finalStr = finalStr.replace("of a ", "");
				if (finalStr.indexOf("to ") >= 0)
					finalStr = finalStr.replace("to ", "2 ");

				let str = finalStr.split(" ");
				console.log(str);

				// DEMO: ingredient 1 word, amount units, date say "date"

				for (let j = 0; j < str.length - 1; j++) {
					if (str[j].toLowerCase().includes("ingredient") || str[j].toLowerCase().includes("name")) {
						this.ingredient.name = str[j + 1]
						console.log("Ingredient: " + this.ingredient.name)
					}
					if (str[j].toLowerCase().includes("amount")) {
						this.ingredient.amount = str[j + 1] + " " + str[j + 2]
						console.log("Amount: " + this.ingredient.amount)
					}
					if (str[j].toLowerCase().includes("date") || str[j].toLowerCase().includes("expiry") || str[j].toLowerCase().includes("expires")) {
						let month = str[j + 1]
						let formatMonth = months.get(month)
						let day = str[j + 2].substring(0, str[j + 2].length - 2)
						if (day.length == 1) day = "0" + day
						let year = str[j + 3].substring(2, 4)
						this.ingredient.expiry = `${formatMonth}/${day}/${year}`
						console.log(`Date: ${formatMonth}/${day}/${year}`)
					}

				}
			}
		}
	}
}
</script>


<style>

</style>