import { isValidUrl } from '../utils/validators.js'
import { UrlModel } from '../models/url-model.js'
const getOriginalUrl = async (shortCode) => {
    
    if(!shortCode) throw new Error('Empty code');

    const urlData = await UrlModel.findByShortCode(shortCode);
    if(!urlData) throw new Error ('Code does not exist')

    return urlData;
    

}


const createNewUrl = async (originalUrl, shortCode, description = null) => {
    if(!originalUrl) throw new Error('Original URL must be provided');

    if(!shortCode){
        
    }



}

export { getOriginalUrl, createNewUrl }