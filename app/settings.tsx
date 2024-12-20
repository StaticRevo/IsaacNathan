import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { auth } from './firebase/firebase';
import { lightTheme, darkTheme, styles } from './styles/SettingsStyles';
import { useTheme } from './contexts/themeContext/themeContext';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const Settings: React.FC = () => {
    const router = useRouter();
    const { isDarkTheme, toggleTheme } = useTheme();
    const theme = isDarkTheme ? darkTheme : lightTheme;
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState('en');

    const showToast = (message: string) => {
        Toast.show({
            type: 'success',
            text1: message,
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

            <Text style={[styles.header, { color: theme.textColor }]}>Settings</Text>

            {/* Appearance Section */}
            <Text style={[styles.sectionHeader, { color: theme.textColor }]}>Appearance</Text>
            <View style={[styles.settingCard, { backgroundColor: theme.buttonBackgroundColor }]}>
                <FontAwesome name="moon-o" size={24} color={theme.textColor} />
                <Text style={[styles.settingText, { color: theme.textColor }]}>Enable Dark Theme</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={() => {
                        toggleTheme();
                        showToast('Theme updated');
                    }}
                    value={isDarkTheme}
                />
            </View>

            {/* Notifications Section */}
            <Text style={[styles.sectionHeader, { color: theme.textColor }]}>Notifications</Text>
            <View style={[styles.settingCard, { backgroundColor: theme.buttonBackgroundColor }]}>
                <FontAwesome name="bell" size={24} color={theme.textColor} />
                <Text style={[styles.settingText, { color: theme.textColor }]}>Enable Notifications</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={(value) => {
                        setNotificationsEnabled(value);
                        showToast('Notifications updated');
                    }}
                    value={notificationsEnabled}
                />
            </View>

            {/* Language Section */}
            <Text style={[styles.sectionHeader, { color: theme.textColor }]}>Language</Text>
            <View style={[styles.settingCard, { backgroundColor: theme.buttonBackgroundColor }]}>
                <FontAwesome name="language" size={24} color={theme.textColor} />
                <Text style={[styles.settingText, { color: theme.textColor }]}>Select Language</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    style={[
                        styles.picker,
                        {
                            color: theme.pickerTextColor, // Use the defined text color
                            backgroundColor: theme.pickerBackgroundColor, // Use the defined background color
                        },
                    ]}
                    onValueChange={(itemValue: React.SetStateAction<string>) => {
                        setSelectedLanguage(itemValue);
                        showToast('Language updated');
                    }}
                >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="Spanish" value="es" />
                    <Picker.Item label="French" value="fr" />
                </Picker>


            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.push('./home')}>
                    <FontAwesome name="home" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="heart" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="shopping-cart" size={24} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('./settings')}>
                    <FontAwesome name="cog" size={24} color="#91c425" />
                </TouchableOpacity>
            </View>

            <Toast />
        </View>
    );
};

export default Settings;

