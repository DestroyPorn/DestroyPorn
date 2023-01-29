import type nsfw from "@bakedpotatolord/nsfwjs"

export default async function classify(predictions:nsfw.predictionType) {


    if(predictions.className === 'Neutral'){
        return {
            ClassifiedAs:"Normal",
            WinnerTag:predictions.className,
            Probability:predictions.probability,
            AllOptions:[
                predictions
            ]
        }
    } else {
        return {
            ClassifiedAs:"NSFW",
            WinnerTag:predictions.className,
            Probability:predictions.probability,
            AllOptions:[
                predictions
            ]
        }
    }
}