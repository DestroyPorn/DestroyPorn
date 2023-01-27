export default function getAll(){

    //window.alert("injected")

    try{
        let a=document.getElementsByTagName('img');

        for (var i=0,l=a.length;i<l;i++){
            if (/\.(jpg|gif|png|jpeg)$/im.test(a[i].getAttribute('src')))
            {
                console.log(a[i].getAttribute('src'));
            }
        }
    }catch(err){
        console.log(err)
        return
    }
    
}

