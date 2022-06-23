import Axios from "axios";

export default {
    state: {
        CategoryData:[],
        PostData:[]
      },
      getters: {
        categories(state){
            return state.CategoryData;
        },
        post(state){
            return state.PostData;
        }
      },
      actions:{
        categoryAll(data){
            Axios.get("/get-category")
            .then(function(response){
                // console.log(response.data);
               // console.log(response);
               data.commit("categoryy",response.data.category);
            }).catch(function(error){

            })
        },
        PostGet(data){
            Axios.get("/get-post")
            .then(function(response){
                // alert('post');
               data.commit("posty",response.data.post);
            }).catch(function(error){

            })
        }
      },
      mutations: {
        categoryy(state, data){
            return state.CategoryData=data;
        },
        posty(state, data){
            return state.PostData=data;
        }
      }
}
