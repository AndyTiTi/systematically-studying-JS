import $ from 'jquery'
import getCart from '../ShoppingCart/GetCart'
import StateMachine from 'javascript-state-machine'
import {log} from '../util/log'

export default class Item{
	constructor(list,data){
		this.list = list
		this.data = data
		this.$el = $('<div>')
		this.cart = getCart()
	}
	initContent(){
		let $el = this.$el
		let data = this.data
		$el.append($(`<p>名称：${data.name}</p>`))
		$el.append($(`<p>价格：${data.price}</p>`))
	}
	initBtn(){
		let $el = this.$el
		let $btn = $('<button>')

		let _this = this
		let fsm = new StateMachine({
			init:'加入购物车',
			transitions:[
				{
					name:'addToCart',
					from:'加入购物车',
					to:'从购物车删除'
				},
				{
					name:'deletFromCart',
					from:'从购物车删除',
					to:'加入购物车'
				}
			],
			methods:{
				onAddToCart:function(){
					_this.addToCartHandle()
					updataText()
				},
				//从购物车删除
				onDeleteFromCart:function(){
					_this.deleteFromCartHandle()
					updataText()
				}
			}

		})
		function updataText(){
			$btn.text(fsm.state)
		}

		$btn.click(()=>{
			//添加到购物车
			if(fsm.is('加入购物车')){
				fsm.addToCart()
			}else{
				fsm.onDeleteFromCart()
			}
			//从购物车删除
		})
		updataText()
		$el.append($btn)
	}
	
	@log('add')
	addToCartHandle(){
		this.cart.add(this.data)
	}

	@log('del')
	deleteFromCartHandle(){
		this.cart.del(this.data.id)
	}

	render(){
		this.list.$el.append(this.$el)
	}
	init(){
		this.initContent()
		this.initBtn()
		this.render()
	}
}