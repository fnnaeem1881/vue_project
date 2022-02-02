import Axios from "axios";

export default {
    state: {
        CategoryData:[]
      },
      getters: {
        categories(state){
            return state.CategoryData;
        }
      },
      actions:{
        categoryAll(data){
            Axios.get("category")
            .then(function(response){
               data.commit("categoryy",response.data.category);
               //console.log(response.data.category);
            }).catch(function(error){

            })
        }
      },
      mutations: {
        categoryy(state, data){
            return state.CategoryData=data;
        }
      }
}
