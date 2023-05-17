import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginStyles } from "./login.styles";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export const Login = ({ navigation }: LoginProps) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const {
    theme: { colors },
  } = useThemeConsumer();

  const [error, setError] = useState("");

  const clearError = () => setError("");

  const styles = loginStyles(colors);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text style={styles.signInLabel}>Sign In</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          onFocus={clearError}
          style={styles.input}
          value={loginForm.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            setLoginForm({
              ...loginForm,
              email: text,
            })
          }
        />
      </View>
      <View>
        <Text style={styles.passwordInput}>Password</Text>
        <TextInput
          onFocus={clearError}
          style={styles.input}
          value={loginForm.password}
          secureTextEntry
          onChangeText={(text) =>
            setLoginForm({
              ...loginForm,
              password: text,
            })
          }
        />
      </View>
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      {error && (
        <Text style={[styles.technical, styles.errorMessage]}>{error}</Text>
      )}
      <View style={styles.orContainer}>
        <View style={styles.orContainerLine} />
        <Text style={styles.technical}>OR</Text>
        <View style={styles.orContainerLine} />
      </View>
      <View style={styles.newAccount}>
        <Text style={styles.technical}>Don't have an account?</Text>
        <Text
          style={[styles.technical, styles.createNewAccount]}
          onPress={() => navigation.navigate("Register")}
        >
          Create one
        </Text>
      </View>
    </SafeAreaView>
  );
};
