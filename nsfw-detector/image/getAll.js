
alert("injected")



let a=document.getElementsByTagName('img');
for (var i=0,l=a.length;i<l;i++)
{
    if (/\.(jpg|gif|png|jpeg)$/im.test(a[i].getAttribute('src')))
    {
        alert(a[i].getAttribute('src'));
    }
}
