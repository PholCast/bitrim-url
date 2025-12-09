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
const MAX_ATTEMPTS = 10;
const MIN_CODE_LENGTH = 5;
const MAX_CODE_LENGTH = 7;

const generateRandomCode = (length) => {
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }
    return code;
}


const createNewUrl = async (originalUrl, description, shortCode = '') => {
    if(!originalUrl) throw new Error('Original URL must be provided');

    originalUrl = normalizeUrl(originalUrl);
    if(!isValidUrl(originalUrl)) throw new Error('The URL provided is not correct');

    
    if (shortCode && (shortCode.length < MIN_CODE_LENGTH || shortCode.length > MAX_CODE_LENGTH)) {
        throw new Error(`Code must be between ${MIN_CODE_LENGTH} and ${MAX_CODE_LENGTH} characters`);
    }

    const existingCode = await UrlModel.findByShortCode(shortCode);
    if(existingCode) throw new Error('The code provided already exists');

    if(!shortCode){
        let codeLength = Math.floor(Math.random() * (MAX_CODE_LENGTH - MIN_CODE_LENGTH + 1)) + MIN_CODE_LENGTH;
        let exists = true;
        let attempts = 0;

        while(exists){

            if (attempts >= MAX_ATTEMPTS) {
                throw new Error('Unable to generate a unique code. Try again.');
            }

            shortCode = generateRandomCode(codeLength);
            if(!(await UrlModel.findByShortCode(shortCode))){
                exists = false;
            }

            attempts++;
        }
    }

    if(!description) description = null;

    const urlData = await UrlModel.createUrl(originalUrl,shortCode,description);

    return urlData;

}

export { getOriginalUrl, createNewUrl }