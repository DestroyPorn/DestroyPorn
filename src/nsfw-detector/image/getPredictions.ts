import nsfw from "nsfwjs"

export default async function getPredictions(image:HTMLImageElement) {
    const model = await nsfw.load()
    const predictions = await model.classify(image)
    
    return predictions
}

