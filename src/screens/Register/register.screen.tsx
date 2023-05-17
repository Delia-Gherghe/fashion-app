import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerStyles } from "./register.styles";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

export const Register = ({ navigation }: RegisterProps) => {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const {
    theme: { colors },
  } = useThemeConsumer();

  const [error, setError] = useState("");

  const clearError = () => setError("");

  const styles = registerStyles(colors);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text style={styles.signUpLabel}>Sign Up</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          onFocus={clearError}
          style={styles.input}
          value={registerForm.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            setRegisterForm({
              ...registerForm,
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
          value={registerForm.password}
          secureTextEntry
          onChangeText={(text) =>
            setRegisterForm({
              ...registerForm,
              password: text,
            })
          }
        />
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      {error && (
        <Text style={[styles.technical, styles.errorMessage]}>{error}</Text>
      )}
      <View style={styles.orContainer}>
        <View style={styles.orContainerLine} />
        <Text style={styles.technical}>OR</Text>
        <View style={styles.orContainerLine} />
      </View>
      <View style={styles.haveAccount}>
        <Text style={styles.technical}>Already have an account?</Text>
        <Text
          style={[styles.technical, styles.goToAccount]}
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </Text>
      </View>
    </SafeAreaView>
  );
};
