<template>

<div class="city_body">

	<div class="city_list">
		<Loading v-if="isLoading"></Loading>
		<Scroller v-else ref="city_List">
			<div>
			<div class="city_hot">
				<h2>热门城市</h2>
				<ul class="clearfix">
					<li v-for="item in hotlist":key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
				</ul>
			</div>
			<div class="city_sort" ref="city_sort">
				<div v-for="item in citylist":key="item.index">
					<h2 >{{item.index}}</h2>
					<ul>
						<li v-for="itemlist in item.list":key="itemlist.id" @tap="handleToCity(itemlist.nm,itemlist.id)">{{itemlist.nm}}</li>
					</ul>
				</div>
			</div>
			</div>
		</Scroller>
	</div>

	<div class="city_index">
		<ul>
<!--			<li v-for="item in citylist":key="item.index" @touchstart="handleToIndex(item.index)">{{item.index}}</li>-->
			<li v-for="(item ,i) in citylist":key="item.index" @touchstart="handleToIndex(i)">{{item.index}}</li>
		</ul>
	</div>

</div>

</template>

<script>
export default {
   name:'City',
	data(){
		return{
			citylist: [],
			hotlist: [],
			isLoading:true
		}
	},
	mounted() {

   		var cityList=window.localStorage.getItem('cityList');
   		var hotList=window.localStorage.getItem('hotList');
   		if(cityList&&hotList){
   			this.citylist=JSON.parse(cityList);
   			this.hotlist=JSON.parse(hotList);
   			this.isLoading=false;
		}else{
			this.axios.get('/api/cityList').then((res)=>{
				console.log(res);
				var msg=res.data.msg;
				if(msg==='ok'){
					var cities=res.data.data.cities;
					//[{index:'A',list:}]
					var {citylist,hotlist}=this.formatCityList(cities);
					this.citylist=citylist;
					this.hotlist=hotlist;
					this.isLoading=false;
					//不能直接存json 只能存string
					window.localStorage.setItem('cityList',JSON.stringify(citylist));
					window.localStorage.setItem('hotList',JSON.stringify(hotlist));
				}
			});
		}

	},
	methods:{
   		formatCityList(cities){
   			var citylist=[];
   			var hotlist=[];
   			for(var i=0;i<cities.length;++i){
   				if(cities[i].isHot==1){
   					hotlist.push(cities[i])
				}
			}
   			console.log(hotlist);
   			for(var i=0;i<cities.length;++i){
   				var firstLetter=cities[i].py.substring(0,1).toUpperCase();
   				if(toCom(firstLetter)){
					citylist.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]});
				}else{
					for(var j=0;j<citylist.length;++j){
						if(citylist[j].index===firstLetter){
							citylist[j].list.push({nm:cities[i].nm,id:cities[i].id});
						}
					}
				}
			}
   			citylist.sort((n1,n2)=>{
   				if(n1.index>n2.index){
   					return 1;
				}else if(n1.index<n2.index){
					return -1;
				}else{
					return 0;
				}
			});
   			function toCom(firstLetter) {
				for(var i=0;i<citylist.length;++i){
					if(citylist[i].index===firstLetter){
						return false;
					}
				}
				return true;
			}
   			console.log(citylist);
   			return {citylist,hotlist};
		},
		handleToIndex(index){
			console.log(index);
			var h2=this.$refs.city_sort.getElementsByTagName('h2');
			// for(var i=0;i<h2.length;++i){
			// 	if(h2[i].innerHTML===index){
			// 		this.$refs.city_sort.parentNode.scrollTop=h2[i].offsetTop;
			// 		break;
			// 	}
			// }
			//this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
			this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;

		},
		handleToCity(nm,id){
   			console.log(nm);
   			this.$store.commit('city/CITY_INFO',{nm,id});
   			window.localStorage.setItem('nowNm',nm);
   			window.localStorage.setItem('nowId',id);
   			this.$router.push('/movie/nowPlaying');
		}
	}

}
</script>

<style scoped>

#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}

.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}

.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>