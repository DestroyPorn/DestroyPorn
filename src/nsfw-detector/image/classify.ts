import getPredictions from "./getPredictions";

export default async function classify(imageURL:string) {
    let im = new Image()
    im.src = imageURL
    let predictions = await getPredictions(im)


    if(predictions[0].className === 'Neutral'){
        return {
            ClassifiedAs:"Normal",
            WinnerTag:predictions[0].className,
            Probability:predictions[0].probability,
            AllOptions:[
                predictions
            ]
        }
    } else {
        return {
            ClassifiedAs:"NSFW",
            WinnerTag:predictions[0].className,
            Probability:predictions[0].probability,
            AllOptions:[
                predictions
            ]
        }
    }
}