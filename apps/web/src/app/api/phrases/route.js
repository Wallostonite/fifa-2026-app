const PHRASES = [
  { id: "1", category: "Greetings", english: "Hello", spanish: "Hola", french: "Bonjour" },
  { id: "2", category: "Greetings", english: "Good morning", spanish: "Buenos días", french: "Bonjour" },
  { id: "3", category: "Greetings", english: "Good evening", spanish: "Buenas noches", french: "Bonsoir" },
  { id: "4", category: "Greetings", english: "How are you?", spanish: "¿Cómo estás?", french: "Comment allez-vous?" },
  { id: "5", category: "Greetings", english: "Thank you", spanish: "Gracias", french: "Merci" },
  { id: "6", category: "Greetings", english: "You're welcome", spanish: "De nada", french: "De rien" },
  { id: "7", category: "Greetings", english: "Goodbye", spanish: "Adiós", french: "Au revoir" },
  { id: "8", category: "Directions", english: "Where is the stadium?", spanish: "¿Dónde está el estadio?", french: "Où est le stade?" },
  { id: "9", category: "Directions", english: "How do I get to...?", spanish: "¿Cómo llego a...?", french: "Comment aller à...?" },
  { id: "10", category: "Directions", english: "Turn left", spanish: "Gire a la izquierda", french: "Tournez à gauche" },
  { id: "11", category: "Directions", english: "Turn right", spanish: "Gire a la derecha", french: "Tournez à droite" },
  { id: "12", category: "Directions", english: "Straight ahead", spanish: "Todo recto", french: "Tout droit" },
  { id: "13", category: "Directions", english: "Where is the nearest metro?", spanish: "¿Dónde está el metro más cercano?", french: "Où est le métro le plus proche?" },
  { id: "14", category: "Food & Drink", english: "A beer, please", spanish: "Una cerveza, por favor", french: "Une bière, s'il vous plaît" },
  { id: "15", category: "Food & Drink", english: "Water, please", spanish: "Agua, por favor", french: "De l'eau, s'il vous plaît" },
  { id: "16", category: "Food & Drink", english: "The menu, please", spanish: "El menú, por favor", french: "Le menu, s'il vous plaît" },
  { id: "17", category: "Food & Drink", english: "How much is this?", spanish: "¿Cuánto cuesta esto?", french: "Combien ça coûte?" },
  { id: "18", category: "Food & Drink", english: "The bill, please", spanish: "La cuenta, por favor", french: "L'addition, s'il vous plaît" },
  { id: "19", category: "Food & Drink", english: "It was delicious!", spanish: "¡Estaba delicioso!", french: "C'était délicieux!" },
  { id: "20", category: "Football", english: "What a goal!", spanish: "¡Qué golazo!", french: "Quel but!" },
  { id: "21", category: "Football", english: "Come on!", spanish: "¡Ándale! / ¡Vamos!", french: "Allez!" },
  { id: "22", category: "Football", english: "Foul!", spanish: "¡Falta!", french: "Faute!" },
  { id: "23", category: "Football", english: "Offside!", spanish: "¡Fuera de juego!", french: "Hors-jeu!" },
  { id: "24", category: "Football", english: "Where are the tickets?", spanish: "¿Dónde están las entradas?", french: "Où sont les billets?" },
  { id: "25", category: "Football", english: "Which section am I in?", spanish: "¿En qué sección estoy?", french: "Dans quelle section suis-je?" },
  { id: "26", category: "Emergency", english: "Help!", spanish: "¡Ayuda!", french: "Au secours!" },
  { id: "27", category: "Emergency", english: "Call the police", spanish: "Llame a la policía", french: "Appelez la police" },
  { id: "28", category: "Emergency", english: "I need a doctor", spanish: "Necesito un médico", french: "J'ai besoin d'un médecin" },
  { id: "29", category: "Emergency", english: "I lost my passport", spanish: "Perdí mi pasaporte", french: "J'ai perdu mon passeport" },
  { id: "30", category: "Emergency", english: "Where is the hospital?", spanish: "¿Dónde está el hospital?", french: "Où est l'hôpital?" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const phrases = category
    ? PHRASES.filter((p) => p.category === category)
    : PHRASES;

  const categories = [...new Set(PHRASES.map((p) => p.category))];

  return Response.json({ phrases, categories });
}
