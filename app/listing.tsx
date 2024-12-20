import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Checkbox } from 'expo-checkbox';
import { db, collection, addDoc } from "./firebase/firebase";
import { styles } from "./styles/ListingPageStyles";
import { Picker } from "@react-native-picker/picker";

interface FormData {
  model: string;
  category: string;
  condition: string;
  description: string;
  minBid: string;
  price: string;
}

const ListingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    model: "",
    category: "Components",
    condition: "New",
    description: "",
    minBid: "",
    price: "",
  });

  const [isMinBidChecked, setIsMinBidChecked] = useState(false);
  const [isPriceChecked, setIsPriceChecked] = useState(false);
  const [isCategoryPickerVisible, setIsCategoryPickerVisible] = useState(false);
  const [isConditionPickerVisible, setIsConditionPickerVisible] = useState(false);

  const handleChange = (name: string, value: string): void => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: string): void => {
    if (name === "minBid") {
      setIsMinBidChecked(!isMinBidChecked);
      if (isMinBidChecked) {
        setFormData({ ...formData, minBid: "" });
      }
    } else if (name === "price") {
      setIsPriceChecked(!isPriceChecked);
      if (isPriceChecked) {
        setFormData({ ...formData, price: "" });
      }
    }
  };

  const handleDescriptionChange = (text: string): void => {
    if (text.length <= 255) {
      handleChange("description", text);
    } else {
      Alert.alert("Character Limit Reached", "Description cannot exceed 255 characters.");
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!formData.model || !formData.category || !formData.condition || !formData.description) {
      Alert.alert("Please fill out all the required fields (Model, Category, Condition, Description).");
      return;
    }

    if (!isMinBidChecked && !isPriceChecked) {
      Alert.alert("Please check at least one option for Min. Bid or Price.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "listings"), formData);
      Alert.alert(`Listing created with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Failed to create listing");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.uploadBox}>
        <Text style={styles.imagePlaceholder}>Upload Image</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Model:</Text>
        <TextInput
          style={styles.input}
          value={formData.model}
          onChangeText={(text) => handleChange("model", text)}
        />

        <Text>Category:</Text>
        <TouchableWithoutFeedback onPress={() => setIsCategoryPickerVisible(!isCategoryPickerVisible)}>
          <View style={styles.categoryField}>
            <Text style={styles.fieldText}>{formData.category}</Text>
          </View>
        </TouchableWithoutFeedback>

        {isCategoryPickerVisible && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.category}
              onValueChange={(itemValue) => {
                handleChange("category", itemValue);
                setIsCategoryPickerVisible(false);
              }}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="Components" value="Components" />
              <Picker.Item label="Peripherals" value="Peripherals" />
              <Picker.Item label="Accessories" value="Accessories" />
              <Picker.Item label="Devices" value="Devices" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        )}

        <Text>Condition:</Text>
        <TouchableWithoutFeedback onPress={() => setIsConditionPickerVisible(!isConditionPickerVisible)}>
          <View style={styles.categoryField}>
            <Text style={styles.fieldText}>{formData.condition}</Text>
          </View>
        </TouchableWithoutFeedback>

        {isConditionPickerVisible && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.condition}
              onValueChange={(itemValue) => {
                handleChange("condition", itemValue);
                setIsConditionPickerVisible(false);
              }}
              style={styles.picker}
              mode="dropdown"
            >
              <Picker.Item label="New" value="New" />
              <Picker.Item label="Used - Like New" value="Used - Like New" />
              <Picker.Item label="Used - Good Condition" value="Used - Good Condition" />
              <Picker.Item label="Used - Decent Condition" value="Used - Decent Condition" />
              <Picker.Item label="Used - Bad Condition" value="Used - Bad Condition" />
              <Picker.Item label="Broken" value="Broken" />
            </Picker>
          </View>
        )}

        <Text>Description:</Text>
        <TextInput
          style={styles.textarea}
          value={formData.description}
          onChangeText={handleDescriptionChange}
          multiline
          maxLength={255}
        />
        <Text style={styles.characterCount}>
          {formData.description.length}/255
        </Text>

        <Text>Min. Bid (in €):</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isMinBidChecked}
            onValueChange={() => handleCheckboxChange("minBid")}
          />
          <TextInput
            style={[styles.input, {
              backgroundColor: isMinBidChecked ? "white" : "#f0f0f0",
              width: isMinBidChecked && formData.minBid ? "90%" : "80%",
            }]}
            value={formData.minBid}
            onChangeText={(text) => handleChange("minBid", text)}
            keyboardType="numeric"
            editable={isMinBidChecked}
            placeholder={isMinBidChecked ? "Enter Min. Bid" : ""}
          />
        </View>

        <Text>Price (in €):</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isPriceChecked}
            onValueChange={() => handleCheckboxChange("price")}
          />
          <TextInput
            style={[styles.input, {
              backgroundColor: isPriceChecked ? "white" : "#f0f0f0",
              width: isPriceChecked && formData.price ? "90%" : "80%",
            }]}
            value={formData.price}
            onChangeText={(text) => handleChange("price", text)}
            keyboardType="numeric"
            editable={isPriceChecked}
            placeholder={isPriceChecked ? "Enter Price" : ""}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ListingPage;
