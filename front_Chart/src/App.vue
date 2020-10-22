<template>
  <div class="container">
	<div class="">
		<div class="banner mt-4">
			<h2 style="width: 20%;
			margin: auto" class="title is-5">
				Welcome to your inventory manager!
			</h2>
		</div>
		<my-select></my-select>
	</div>
  </div>
</template>


<script>

import mySelect from './components/Select'

export default {
  name: 'app',
  components: {
	mySelect
  }
}
</script>


<style>

</style>