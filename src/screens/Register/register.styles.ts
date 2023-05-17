import { StyleSheet } from "react-native";
import { ThemeColors } from "../../utils/theme/colors";

export const registerStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    authContainer: {
      width: "86%",
      margin: "7%",
      flex: 1,
      justifyContent: "center",
    },
    errorMessage: {
      marginTop: 12,
      color: "#ba1a1a",
      fontWeight: "500",
      fontSize: 14,
    },
    signUpLabel: {
      marginBottom: 30,
      fontSize: 22,
      fontWeight: "700",
    },
    signUpButton: {
      marginVertical: 30,
      borderRadius: 20,
      backgroundColor: colors.dark,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
    },
    signUpText: {
      fontSize: 14,
      fontWeight: "400",
      color: colors.textDark,
    },
    passwordInput: {
      marginTop: 12,
    },
    input: {
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 10,
      color: "#1b1b1f",
      paddingHorizontal: 20,
      borderColor: "#1b1b1f",
      marginTop: 8,
    },
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 30,
    },
    orContainerLine: {
      height: 1,
      backgroundColor: "#1b1b1f",
      flex: 0.48,
    },
    technical: {
      fontSize: 12,
      fontWeight: "300",
    },
    haveAccount: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 16,
    },
    goToAccount: {
      color: "#343dff",
      marginLeft: 4,
    },
  });
