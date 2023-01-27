import getPredictions from "./getPredictions.js";



export default async function classify(imageURL:string) {
    let predictions = await getPredictions(imageURL)


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