import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase/firebase';
import { useRouter } from 'expo-router';
import styles from './styles/AccountTypeStyles';

const AccountTypeScreen: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!selectedType) {
            alert('Please select an account type.');
            return;
        }

        const user = auth.currentUser;
        if (user) {
            try {
                // Update the user's document in Firestore with the account type
                await updateDoc(doc(db, 'users', user.uid), { accountType: selectedType });
                alert('Account type updated successfully!');
                // Navigate to the next screen or home screen
                router.push('./login');
            } catch (error) {
                console.error('Error updating account type:', error);
                alert('Failed to update account type. Please try again.');
            }
        } else {
            alert('No user is currently logged in.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quick Question!</Text>
            <Text style={styles.subHeader}>Are you interested to be a Buyer, Seller, or Both?</Text>
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[styles.option, selectedType === 'buyer' && styles.selectedOption]}
                    onPress={() => setSelectedType('buyer')}
                >
                    <Image source={require('./assets/images/buyer.png')} style={styles.icon} />
                    <Text style={styles.optionText}>Buyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selectedType === 'seller' && styles.selectedOption]}
                    onPress={() => setSelectedType('seller')}
                >
                    <Image source={require('./assets/images/seller.png')} style={styles.icon} />
                    <Text style={styles.optionText}>Seller</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selectedType === 'both' && styles.selectedOption]}
                    onPress={() => setSelectedType('both')}
                >
                    <Image source={require('./assets/images/partner.png')} style={styles.icon} />
                    <Text style={styles.optionText}>Both</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};



export default AccountTypeScreen;
