import { getOriginalUrl, createNewUrl } from '../services/url-service.js'

const getUrl = async (req, res) => {
    try {
        const urlData = await getOriginalUrl(req.params.short_code);
        // res.status(200).json(urlData);
        res.redirect(urlData.original_url)
        
    } catch (error) {
        res.status(404).json({errorMessage:error.message});
    }
    
    
};

const createUrl = async (req, res) => {
    try {
        const urlData = await createNewUrl(req.body['original_url'],req.body['description'],req.body['short_code']);
        res.status(200).json(urlData)

    } catch (error) {
        res.status(400).json({errorMessage:error.message});
    }
};

export {getUrl, createUrl}