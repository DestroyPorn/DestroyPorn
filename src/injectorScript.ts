
import nsfw from "@bakedpotatolord/nsfwjs"

export async function injectorScript(){
  console.log("script ingected");
  //const model = await nsfw.load()

  Array.from(document.getElementsByTagName('img'))
  .forEach(async (im)=>{
    console.log(im)
    //let [predictions] = await model.classify(im)
    //console.log(predictions)
  })

}

injectorScript()