import { View, Text, FlatList } from "react-native";
import React from "react";
import { insertMany } from "../../../backend/Models/categoryModel";

export default function Jkl() {
  return (
    <View>
      <Text>Jkl</Text>
      <FlatList
        data={inventoryFullList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <InventoryItem
            itemName={item.itemName}
            currentQty={item.currentQty}
            currentQtyType={item.currentQtyType}
            shoppingListVisibility={item.shoppingListVisibility}
            showShoppingIcon={item.showShoppingIcon}
          />
        )}
      />
    </View>
  );
}
