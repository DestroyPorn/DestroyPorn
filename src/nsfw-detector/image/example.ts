export default async function example(){
    const classify = require('./classify.js')

    var nsfw_image_example = 'https://cdn.discordapp.com/attachments/1065928419059179522/1066087850371711047/meaAaGwObaaaamhsUPZEqiIbxKg8tny13.png' //example porn image
    var results = await classify(nsfw_image_example, true)
    
    if(results.ClassifiedAs === 'NSFW'){
        return console.log(`This image has been classified as NSFW, the probability of it being a ${results.WinnerTag} image is ${results.Probability}.`)
    } else {
        return console.log("Yay, this image is not nsfw!")
    }
}

