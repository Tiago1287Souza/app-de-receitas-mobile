import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

import { authStyles } from "@/styles/auth.styles";
import { COLORS } from "@/constants/Colors";
import { Image } from "expo-image";

type VerifyEmailProps = {
  email: string;
  onBack: () => void;
};

export default function VerifyEmail({ email, onBack }: VerifyEmailProps) {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert("Erro", "Digite o código de verificação.");
      return;
    }

    try {
      setLoading(true);

      await signUp.attemptEmailAddressVerification({ code });

      await setActive({ session: signUp.createdSessionId });

      Alert.alert("Sucesso", "Email verificado com sucesso!");
    } catch (err: any) {
      console.log("Erro ao verificar código:", err);
      const errorMessage =
        err?.errors?.[0]?.message || "Código inválido. Tente novamente.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* IMAGE */}
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i3.png")}
              style={authStyles.image}
              contentFit="contain"
            />
          </View>

          <Text style={authStyles.title}>Verifique seu Email</Text>
          <Text style={authStyles.subtitle}>
            Nos enviamos o codigo de verificação para {email}
          </Text>

          <View style={authStyles.formContainer}>
            {/* VERIFICAÇÂO CODIGO INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Codigo"
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>
            {/* VERIFICAÇÃO BUTTON */}
            <TouchableOpacity
              style={[
                authStyles.authButton,
                loading && authStyles.buttonDisabled,
              ]}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Verificando..." : "Verificar Email"}
              </Text>
            </TouchableOpacity>

            {/* VOLTAR PARA O LOGIN */}
            <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
              <Text style={authStyles.linkText}>
                <Text style={authStyles.link}>Voltar para o Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
