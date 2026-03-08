import { localizedText } from "@/lib/i18n";

export const discoverCopy = {
  greetingPrefix: localizedText("Olá", { en: "Hello" }),
  fallbackUserName: localizedText("estudante", { en: "student" }),
  appName: localizedText("PsyMatch", { en: "PsyMatch" }),
  messagesButton: localizedText("Mensagens", { en: "Messages" }),
  matchesButton: localizedText("Ver matches", { en: "See matches" }),
  eraInstruction: localizedText("Arraste para prosseguir.", {
    en: "Swipe to move through.",
  }),
  profileInstruction: localizedText(
    "Arraste no card para a direita/esquerda para decidir. Na foto, arraste para trocar.",
    {
      en: "Swipe the card left or right to decide. Drag the photo to switch.",
    },
  ),
  loadingTitle: localizedText("PsyMatch", { en: "PsyMatch" }),
  loadingLabel: localizedText("Carregando experiência", { en: "Loading experience" }),
  completionEyebrow: localizedText("Jornada concluída", { en: "Journey complete" }),
  completionTitle: localizedText("Não temos mais pessoas disponíveis na sua área.", {
    en: "We do not have any more people available in your area.",
  }),
  undoButton: localizedText("Desfazer", { en: "Undo" }),
  seeMatchesButton: localizedText("Ver matches", { en: "See matches" }),
  backHomeButton: localizedText("Voltar ao inicio", { en: "Back home" }),
  eraSummaryTitle: localizedText("Resumo da fase", { en: "Era summary" }),
  eraVibeTitle: localizedText("Piada interna", {
    en: "Inside joke",
  }),
  eraNextStepTitle: localizedText("Próximo passo", { en: "Next step" }),
  overlayContinue: localizedText("CONTINUAR", { en: "CONTINUE" }),
  overlayLike: localizedText("GOSTEI", { en: "LIKE" }),
  overlaySuper: localizedText("SUPER", { en: "SUPER" }),
  overlayPass: localizedText("PASSEI", { en: "PASS" }),
} as const;
