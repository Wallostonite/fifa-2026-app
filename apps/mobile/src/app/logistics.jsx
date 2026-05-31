import { apiFetch } from '@/utils/api';
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, DollarSign, Languages, FileText, ChevronDown, ChevronUp } from "lucide-react-native";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";

const TABS = ["Currency", "Phrases", "Visa Info"];

const EXCHANGE_RATES = {
  USD: 1,
  CAD: 1.37,
  MXN: 17.15,
};

const VISA_INFO = {
  USA: {
    title: "Entering the USA",
    sections: [
      {
        heading: "Visa Requirements",
        body: "Many nationalities require an ESTA (Electronic System for Travel Authorization) to enter the USA under the Visa Waiver Program. ESTA must be approved before travel — apply at esta.cbp.dhs.gov. Citizens of countries not in the Visa Waiver Program must apply for a B-2 tourist visa at a US Embassy.",
      },
      {
        heading: "Important Documents",
        body: "Valid passport (6+ months validity), confirmed match tickets, proof of accommodation, return flight booking, and sufficient funds for your stay.",
      },
      {
        heading: "Customs & Entry",
        body: "All visitors must complete customs declaration forms. Prohibited items include fresh produce, meat products, and certain medications. Declare all amounts over $10,000 USD in cash.",
      },
      {
        heading: "Emergency Contacts",
        body: "Emergency: 911. Non-emergency police: varies by city. US Customs & Border Protection: 1-877-227-5511.",
      },
    ],
  },
  Canada: {
    title: "Entering Canada",
    sections: [
      {
        heading: "Visa Requirements",
        body: "Citizens of many countries can enter Canada visa-free but require an Electronic Travel Authorization (eTA). Apply at canada.ca/eta before you travel. Citizens of countries requiring a visa must apply through the Canadian embassy.",
      },
      {
        heading: "Important Documents",
        body: "Valid passport, eTA confirmation, match tickets, proof of hotel booking, return flight, and travel insurance are recommended.",
      },
      {
        heading: "Customs & Entry",
        body: "Declare all food, plants, and amounts over CAD $10,000. Canada Border Services Agency (CBSA) officers conduct checks at entry points.",
      },
      {
        heading: "Emergency Contacts",
        body: "Emergency: 911. CBSA: 1-800-461-9999. Health services: dial 811 for non-emergency health advice.",
      },
    ],
  },
  Mexico: {
    title: "Entering Mexico",
    sections: [
      {
        heading: "Visa Requirements",
        body: "Citizens of many countries including the USA, Canada, EU, UK, and others can visit Mexico without a visa for up to 180 days. You'll receive a Forma Migratoria Múltiple (FMM) tourist card at immigration — keep it for your entire stay.",
      },
      {
        heading: "Important Documents",
        body: "Valid passport, FMM tourist card (don't lose it!), match tickets, proof of accommodation, and return travel documents.",
      },
      {
        heading: "Customs & Entry",
        body: "Declare amounts over $10,000 USD. Mexico has a traffic light customs system — green means pass, red means inspection. Prohibited items include fresh citrus, meat, and certain medications.",
      },
      {
        heading: "Emergency Contacts",
        body: "Emergency: 911. Tourist police: 078. SECTUR tourist assistance: 01800-006-8839.",
      },
    ],
  },
};

