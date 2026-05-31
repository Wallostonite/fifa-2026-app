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
import { CalendarCheck, MapPin, Users, Plus, X, Search, Clock } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import EmptyState from "@/components/EmptyState";

const EVENT_TYPES = ["Pre-Match Meetup", "Post-Match Celebration", "Watch Party", "City Tour", "Other"];

const BLANK_FORM = {
  title: "",
  description: "",
  team: "",
  city: "",
  venue_name: "",
  address: "",
  date_time: "",
  organizer_name: "",
  type: "Pre-Match Meetup",
};

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, colorScheme } = useTheme();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events", search, cityFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (cityFilter) params.set("city", cityFilter);
      const res = await apiFetch(`/api/events?${params}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    },
  });

  const createEvent = useMutation({
    mutationFn: async (data) => {
      const res = await apiFetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setShowModal(false);
      setForm(BLANK_FORM);
    },
    onError: () => Alert.alert("Error", "Failed to create event. Please try again."),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSubmit = () => {
    if (!form.title || !form.city || !form.venue_name || !form.date_time) {
      Alert.alert("Missing Fields", "Please fill in Title, City, Venue, and Date/Time.");
      return;
    }
    createEvent.mutate(form);
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 90,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20, flexDirection: "row", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 28, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 4 }}>
              Fan Events
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>
              Meetups, watch parties & city tours
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 12,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            <Plus size={18} color="white" />
            <Text style={{ fontSize: 13, fontFamily: "Poppins_600SemiBold", color: "white", marginLeft: 4 }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.cardBackground,
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: colors.cardBorder,
            }}
          >
            <Search size={18} color={colors.textMuted} />
            <TextInput
              placeholder="Search events..."
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
              style={{ flex: 1, marginLeft: 10, fontSize: 15, color: colors.text, fontFamily: "InstrumentSans_400Regular" }}
            />
          </View>
        </View>

        {/* Events List */}
        <View style={{ paddingHorizontal: 20 }}>
          {events.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="No events yet"
              subtitle="Be the first to create a fan meetup!"
            />
          ) : (
            events.map((event) => <EventCard key={event.id} event={event} colors={colors} />)
          )}
        </View>
      </ScrollView>

      {/* Create Event Modal */}
      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Modal Header */}
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
                Create Event
              </Text>
              <TouchableOpacity onPress={() => { setShowModal(false); setForm(BLANK_FORM); }} activeOpacity={0.7}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <FormField label="Title *" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} placeholder="e.g. Pre-match meetup at the square" colors={colors} />
              <FormField label="City *" value={form.city} onChangeText={(v) => setForm({ ...form, city: v })} placeholder="e.g. Mexico City" colors={colors} />
              <FormField label="Venue / Meeting Point *" value={form.venue_name} onChangeText={(v) => setForm({ ...form, venue_name: v })} placeholder="e.g. Zócalo Plaza main entrance" colors={colors} />
              <FormField label="Date & Time * (YYYY-MM-DD HH:MM)" value={form.date_time} onChangeText={(v) => setForm({ ...form, date_time: v })} placeholder="2026-06-15 18:00" colors={colors} />
              <FormField label="Team (optional)" value={form.team} onChangeText={(v) => setForm({ ...form, team: v })} placeholder="e.g. Brazil" colors={colors} />
              <FormField label="Address (optional)" value={form.address} onChangeText={(v) => setForm({ ...form, address: v })} placeholder="Full street address" colors={colors} />
              <FormField label="Organizer Name (optional)" value={form.organizer_name} onChangeText={(v) => setForm({ ...form, organizer_name: v })} placeholder="Your name or group name" colors={colors} />
              <FormField label="Description (optional)" value={form.description} onChangeText={(v) => setForm({ ...form, description: v })} placeholder="What's happening at this event?" colors={colors} multiline />

              {/* Type Selector */}
              <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textSecondary, marginBottom: 8 }}>
                Event Type
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
                {EVENT_TYPES.map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setForm({ ...form, type: t })}
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      borderRadius: 20,
                      marginRight: 8,
                      backgroundColor: form.type === t ? colors.accent : colors.cardBackground,
                      borderWidth: 1,
                      borderColor: form.type === t ? colors.accent : colors.cardBorder,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: form.type === t ? "white" : colors.textSecondary }}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={createEvent.isPending}
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 14,
                  padding: 16,
                  alignItems: "center",
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold", color: "white" }}>
                  {createEvent.isPending ? "Creating..." : "Create Event"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function EventCard({ event, colors }) {
  const formatDT = (dt) => {
    try {
      return format(new Date(dt), "EEE, MMM d · h:mm a");
    } catch {
      return dt;
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 2 }}>
            {event.title}
          </Text>
          {event.team && (
            <View style={{ alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors.accent + "15", borderRadius: 6, marginBottom: 2 }}>
              <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.accent }}>{event.team}</Text>
            </View>
          )}
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: colors.borderLight, borderRadius: 8 }}>
          <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textSecondary }}>{event.type}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <Clock size={13} color={colors.accent} />
        <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.accent, marginLeft: 6 }}>
          {formatDT(event.date_time)}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <MapPin size={13} color={colors.textMuted} />
        <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginLeft: 6 }}>
          {event.venue_name}{event.city ? `, ${event.city}` : ""}
        </Text>
      </View>

      {event.description && (
        <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, lineHeight: 19, marginTop: 6 }} numberOfLines={2}>
          {event.description}
        </Text>
      )}

      {event.organizer_name && (
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.borderLight }}>
          <Users size={13} color={colors.textMuted} />
          <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted, marginLeft: 6 }}>
            Organised by {event.organizer_name}
          </Text>
        </View>
      )}
    </View>
  );
}

function FormField({ label, value, onChangeText, placeholder, colors, multiline = false }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textSecondary, marginBottom: 6 }}>
        {label}
      </Text>
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
