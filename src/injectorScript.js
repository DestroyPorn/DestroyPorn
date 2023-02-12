export async function injectorScript(){
  console.log("script ingected");
  Array.from(document.getElementsByTagName('img'))
  .forEach(async (im)=>{
    console.log(im.src)
  })

  if(window.location.href === 'https://destroyporn.eu/'){
    var element = document.getElementById("destroyporn-running1")
    element.style.display = 'block'
  }
}

injectorScript()