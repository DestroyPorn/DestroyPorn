import getPredictions from "./getPredictions";

export default async function classify(image:HTMLImageElement) {

    let predictions = await getPredictions(image)

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