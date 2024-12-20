import { StyleSheet } from 'react-native';

export const lightTheme = {
    backgroundColor: '#fff',
    textColor: '#333',
    buttonBackgroundColor: '#91c425',
    logoutButtonBackgroundColor: '#f44336',
    buttonTextColor: '#fff',
};

export const darkTheme = {
    backgroundColor: '#333',
    textColor: '#fff',
    buttonBackgroundColor: '#91c425',
    logoutButtonBackgroundColor: '#f44336',
    buttonTextColor: '#fff',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    placeholderLogo: {
        width: 120,
        height: 30,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    featuredCategories: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    category: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    placeholderCategoryIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 30,
    },
    categoryText: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
    carousel: {
        marginBottom: 20,
        alignItems: 'center',
    },
    placeholderCarouselImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    carouselText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
    },
    productGrid: {
        flex: 1,
    },
    productCard: {
        marginBottom: 16,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
    },
    placeholderProductImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#91c425',
    },
    productRating: {
        fontSize: 12,
        color: '#888',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        paddingBottom: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#91c425',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Adds shadow effect
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default styles;
