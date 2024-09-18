import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/api';

export const useAuthCheck = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    console.log("status auth:", isAuthenticated)
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthenticated(false)
            navigate('/login');
            return;
        }

        const getUserData = async () => {
            try {
                const response = await fetchUser(token);
                setUser(response.data);
                setIsAuthenticated(true)
            } catch (error) {
                setError('Failed to fetch user data');
                setIsAuthenticated(false)
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [navigate]);

    return { loading, error, user, isAuthenticated };
};
