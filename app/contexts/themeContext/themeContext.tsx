import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('darkTheme');
            if (storedTheme !== null) {
                setIsDarkTheme(JSON.parse(storedTheme));
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        await AsyncStorage.setItem('darkTheme', JSON.stringify(newTheme));
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
