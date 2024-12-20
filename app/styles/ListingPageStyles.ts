import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  uploadBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: "#ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  textarea: {
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 100,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  categoryField: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 0,
    alignItems: "center",
  },
  fieldText: {
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#505050",
  },
  picker: {
    height: 200,
    width: "100%",
    backgroundColor: "#505050",
  },
  characterCount: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },  
});
