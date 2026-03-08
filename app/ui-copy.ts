import { localizedText } from "@/lib/i18n";

export const uiCopy = {
  matchesReview: localizedText("Revisar match", { en: "Review match" }),
  fullProfile: localizedText("Perfil completo", { en: "Full profile" }),
  back: localizedText("Voltar", { en: "Back" }),
  matchesTitle: localizedText("Matches de", { en: "Matches for" }),
  strictStudentFallback: localizedText("quem estuda com critério", {
    en: "who studies with standards",
  }),
  messagesButton: localizedText("Mensagens", { en: "Messages" }),
  discoverButton: localizedText("Descobrir", { en: "Discover" }),
  matchesButton: localizedText("Matches", { en: "Matches" }),
  noMatchesTitle: localizedText("Ainda sem matches", { en: "No matches yet" }),
  noMatchesBody: localizedText(
    "Quando você der like em algum perfil, ele aparece aqui e o chat abre na aba Mensagens.",
    {
      en: "When you like a profile, it appears here and the chat opens in the Messages tab.",
    },
  ),
  messagesTitle: localizedText("Mensagens", { en: "Messages" }),
  inboxOf: localizedText("Inbox de", { en: "Inbox for" }),
  youFallback: localizedText("voce", { en: "you" }),
  noConversationTitle: localizedText("Sem conversa por enquanto", {
    en: "No conversation yet",
  }),
  noConversationBody: localizedText(
    "Deu match? As conversas aparecem aqui com a primeira mensagem automatica.",
    {
      en: "Got a match? Conversations show up here with the first automatic message.",
    },
  ),
  youLabel: localizedText("Voce", { en: "You" }),
  noMessage: localizedText("Sem mensagem", { en: "No message" }),
  backToInbox: localizedText("Voltar para inbox", { en: "Back to inbox" }),
  conversationNotFound: localizedText("Conversa nao encontrada", {
    en: "Conversation not found",
  }),
  conversationNotFoundBody: localizedText("Esse chat ainda nao existe para este perfil.", {
    en: "This chat does not exist for this profile yet.",
  }),
  inbox: localizedText("Inbox", { en: "Inbox" }),
  conversation: localizedText("Conversa", { en: "Conversation" }),
  offlineNotice: localizedText(
    "não está online no momento (por que será?), quando estiver online iremos te notificar.",
    {
      en: "is not online right now (wonder why); when they are back online we will notify you.",
    },
  ),
  replyTo: localizedText("Responder para", { en: "Reply to" }),
  send: localizedText("Enviar", { en: "Send" }),
  itsAMatch: localizedText("Deu Match", { en: "It is a Match" }),
  youMatched: localizedText("Vocês deram match.", { en: "It is a match between you two." }),
  chatUnlocked: localizedText(
    "O chat foi liberado e o perfil completo já está salvo nos seus matches.",
    {
      en: "The chat is unlocked and the full profile is already saved in your matches.",
    },
  ),
  viewProfile: localizedText("Ver perfil", { en: "View profile" }),
  continueExploring: localizedText("Continuar explorando", { en: "Keep exploring" }),
} as const;
