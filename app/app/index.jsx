// app/app/index.jsx
import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const SERVER_URL = "http://localhost:3000";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!user || !pass) {
      return Alert.alert(
        "Missing fields",
        "Please enter both username and password."
      );
    }
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/doctors/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid credentials");
        throw new Error("Login failed");
      }
      const doctor = await res.json();

      // router.replace({
      //   pathname: "/dashboard",
      //   params: { doctorId: doctor.id },
      // });
      await login(doctor);
      router.replace("/dashboard"); // no params needed any more
    } catch (err) {
      Alert.alert("Login Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Text style={styles.title}>Welcome back</Text>
      <TextInput
        value={user}
        onChangeText={setUser}
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        value={pass}
        onChangeText={setPass}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title={loading ? "Logging in…" : "Log in"}
        onPress={handleLogin}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
});
