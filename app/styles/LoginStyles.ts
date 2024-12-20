import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  successText: {
    color: 'green',
    marginBottom: 16,
},
  forgotPassword: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#91c425',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#777',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  signUpText: {
    textAlign: 'center',
    color: '#777',
  },
  signUpLink: {
    color: '#91c425',
    fontWeight: 'bold',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: 'black',
  },

});

export default styles;