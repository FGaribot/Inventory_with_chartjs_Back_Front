<template>
<div>
	<div class="box my-3">
		<multiselect
		v-model="values"
		:options="options"
		:multiple="true"
		label="productName"
		track-by="productId"
		placeholder="Please select a product to see invetory"
		@input="updateProducts"
		>
		</multiselect>
	</div>
	<div class='box'>
		<line-chart v-if='loaded'
			:width="500"
			:height="300"
			:datasets="displayedDatasets"
		></line-chart>	
	</div>
	<div class='container'>
		<div class='box'>
			<div class="">
				<h2 style="width: 50%;
				margin: auto" class="title is-6 mb-2">
					For modify a quantity or add a date please select a product here!
				</h2>
			</div>
			<form @submit="formSubmit" onsubmit="return false">
				<div class="">
					<multiselect
					v-model="productToModify"
					:options="options"
					label="productName"
					:multiple="false"
					></multiselect>
				</div>

				<div class="row padding px-3">
					<div class="mt-3 pr-3">
						<input v-model='newQuantity' type='number' min='0'>
					</div>
					<div class="mt-3 pr-3">
						<date-picker v-model="dateToModify" valueType="format"></date-picker>
					</div>
					<div class="mt-3 pr-3">
						<input class="btn btn-primary"
							type="submit"
							value="Send new Inventory"
							:disabled='isDisabled'
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
</template>


<script>
import Multiselect from 'vue-multiselect';
import axios from 'axios'
import LineChart from './LineChart'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';



const dataUrl = 'http://localhost:8080/product/list'

export default {
	name: 'myselect',
	components: {
		Multiselect,
		LineChart,
		DatePicker
	},
	data() {
		return {
			// This is the array we will populate when a selection is made (@input listener)
			productsSelected: [],
			// This is the array that is used by vue-multiselect (v-model)
			values: [],
			// This is the array for the selectable options available to the user (:options param)
			options: [],
			datasets: {},
			productToModify: '',
			dateToModify: null,
			newQuantity: null,
			loaded: false
		}
	},

	mounted() {
		this.fetchOptions();
	},

	methods: {

		/**
		 * Updates the products form array when a selection is made.
		 *
		 * @param values
		 *
		 * @return void
		 */
		
		addLabel(values) {
		let newDataset = {}

			for (let i = 0; i < values.length; i++){
				newDataset[values[i].productId] = { label: values[i].productName }
			}
			return newDataset
		},

		addColor(i){
			let colors = [
				'#00CC6A',
				'#FF5733',
				'#FFF033',
				'#F333FF',
				'#3358FF',
				'#33FFF6'
				]
			return colors[i % 6]
		},
		addData(id) {
			// let newData = []

			return new Promise((resolve) => { 
				axios 
				.get('http://localhost:8080/product/inventory/' + id)
				.then(inventory => {
					const newData = inventory.data.map(({ quantity, date }) => ({ y: quantity, t: date}));
					this.loaded = true
					resolve(newData)
				})
				.catch(error => {
					alert(error)
				})
			})
		},
		async updateProducts(values) {
			
			this.loaded = false
			this.productsSelected = values.map(v => v.productId)
			let test = this.addLabel(values)
			for(let i = 0; i < values.length; i++)
				test[values[i].productId].backgroundColor = this.addColor(i)

			for(let i = 0; i < values.length; i++)
				test[values[i].productId].data = await this.addData(values[i].productId)
			this.datasets = test
		},
		/**
		 * Fetches valid products.
		 *
		 * @return void
		 */
		fetchOptions() {
			axios.get('http://localhost:8080/product/list').then(response  => {
				(this.options = response.data)
			})
		},
		formSubmit() {
			let modifDateQuantity = {
				product_id: this.productToModify.productId,
				product_name: this.productToModify.productName,
				inventory: [{
					date: this.dateToModify,
					quantity: this.newQuantity	
				}]
			}
			axios
				.post("http://localhost:8080/post/inventory", modifDateQuantity)
				.then(res => {
					this.updateProducts(this.values)
				})
		}
	}
	,
	computed: {
		displayedDatasets() {
			let dataset = this.productsSelected.map(product => this.datasets[product]);
			return dataset
		},
		isDisabled() {
			if (this.newQuantity && this.dateToModify && this.productToModify)
				return false
			return true
		}
	}

}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
