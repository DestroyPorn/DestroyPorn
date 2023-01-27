import axios from "axios"
import nsfw from "nsfwjs"
import tf  from '@tensorflow/tfjs-node'


export default async function getPredictions(imageURL:string) {
    const pic = await axios.get(`${imageURL}`, {
        responseType: 'arraybuffer',
    })
    const model = await nsfw.load()
      
    const image = tf.node.decodeImage(pic.data,3,"int32",false)
    //@ts-ignore
    const predictions = await model.classify(image)
    image.dispose() 
    
    return predictions
}

