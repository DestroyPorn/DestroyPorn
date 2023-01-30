
export interface message{
  from: "injector" | "worker"
}

export interface imageMessage extends message{
  image:HTMLImageElement
}

export async function injectorScript(){
  console.log("script injected");

  Array.from(document.getElementsByTagName('img'))
  .forEach(async (im)=>{
    console.log(im)
    chrome.runtime.sendMessage(
      <imageMessage>{
        image:im,
        from: "injector"
      },
      (res)=>{
        console.log(res)
      }
      )
  })

}

injectorScript()