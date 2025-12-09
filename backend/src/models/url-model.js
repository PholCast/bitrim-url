import { pool } from '../config/db.js'

export const UrlModel = {
    async createUrl(originalUrl,shortCode,description){

        const result = await pool.query(
            `INSERT INTO urls (original_url,short_code,description) 
            VALUES ($1,$2,$3)
            RETURNING *`,
            [originalUrl,shortCode,description]
        );

        return result.rows[0];

    },

    async findByShortCode(short_code){
        const result = await pool.query(
            'SELECT * FROM urls WHERE short_code = $1',[short_code]
        );

        return result.rows[0];  
    },
    
    async updateClicks(short_code){
        const result = await pool.query(
            'UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1',[short_code]
        );
        
        return result.rows[0];

    }

}