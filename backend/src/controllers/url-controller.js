import { getOriginalUrl, getUrlByShortCode, createNewUrl } from '../services/url-service.js'

const notFoundErrors = new Set(['Code does not exist']);
const badRequestErrors = new Set([
    'Empty code',
    'Original URL must be provided',
    'The URL provided is not correct',
    'The code provided already exists'
]);

const getStatusCodeFromError = (error) => {
    const message = error?.message || '';

    if (notFoundErrors.has(message)) {
        return 404;
    }

    if (badRequestErrors.has(message) || message.startsWith('Code must be between')) {
        return 400;
    }

    return 500;
};

const getUrl = async (req, res) => {
    try {
        const urlData = await getOriginalUrl(req.params.short_code);
        // res.status(200).json(urlData);
        res.redirect(urlData.original_url)
        
    } catch (error) {
        const statusCode = getStatusCodeFromError(error);
        res.status(statusCode).json({ error: error.message });
    }
    
    
};

const getUrlDetails = async (req, res) => {
    try {
        const urlData = await getUrlByShortCode(req.params.short_code);
        res.status(200).json(urlData);
    } catch (error) {
        const statusCode = getStatusCodeFromError(error);
        res.status(statusCode).json({ error: error.message });
    }
};

const createUrl = async (req, res) => {
    try {
        const urlData = await createNewUrl(req.body['original_url'],req.body['description'],req.body['short_code']);
        res.status(200).json(urlData)

    } catch (error) {
        const statusCode = getStatusCodeFromError(error);
        res.status(statusCode).json({ error: error.message });
    }
};

export {getUrl, getUrlDetails, createUrl}