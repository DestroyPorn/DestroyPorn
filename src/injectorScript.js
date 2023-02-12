export async function injectorScript(){
  console.log("script ingected");
  Array.from(document.getElementsByTagName('img'))
  .forEach(async (im)=>{
    console.log(im.src)
  })
}

injectorScript()