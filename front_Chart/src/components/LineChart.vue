<template>
<div class="box">
  <canvas ref="myChart" :width="400" :height="400"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'productsStocks',
  props: {
    datasets: {
      type: Array,
	  required: true,
    }

  },
	data() {
		return {
			chart: null,
		}
	},  
	watch: {
		datasets(newDatasets) {
			// Replace the datasets and call the update() method on Chart.js //(async - await corrige 1 erreur)
			// instance to re-render the chart.
			this.chart.data.datasets = newDatasets;
			this.chart.update();
		}
	},
  


	mounted() {
		this.chart = new Chart(this.$refs.myChart, {
			type: 'bar',
			data: this.datasets,
			options: {
					responsive:true,
					maintainAspectRatio: false,
					title:{
						display:true,
						text:'Gestionnaire des stocks selon la date',
					},
					scales: {
						xAxes:[{
							display:true,
							type: 'time',
							time: {
								displayFormats:{
									quartier:'MMM YYYY',
								},
								unit:'day',
								round:'day',
							},
							distribution:'linear',
							scaleLabel: {
								display:true,
								labelString:'Date'
							},
							bounds:'data',
							ticks: {
								source:'auto',
							},
						}],
						yAxes:[{
							display:true,
							scaleLabel:'Inventory',
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			}
		)
	},




  beforeDestroy () {
    // Don't forget to destroy the Chart.js instance.
    if (this.chart) {
	  this.chart.destroy()
    }
  }
}
</script>
