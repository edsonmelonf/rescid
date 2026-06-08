import {supabase} from '../lib/supabase.js';

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação ausente' });
    }
    try {
        const {data, error} = await supabase.auth.getUser(token);
        if (error) {
            return res.status(401).json({ message: 'Token de autenticação inválido' });
        }
        req.user = data.user;
        req.token = token;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