export default function LogisticsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, colorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState("Currency");
  const [usdAmount, setUsdAmount] = useState("100");
  const [activeVisa, setActiveVisa] = useState("USA");
  const [expandedSection, setExpandedSection] = useState(null);
  const [activePhraseCategory, setActivePhraseCategory] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_500Medium,
    InstrumentSans_400Regular,
  });

  const { data: phrasesData } = useQuery({
    queryKey: ["phrases", activePhraseCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activePhraseCategory) params.set("category", activePhraseCategory);
      const res = await apiFetch(`/api/phrases?${params}`);
      if (!res.ok) throw new Error("Failed to fetch phrases");
      return res.json();
    },
  });

  const convert = (amount, rate) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "—";
    return (num * rate).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: colors.cardBackground,
            borderWidth: 1, borderColor: colors.cardBorder,
            justifyContent: "center", alignItems: "center", marginRight: 12,
          }}
          activeOpacity={0.7}
        >
          <ArrowLeft size={18} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
          Logistics
        </Text>
      </View>

      {/* Tab Bar */}
      <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 12, gap: 8 }}>
        {TABS.map((tab) => {
          const Icon = tab === "Currency" ? DollarSign : tab === "Phrases" ? Languages : FileText;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1, paddingVertical: 8, borderRadius: 10,
                backgroundColor: activeTab === tab ? colors.accent : colors.cardBackground,
                borderWidth: 1, borderColor: activeTab === tab ? colors.accent : colors.cardBorder,
                alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 4,
              }}
            >
              <Icon size={14} color={activeTab === tab ? "white" : colors.textSecondary} />
              <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: activeTab === tab ? "white" : colors.textSecondary }}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Currency Tab */}
        {activeTab === "Currency" && (
          <View>
            <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginBottom: 20, lineHeight: 20 }}>
              Quick currency reference for the three host nations. Enter a USD amount to convert.
            </Text>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textSecondary, marginBottom: 8 }}>
                Amount in USD ($)
              </Text>
              <TextInput
                value={usdAmount}
                onChangeText={setUsdAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor={colors.placeholder}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
                  fontSize: 20, fontFamily: "Poppins_600SemiBold", color: colors.text,
                  borderWidth: 1, borderColor: colors.cardBorder,
                }}
              />
            </View>

            {[
              { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
              { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
              { code: "MXN", name: "Mexican Peso", symbol: "MX$", flag: "🇲🇽" },
            ].map((currency) => (
              <View
                key={currency.code}
                style={{
                  backgroundColor: colors.cardBackground, borderRadius: 14, padding: 16, marginBottom: 12,
                  borderWidth: 1, borderColor: colors.cardBorder, flexDirection: "row", alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 28, marginRight: 14 }}>{currency.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>
                    {currency.name}
                  </Text>
                  <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: colors.textMuted }}>
                    1 USD = {EXCHANGE_RATES[currency.code]} {currency.code}
                  </Text>
                </View>
                <Text style={{ fontSize: 20, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
                  {currency.symbol}{convert(usdAmount, EXCHANGE_RATES[currency.code])}
                </Text>
              </View>
            ))}

            <Text style={{ fontSize: 11, fontFamily: "InstrumentSans_400Regular", color: colors.textMuted, textAlign: "center", marginTop: 8 }}>
              Rates are approximate. Check your bank for exact rates.
            </Text>
          </View>
        )}

        {/* Phrases Tab */}
        {activeTab === "Phrases" && (
          <View>
            <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginBottom: 16, lineHeight: 20 }}>
              Essential phrases in English, Spanish (🇲🇽🇺🇸), and French (🇨🇦).
            </Text>

            {/* Category Pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => setActivePhraseCategory(null)}
                style={{
                  paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginRight: 8,
                  backgroundColor: !activePhraseCategory ? colors.accent : colors.cardBackground,
                  borderWidth: 1, borderColor: !activePhraseCategory ? colors.accent : colors.cardBorder,
                }}
              >
                <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: !activePhraseCategory ? "white" : colors.textSecondary }}>All</Text>
              </TouchableOpacity>
              {(phrasesData?.categories || []).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setActivePhraseCategory(cat)}
                  style={{
                    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginRight: 8,
                    backgroundColor: activePhraseCategory === cat ? colors.accent : colors.cardBackground,
                    borderWidth: 1, borderColor: activePhraseCategory === cat ? colors.accent : colors.cardBorder,
                  }}
                >
                  <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: activePhraseCategory === cat ? "white" : colors.textSecondary }}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {(phrasesData?.phrases || []).map((phrase) => (
              <View
                key={phrase.id}
                style={{
                  backgroundColor: colors.cardBackground, borderRadius: 12, padding: 14, marginBottom: 10,
                  borderWidth: 1, borderColor: colors.cardBorder,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 2, backgroundColor: colors.borderLight, borderRadius: 6, marginRight: 8 }}>
                    <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textMuted }}>{phrase.category}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 15, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 6 }}>
                  {phrase.english}
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginBottom: 2 }}>🇲🇽 Spanish</Text>
                    <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>{phrase.spanish}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontFamily: "Poppins_500Medium", color: colors.textMuted, marginBottom: 2 }}>🇨🇦 French</Text>
                    <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary }}>{phrase.french}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Visa Info Tab */}
        {activeTab === "Visa Info" && (
          <View>
            <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginBottom: 16, lineHeight: 20 }}>
              Entry requirements for each host country. Always verify with official government sources before travel.
            </Text>

            {/* Country Selector */}
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
              {Object.keys(VISA_INFO).map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => { setActiveVisa(c); setExpandedSection(null); }}
                  style={{
                    flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: "center",
                    backgroundColor: activeVisa === c ? colors.accent : colors.cardBackground,
                    borderWidth: 1, borderColor: activeVisa === c ? colors.accent : colors.cardBorder,
                  }}
                >
                  <Text style={{ fontSize: 13, fontFamily: "Poppins_500Medium", color: activeVisa === c ? "white" : colors.textSecondary }}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={{ fontSize: 18, fontFamily: "Poppins_600SemiBold", color: colors.text, marginBottom: 14 }}>
              {VISA_INFO[activeVisa].title}
            </Text>

            {VISA_INFO[activeVisa].sections.map((section, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setExpandedSection(expandedSection === i ? null : i)}
                style={{
                  backgroundColor: colors.cardBackground, borderRadius: 12, padding: 16, marginBottom: 10,
                  borderWidth: 1, borderColor: colors.cardBorder,
                }}
                activeOpacity={0.8}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ flex: 1, fontSize: 15, fontFamily: "Poppins_600SemiBold", color: colors.text }}>
                    {section.heading}
                  </Text>
                  {expandedSection === i ? (
                    <ChevronUp size={18} color={colors.textMuted} />
                  ) : (
                    <ChevronDown size={18} color={colors.textMuted} />
                  )}
                </View>
                {expandedSection === i && (
                  <Text style={{ fontSize: 14, fontFamily: "InstrumentSans_400Regular", color: colors.textSecondary, marginTop: 12, lineHeight: 22 }}>
                    {section.body}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
