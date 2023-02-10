

export default async function classify(predictions) {


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