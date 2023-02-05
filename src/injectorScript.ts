
import type { NSFWJS } from "@bakedpotatolord/nsfwjs";

export interface message{
  from: "injector" | "worker"
}

export interface imageMessage extends message{
  image:HTMLImageElement
}
//@ts-ignore
let model:NSFWJS = nsfwjs.load()

export async function injectorScript(){
  console.log("script injected");

  Array.from(document.getElementsByTagName('img'))
  .forEach(async (im)=>{
    console.log(im)
    console.log(model.classify(im))
  })

}

injectorScript()