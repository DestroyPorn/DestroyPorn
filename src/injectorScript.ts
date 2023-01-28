import classify from "./nsfw-detector/image/classify";
import getAll from "./nsfw-detector/image/getAll";

export default function injectorScript(){
  console.log("script ingected")
  getAll().forEach((im)=>{
    console.log(classify(im))
  })
}
