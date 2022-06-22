import Axios from "axios";

export default {
    state: {
        PostData:[]
      },
      getters: {
        posts(state){
            return state.postData;
        }
      },
      actions:{
        postAll(data){
            Axios.get("post")
            .then(function(response){
               data.commit("posty",response.data.post);
               //console.log(response.data.category);
            }).catch(function(error){

            })
        }
      },
      mutations: {
        posty(state, data){
            return state.postData=data;
        }
      }
}
