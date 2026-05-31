import { apiFetch } from '@/utils/api';
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, X, Trash2, CalendarDays, MapPin } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyState from "@/components/EmptyState";

const STAGES = ["Group Stage", "Round of 16", "Quarter Final", "Semi Final", "Final"];
const COUNTRIES = ["USA", "Canada", "Mexico"];

const BLANK_FORM = {
  team1: "",
  team2: "",
  date: "",
  venue: "",
  city: "",
  country: "USA",
  stage: "Group Stage",
  notes: "",
};

export default function MyMatchesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [form, setForm] = useState(BLANK_FORM);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const getUserId = () => AsyncStorage.getItem("userId");

  const { data: matches = [], refetch } = useQuery({
    queryKey: ["myMatches"],
    queryFn: async () => {
      const userId = await getUserId();
      if (!userId) return [];
      const res = await apiFetch(`/api/my-matches?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch matches");
      return res.json();
    },
  });

  const createMatch = useMutation({
    mutationFn: async (data) => {
      const userId = await getUserId();
      const res = await apiFetch("/api/my-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
      });
      if (!res.ok) throw new Error("Failed to create match");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myMatches"] });
      closeModal();
    },
    onError: () => Alert.alert("Error", "Failed to save match."),
  });

  const updateMatch = useMutation({
    mutationFn: async (data) => {
      const userId = await getUserId();
      const res = await apiFetch("/api/my-matches", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId }),
      });
      if (!res.ok) throw new Error("Failed to update match");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myMatches"] });
      closeModal();
    },
    onError: () => Alert.alert("Error", "Failed to update match."),
  });

  const deleteMatch = useMutation({
    mutationFn: async (matchId) => {
      const userId = await getUserId();
      const res = await apiFetch(`/api/my-matches?id=${matchId}&userId=${userId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete match");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myMatches"] }),
    onError: () => Alert.alert("Error", "Failed to delete match."),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const openCreate = () => {
    setEditingMatch(null);
    setForm(BLANK_FORM);
    setShowModal(true);
  };

  const openEdit = (match) => {
    setEditingMatch(match);
    setForm({
      team1: match.team1,
      team2: match.team2,
      date: match.date,
      venue: match.venue,
      city: match.city,
      country: match.country,
      stage: match.stage,
      notes: match.notes || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMatch(null);
    setForm(BLANK_FORM);
  };

  const handleSubmit = () => {
    if (!form.team1 || !form.team2 || !form.date || !form.venue || !form.city) {
      Alert.alert("Missing Fields", "Please fill in Team 1, Team 2, Date, Venue, and City.");
      return;
    }
    if (editingMatch) {
      updateMatch.mutate({ ...form, id: editingMatch.id });
    } else {
      createMatch.mutate(form);
    }
  };

  const confirmDelete = (match) => {
    Alert.alert(
      "Delete Match",
      `Remove ${match.team1} vs ${match.team2}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteMatch.mutate(match.id) },
      ],
    );
  };

  const grouped = matches.reduce((acc, m) => {
    const key = m.city;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const stats = {
    total: matches.length,
    cities: new Set(matches.map((m) => m.city)).size,
    countries: new Set(matches.map((m) => m.country)).size,
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 12,
          paddingBottom: 12,
          paddingHorizontal: 20,
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.cardBackground,
            borderWidth: 1,
            borderColor: colors.cardBorder,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={18} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold", color: colors.text, flex: 1 }}>
          My Matches
        </Text>
        <TouchableOpacity
          onPress={openCreate}
          style={{
            backgroundColor: colors.accent,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
          activeOpacity={0.8}
        >
          <Plus size={16} color="white" />
          <Text style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold", color: "white", marginLeft: 4 }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      >
        {/* Stats Banner */}
        {matches.length > 0 && (
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 24 }}>
            <StatChip label="Matches" value={stats.total} colors={colors} />
            <StatChip label="Cities" value={stats.cities} colors={colors} />
            <StatChip label="Countries" value={stats.countries} colors={colors} />
          </View>
        )}

        {Object.keys(grouped).length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No matches booked"
            subtitle="Tap + Add to book your first match"
          />
        ) : (
          Object.entries(grouped).map(([city, cityMatches]) => (
            <View key={city} style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold", color: colors.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                {city}
              </Text>
              {cityMatches.map((match) => (
                <View
                  key={match.id}
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: colors.cardBorder,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
                        {match.team1} vs {match.team2}
                      </Text>
                      <View style={{ alignSelf: "flex-start", marginTop: 4, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors.accent + "15", borderRadius: 6 }}>
                        <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.accent }}>{match.stage}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <TouchableOpacity onPress={() => openEdit(match)} activeOpacity={0.7}
                        style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.borderLight, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 13, color: colors.textSecondary }}>✏️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => confirmDelete(match)} activeOpacity={0.7}
                        style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#FF415B15", justifyContent: "center", alignItems: "center" }}>
                        <Trash2 size={15} color={colors.accent} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                    <CalendarDays size={13} color={colors.textMuted} />
                    <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginLeft: 6 }}>
                      {(() => { try { return format(new Date(match.date), "EEE, MMM d yyyy · h:mm a"); } catch { return match.date; } })()}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MapPin size={13} color={colors.textMuted} />
                    <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginLeft: 6 }}>
                      {match.venue}
                    </Text>
                  </View>
                  {match.notes && (
                    <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginTop: 8, fontStyle: "italic" }}>
                      {match.notes}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      {/* Add / Edit Modal */}
      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: insets.top + 16,
                paddingHorizontal: 20,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
                {editingMatch ? "Edit Match" : "Add Match"}
              </Text>
              <TouchableOpacity onPress={closeModal} activeOpacity={0.7}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <FormField label="Team 1 *" value={form.team1} onChangeText={(v) => setForm({ ...form, team1: v })} placeholder="e.g. Brazil" colors={colors} />
              <FormField label="Team 2 *" value={form.team2} onChangeText={(v) => setForm({ ...form, team2: v })} placeholder="e.g. Argentina" colors={colors} />
              <FormField label="Date & Time * (YYYY-MM-DD HH:MM)" value={form.date} onChangeText={(v) => setForm({ ...form, date: v })} placeholder="2026-06-20 20:00" colors={colors} />
              <FormField label="Stadium / Venue *" value={form.venue} onChangeText={(v) => setForm({ ...form, venue: v })} placeholder="e.g. Estadio Azteca" colors={colors} />
              <FormField label="City *" value={form.city} onChangeText={(v) => setForm({ ...form, city: v })} placeholder="e.g. Mexico City" colors={colors} />

              {/* Country Selector */}
              <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textSecondary, marginBottom: 8 }}>Country *</Text>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
                {COUNTRIES.map((c) => (
                  <TouchableOpacity key={c} onPress={() => setForm({ ...form, country: c })}
                    style={{ flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center",
                      backgroundColor: form.country === c ? colors.accent : colors.cardBackground,
                      borderWidth: 1, borderColor: form.country === c ? colors.accent : colors.cardBorder }}>
                    <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: form.country === c ? "white" : colors.textSecondary }}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Stage Selector */}
              <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textSecondary, marginBottom: 8 }}>Stage</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                {STAGES.map((s) => (
                  <TouchableOpacity key={s} onPress={() => setForm({ ...form, stage: s })}
                    style={{ paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginRight: 8,
                      backgroundColor: form.stage === s ? colors.accent : colors.cardBackground,
                      borderWidth: 1, borderColor: form.stage === s ? colors.accent : colors.cardBorder }}>
                    <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: form.stage === s ? "white" : colors.textSecondary }}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <FormField label="Notes (optional)" value={form.notes} onChangeText={(v) => setForm({ ...form, notes: v })} placeholder="Seat number, travel notes..." colors={colors} multiline />

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={createMatch.isPending || updateMatch.isPending}
                style={{ backgroundColor: colors.accent, borderRadius: 14, padding: 16, alignItems: "center" }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold", color: "white" }}>
                  {createMatch.isPending || updateMatch.isPending ? "Saving..." : editingMatch ? "Save Changes" : "Add Match"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function StatChip({ label, value, colors }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.cardBackground, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: colors.cardBorder, alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontFamily: "Poppins_600SemiBold", color: colors.accent }}>{value}</Text>
      <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

function FormField({ label, value, onChangeText, placeholder, colors, multiline = false }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textSecondary, marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 11,
          fontSize: 15,
          color: colors.text,
          fontFamily: "InstrumentSans_400Regular",
          borderWidth: 1,
          borderColor: colors.cardBorder,
          textAlignVertical: multiline ? "top" : "center",
          minHeight: multiline ? 80 : undefined,
        }}
      />
    </View>
  );
}
