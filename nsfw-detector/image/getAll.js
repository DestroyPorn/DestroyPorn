
alert("injected")



let a=document.getElementsByTagName('img');
for (var i=0,l=a.length;i<l;i++)
{
    if (/\.(jpg|gif|png|jpeg|webp)$/im.test(a[i].getAttribute('src')))
    {

    }
}
