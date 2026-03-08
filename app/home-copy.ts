import { localizedText } from "@/lib/i18n";

export const homeCopy = {
  title: localizedText("PsyMatch"),
  subtitle: localizedText(
    "Já imaginou como seriam os principais psicólogos em um app de namoro? Aqui você vai descobrir!",
    {
      en: "Have you ever imagined what the major psychologists would look like in a dating app? Here you will find out.",
    },
  ),
  nameLabel: localizedText("Digite seu nome", {
    en: "Enter your name",
  }),
  namePlaceholder: localizedText("Ex.: Lara", {
    en: "Ex.: Lara",
  }),
  nameAria: localizedText("Seu nome", {
    en: "Your name",
  }),
  continueButton: localizedText("Continuar", {
    en: "Continue",
  }),
} as const;
