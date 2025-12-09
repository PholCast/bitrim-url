import { isValidUrl, normalizeUrl } from '../utils/validators.js'
import { UrlModel } from '../models/url-model.js'
const getOriginalUrl = async (shortCode) => {
    
    if(!shortCode) throw new Error('Empty code');

    const urlData = await UrlModel.findByShortCode(shortCode);
    if(!urlData) throw new Error ('Code does not exist')

    await UrlModel.updateClicks(urlData['short_code'])
    
    return urlData;
    

}


const characters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';

const createNewUrl = async (originalUrl, description, shortCode = '') => {
    if(!originalUrl) throw new Error('Original URL must be provided');

    originalUrl = normalizeUrl(originalUrl);
    if(!isValidUrl(originalUrl)) throw new Error('The URL provided is not correct');

    
    
    if(!shortCode){
        let codeLength = Math.floor(Math.random() * 3) + 5; //max = 7, min = 5

        for(let i = 0; i < codeLength;i++) {
            shortCode += characters[Math.floor(Math.random() * characters.length)];
        };
    }

    if(shortCode.length < 5) throw new Error('Code must be at least 5 characters');

    const existingCode = await UrlModel.findByShortCode(shortCode);

    if(existingCode) throw new Error('The code provided already exists');

    if(!description) description = null;

    const urlData = await UrlModel.createUrl(originalUrl,shortCode,description);

    return urlData;

}

export { getOriginalUrl, createNewUrl }