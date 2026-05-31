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
import { MessageSquare, ThumbsUp, Plus, X, Search } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyState from "@/components/EmptyState";

const POPULAR_TEAMS = [
  "All", "Brazil", "Argentina", "France", "England", "Spain", "Germany",
  "Portugal", "Mexico", "USA", "Canada", "Netherlands", "Italy", "Morocco",
];

const BLANK_FORM = { team: "", title: "", content: "", author_name: "" };

export default function ForumsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, colorScheme } = useTheme();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const { data: posts = [], refetch } = useQuery({
    queryKey: ["forums", search, teamFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (teamFilter !== "All") params.set("team", teamFilter);
      const res = await apiFetch(`/api/forums?${params}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
  });

  const createPost = useMutation({
    mutationFn: async (data) => {
      const res = await apiFetch("/api/forums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
      setShowModal(false);
      setForm(BLANK_FORM);
    },
    onError: () => Alert.alert("Error", "Failed to post. Please try again."),
  });

  const likePost = useMutation({
    mutationFn: async (postId) => {
      const res = await apiFetch(`/api/forums/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      if (!res.ok) throw new Error("Failed to like post");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["forums"] }),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleSubmit = () => {
    if (!form.team || !form.title || !form.content) {
      Alert.alert("Missing Fields", "Please fill in Team, Title, and Content.");
      return;
    }
    createPost.mutate(form);
  };

  const prefillAuthor = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setForm((f) => ({ ...f, author_name: f.author_name || "Fan" }));
    setShowModal(true);
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
              Fan Forums
            </Text>
            <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>
              Talk football with fans worldwide
            </Text>
          </View>
          <TouchableOpacity
            onPress={prefillAuthor}
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
              Post
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 14 }}>
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
              placeholder="Search discussions..."
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={setSearch}
              style={{ flex: 1, marginLeft: 10, fontSize: 15, color: colors.text, fontFamily: "InstrumentSans_400Regular" }}
            />
          </View>
        </View>

        {/* Team Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginBottom: 20 }}
        >
          {POPULAR_TEAMS.map((team) => (
            <TouchableOpacity
              key={team}
              onPress={() => setTeamFilter(team)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 14,
                borderRadius: 20,
                backgroundColor: teamFilter === team ? colors.accent : colors.cardBackground,
                borderWidth: 1,
                borderColor: teamFilter === team ? colors.accent : colors.cardBorder,
              }}
            >
              <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: teamFilter === team ? "white" : colors.textSecondary }}>
                {team}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts */}
        <View style={{ paddingHorizontal: 20 }}>
          {posts.length === 0 ? (
            <EmptyState icon={MessageSquare} title="No posts yet" subtitle="Start the conversation!" />
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} colors={colors} onLike={() => likePost.mutate(post.id)} />
            ))
          )}
        </View>
      </ScrollView>

      {/* Create Post Modal */}
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
                New Post
              </Text>
              <TouchableOpacity onPress={() => { setShowModal(false); setForm(BLANK_FORM); }} activeOpacity={0.7}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
              <FormField label="Team *" value={form.team} onChangeText={(v) => setForm({ ...form, team: v })} placeholder="e.g. Brazil" colors={colors} />
              <FormField label="Post Title *" value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} placeholder="What do you want to discuss?" colors={colors} />
              <FormField label="Content *" value={form.content} onChangeText={(v) => setForm({ ...form, content: v })} placeholder="Share your thoughts, predictions, or questions..." colors={colors} multiline />
              <FormField label="Your Name (optional)" value={form.author_name} onChangeText={(v) => setForm({ ...form, author_name: v })} placeholder="Anonymous" colors={colors} />

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={createPost.isPending}
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 14,
                  padding: 16,
                  alignItems: "center",
                  marginTop: 8,
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold", color: "white" }}>
                  {createPost.isPending ? "Posting..." : "Post Discussion"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function PostCard({ post, colors, onLike }) {
  const timeAgo = () => {
    try {
      return formatDistanceToNow(new Date(post.created_date), { addSuffix: true });
    } catch {
      return "";
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
      {/* Team tag + time */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 3, backgroundColor: colors.accent + "20", borderRadius: 8, marginRight: 8 }}>
          <Text style={{ fontSize: 12, fontFamily: "Poppins_600SemiBold", color: colors.accent }}>{post.team}</Text>
        </View>
        <Text style={{ fontSize: 12, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted, flex: 1 }}>
          {timeAgo()}
        </Text>
      </View>

      <Text style={{ fontSize: 16, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 6 }}>
        {post.title}
      </Text>
      <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, lineHeight: 20, marginBottom: 12 }} numberOfLines={3}>
        {post.content}
      </Text>

      {/* Footer */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.borderLight }}>
        <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: colors.textMuted, flex: 1 }}>
          {post.author_name || "Anonymous"}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={onLike} style={{ flexDirection: "row", alignItems: "center" }} activeOpacity={0.7}>
            <ThumbsUp size={14} color={colors.textMuted} />
            <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginLeft: 4 }}>
              {post.likes ?? 0}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MessageSquare size={14} color={colors.textMuted} />
            <Text style={{ fontSize: 12, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginLeft: 4 }}>
              {post.replies_count ?? 0}
            </Text>
          </View>
        </View>
      </View>
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
        numberOfLines={multiline ? 4 : 1}
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
          minHeight: multiline ? 100 : undefined,
        }}
      />
    </View>
  );
}
