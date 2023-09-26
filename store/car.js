export default{
    namespaced:true,
    //数据，相当于data
     state:{
         // 定义car数组
         carData:JSON.parse(uni.setStorageSync('cart')||'[]')
     },
     getters: {
         total(state){
             // if(state.carData.lenght===0) return
             return state.carData.reduce((totalGoodsNum,item)=>{
                 return totalGoodsNum+item.goods_count
             },0)
         },
         // 定义选定商品的总数
         checkedGoodsNum(state){
             return state.carData.filter(item => item.goods_state).reduce((checkedGoods,checkdItem)=>{
                 return checkdItem.goods_count+checkedGoods
             },0)
         },
         // 定义计算勾选商品的价格总量
         checkedGoodsAmount(state){
            return state.carData.filter(item=>item.goods_state===true).reduce((totalAmount,checkItem)=>{
                 return totalAmount+=checkItem.goods_count*checkItem.goods_price
             },0).toFixed(2)
         }
     },
     //里面定义方法，操作state方发
     mutations: {
         // 添加购物车
         addToCart(state,goods){
             const findReslut = state.carData.find(item=>item.goods_id===goods.goods_id)
             if(!findReslut){
                 state.carData.push(goods)
             }else{
                 findReslut.goods_count++
             }
            this.commit('carStore/saveGoodsToStroage')
         },
         // 定义更新数据的接口函数
         updataGoodsState(state,goods){
             const updataReslut = state.carData.find(item=>item.goods_id===goods.goods_id)
             if(!updataReslut) return
             updataReslut.goods_state=goods.goods_state
            this.commit('carStore/saveGoodsToStroage')
         },
         // 定义更新商品数量的接口函数
         updataGoodsCount(state,goods){
             const updataReslut = state.carData.find(item=>item.goods_id===goods.goods_id)
             if(!updataReslut) return
             updataReslut.goods_count=goods.goods_count
             this.commit('carStore/saveGoodsToStroage')
         },
         // 定义删除商品的接口函数
         byIdRemoveGoods(state,goods){
             state.carData = state.carData.filter(item=>{
                 return item.goods_id!==goods
             })
             this.commit('carStore/saveGoodsToStroage')
         },
         // 定义更新商品全选按钮
         updataAllGoodsState(state,goodsState){
             state.carData.forEach(item=>item.goods_state=goodsState)
             this.commit('carStore/saveGoodsToStroage')
         },
         // 实现持久化储存
         saveGoodsToStroage(state){
             uni.setStorageSync('cart',JSON.stringify(state.carData))
         },
     },
}