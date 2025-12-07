

const getShortUrl = (req, res) => {
    const url = getUrl(req.url);
    res.status(200).json(url)
};

const createNewUrl = (req, res) => {
    
    res.json({route: ""})
};