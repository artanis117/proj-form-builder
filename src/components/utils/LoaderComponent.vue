<template>
	<div v-if="show_loader" class="loader-container">
		<div class="wrapper">
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '@/utils'

	export default {
		name: 'loader-component',
		components: {},
		props: {
			id: {
				type: [String],
				default: ''
			}
		},
		data() {
			return {
				loader: {},
				defaultOptions: {
					show: false,
					minLoad: false,
					minLoadTime: 500
				}
			}
		},
		computed: {
			show_loader() {
				return this.loader.show || this.loader.minLoad
			}
		},
		methods: {
			setLoader(options) {
				this.loader = Object.assign(this.defaultOptions, options)
			}
		},
		created() {
			this.loader = this.defaultOptions
			let id = this.id ? `-${this.id}` : ''
			EventBus.$on(`set-loader${id}`, this.setLoader)
		},
		destoryed() {
			let id = this.id ? `-${this.id}` : ''
			EventBus.$off(`set-loader-${id}`)
		}
	}
</script>

<style lang="scss" scoped>
	.loader-container {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 99999 !important;
		background-color: rgba(0, 0, 0, 0.5);
	}

	@mixin obj($w,$h,$bg) {
		width: $w;
		height: $h;
		background: $bg;
	}

	@mixin anim($listName,$delay){
		@each $currentBox in $listName {
			$i: index($listName, $currentBox);
			&:nth-child(#{$currentBox}) {
			animation-delay: 0.1s * $i + $delay;
			}
		}
	}

	.wrapper {
		@include obj(auto,auto,null);
	}

	ul {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		animation:rot 16s linear infinite;
		@keyframes rot {
			100% {
			transform:rotate(360deg);
			}
		}
	}

	li {
		@include obj(40px,40px,var(--loader-color));
		border-radius:4px;
		box-shadow: 0 0 1px #fff, 0 0 5px var(--loader-color), 0 0 10px var(--loader-color), 0 0 15px var(--loader-color), 0 0 25px var(--loader-color), 0 0 55px var(--loader-color);
		animation: scale 0.8s linear alternate infinite;

		@keyframes scale {
			100% {
			transform: scale(.1);
			opacity: 0;
			}
		}
		@for $i from 1 through 25 {
			&:nth-child(#{$i}) {
			z-index: 25 - $i;
			}
		}
		@for $i from 1 through 5 {
			&:nth-child(#{$i}) {
			animation-delay: 0.1s * $i;
			}
			&:nth-child(#{$i + 6}) {
			@if ($i<5) {
				animation-delay: 0.1s * $i + 0.2s;
			}
			}
			&:nth-child(#{$i + 12}) {
			@if ($i<4) {
				animation-delay: 0.1s * $i + 0.4s;
			}
			}
			&:nth-child(#{$i + 18}) {
			@if ($i<3) {
				animation-delay: 0.1s * $i + 0.6s;
			}
			}
			&:nth-child(#{$i + 23}) {
			@if ($i<2) {
				animation-delay: 0.1s * $i + 0.8s;
			}
			}
		}

		$fCol: 1 6 11 16 21;
		@include anim($fCol,0);

		$sCol: 7 12 17 22;
		@include anim($sCol,0.2s);
		
		$tCol: 13 18 23;
		@include anim($tCol,0.4s);

		$foCol: 19 24;
		@include anim($foCol,0.6s);
		
		&:nth-child(25) {
			animation-delay: 0.9s;
		}
	}
</style>
