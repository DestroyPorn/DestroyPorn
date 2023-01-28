export default function getAll(){
    console.log("injected")

    return Array.from(document.getElementsByTagName('img'))
}

