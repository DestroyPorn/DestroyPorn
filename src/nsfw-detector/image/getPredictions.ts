import axios from "../../../lib/axios.js"
import nsfw from "../../../node_modules/nsfwjs/dist/index.js"
import tf  from '../../../node_modules/@tensorflow/tfjs-node/dist/index.js'


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

