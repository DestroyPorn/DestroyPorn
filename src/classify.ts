import type nsfw from "@bakedpotatolord/nsfwjs"

interface prediction{
    isNSFW: boolean
    winnerTag: nsfw.predictionType["className"]
    probability: number
}

export default function classify(predictions:nsfw.predictionType):prediction {

    if(predictions.className === 'Neutral'){
        return {
            isNSFW:false,
            winnerTag:predictions.className,
            probability:predictions.probability,
        }
    } else {
        return {
            isNSFW:true,
            winnerTag:predictions.className,
            probability:predictions.probability,
        }
    }
}