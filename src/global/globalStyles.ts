import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    backgroundColor: "#6d6de2",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    marginTop: 10,
    maxWidth: 300,
    color: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#fff",
  },
});
