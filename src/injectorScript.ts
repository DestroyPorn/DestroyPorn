import classify from "./nsfw-detector/image/classify";


export function injectorScript(){
  console.log("script ingected");

  Array.from(document.getElementsByTagName('img'))
  .forEach(async (im)=>{
    alert(im)
    console.log(await classify(im))
  })
}
