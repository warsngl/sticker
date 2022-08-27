import {getDownloadURL,ref } from "firebase/storage";
import storage from "./firebase/config";

export default{
  data:()=>({
  }),
  methods:{
    async getUrl(id,user) {
      let data;
      await getDownloadURL(ref(storage, `${user}/${id}`)).then((url) => {
        data = url;
      });
      // console.log(data);
      return data;
    },
    saveLS(state){
      localStorage.setItem("user", JSON.stringify(state))
    },
    getLS(){
      return JSON.parse(localStorage.getItem("user"))
    },
  }
}