// ---------------------------------------------------------------------------
// Payment credentials — PLACEHOLDERS. Update these when real details are ready.
// ---------------------------------------------------------------------------
export const paymentConfig = {
  venmo: {
    username: '@izze-life',
    url: 'https://venmo.com/u/izze-life',
  },
  mbway: {
    phone: '+351 912 345 678',
  },
  revolut: {
    revtag: '@izzelife',
    url: 'https://revolut.me/izzelife',
  },
  bankUS: {
    accountHolder: 'Izzy & Zé',
    routingNumber: '123456789',
    accountNumber: '000123456789',
    accountType: 'Checking',
  },
  bankPT: {
    accountHolder: 'Izzy & Zé',
    iban: 'PT50 0035 1234 0000 9876 5432 1',
    bicSwift: 'CGDIPTPL',
    bankName: 'Caixa Geral de Depósitos',
  },
  bankIntl: {
    accountHolder: 'Izzy & Zé',
    iban: 'PT50 0035 1234 0000 9876 5432 1',
    swift: 'CGDIPTPL',
    bankName: 'Caixa Geral de Depósitos',
    bankAddress: 'Av. João XXI 63, 1000-300 Lisboa, Portugal',
  },
};

// ---------------------------------------------------------------------------
// Registry copy — per language
// ---------------------------------------------------------------------------
export interface GiftOption {
  id: 'seattle' | 'portugal' | 'mexico' | 'newyork';
  emoji: string;
  title: string;
  tagline: string;
}

export interface RegistryStrings {
  tabItinerary: string;
  tabDressCode: string;
  tabGifts: string;
  comingSoon: string;

  breadcrumbRegistry: string;
  breadcrumbGift: string;
  breadcrumbAmount: string;
  breadcrumbPayment: string;
  breadcrumbBankTransfer: string;

  homeTitle: string;
  homeSubtitle: string;
  bookEyebrow: string;
  bookTitle: string;
  bookCopy1: string;
  bookCopy2: string;
  presenceTitle: string;
  presenceCopy1: string;
  presenceCopy2: string;
  giftCta: string;
  dividerAnd: string;
  dividerOr: string;

  giftTitle: string;
  giftSubtitle: string;
  giftOptions: GiftOption[];

  amountLeadIn: string;
  amountLabel: string;
  amountHint: string;
  continueCta: string;

  paymentTitle: string;
  paymentSubtitle: string;
  venmoTag: string;
  mbwayTag: string;
  revolutTag: string;
  bankTag: string;

  bankWhereTitle: string;
  bankWhereSubtitle: string;
  bankUSLabel: string;
  bankUSTag: string;
  bankPTLabel: string;
  bankPTTag: string;
  bankIntlLabel: string;
  bankIntlTag: string;

  venmoTitle: string;
  mbwayTitle: string;
  mbwayInstructions: string;
  revolutTitle: string;
  bankUSTitle: string;
  bankPTTitle: string;
  bankIntlTitle: string;
  detailThanks: string;

  openVenmo: string;
  openRevolut: string;
  copyUsername: string;
  copyNumber: string;
  copyLabel: string;
  copied: string;

  fieldAccountHolder: string;
  fieldRoutingNumber: string;
  fieldAccountNumber: string;
  fieldAccountType: string;
  fieldIban: string;
  fieldBicSwift: string;
  fieldBankName: string;
  fieldBankAddress: string;
  fieldPhoneNumber: string;

  thankYouTitle: string;
  thankYouCopy: string;
  backToRegistry: string;
  back: string;
}

const en: RegistryStrings = {
  tabItinerary: 'Itinerary',
  tabDressCode: 'Dress Code',
  tabGifts: 'Gifts',
  comingSoon: 'Coming soon.',

  breadcrumbRegistry: 'Registry',
  breadcrumbGift: 'Gift',
  breadcrumbAmount: 'Amount',
  breadcrumbPayment: 'Payment',
  breadcrumbBankTransfer: 'Bank Transfer',

  homeTitle: 'Our Registry',
  homeSubtitle: 'We have one small favor before anything else.',
  bookEyebrow: 'First things first',
  bookTitle: 'Bring us a book',
  bookCopy1:
    'Bring a book for Izzy, Zé or both. Something you love or you think belongs on our shelf.',
  bookCopy2: "One day, they'll become our home library — with a little piece of all of you in it.",
  presenceTitle: 'Your presence really is the gift.',
  presenceCopy1:
    "Every registry says it. But some of you are crossing an ocean to get to Évora — so this time we actually mean it.",
  presenceCopy2: "If you'd still like to give something more, we'd be incredibly grateful.",
  giftCta: "I'd also like to give a gift",
  dividerAnd: 'and',
  dividerOr: 'or',

  giftTitle: 'Help us decide our next step',
  giftSubtitle: "We truly don't know what our next step is. Help us pick! Choose where you'd want us to move next and donate to that cause :)",
  giftOptions: [
    { id: 'seattle', emoji: '🌲', title: 'Plant roots in Seattle', tagline: 'Convince us to stay.' },
    { id: 'portugal', emoji: '🇵🇹', title: 'Move back to Portugal', tagline: 'Send us back to the Alentejo.' },
    { id: 'mexico', emoji: '🇲🇽', title: 'Move back to Mexico', tagline: 'Bring us back to where it all started.' },
    { id: 'newyork', emoji: '🗽', title: 'Move back to New York', tagline: 'Give New York another shot.' },
  ],

  amountLeadIn: "You're chipping in toward",
  amountLabel: 'Enter your contribution',
  amountHint: 'Enter any amount in EUR',
  continueCta: 'Continue',

  paymentTitle: 'How would you like to send your gift?',
  paymentSubtitle: 'Choose whichever is easiest for you.',
  venmoTag: 'Best for US guests',
  mbwayTag: 'Best for Portugal',
  revolutTag: 'For Revolut users',
  bankTag: 'USA · Portugal · International',

  bankWhereTitle: 'Where are you transferring from?',
  bankWhereSubtitle: "We'll show you the right bank details.",
  bankUSLabel: 'USA',
  bankUSTag: 'US bank details',
  bankPTLabel: 'Portugal',
  bankPTTag: 'Portuguese bank details',
  bankIntlLabel: 'International',
  bankIntlTag: 'International transfer details',

  venmoTitle: 'Send with Venmo',
  mbwayTitle: 'Send with MB WAY',
  mbwayInstructions: 'Open the MB WAY app and send your gift to this number.',
  revolutTitle: 'Send with Revolut',
  bankUSTitle: 'US Bank Details',
  bankPTTitle: 'Portuguese Bank Details',
  bankIntlTitle: 'International Bank Details',
  detailThanks: 'Thank you!',

  openVenmo: 'Open Venmo',
  openRevolut: 'Open Revolut',
  copyUsername: 'Copy username',
  copyNumber: 'Copy number',
  copyLabel: 'Copy',
  copied: 'Copied',

  fieldAccountHolder: 'Account holder',
  fieldRoutingNumber: 'Routing number',
  fieldAccountNumber: 'Account number',
  fieldAccountType: 'Account type',
  fieldIban: 'IBAN',
  fieldBicSwift: 'BIC / SWIFT',
  fieldBankName: 'Bank name',
  fieldBankAddress: 'Bank address',
  fieldPhoneNumber: 'Phone number',

  thankYouTitle: 'Thank you ♡',
  thankYouCopy: "We can't wait to celebrate with you in Évora.",
  backToRegistry: '← Back to Registry',
  back: '← Back',
};

const pt: RegistryStrings = {
  tabItinerary: 'Programa',
  tabDressCode: 'Dress Code',
  tabGifts: 'Presentes',
  comingSoon: 'Brevemente.',

  breadcrumbRegistry: 'Presentes',
  breadcrumbGift: 'Presente',
  breadcrumbAmount: 'Valor',
  breadcrumbPayment: 'Pagamento',
  breadcrumbBankTransfer: 'Transferência',

  homeTitle: 'A Nossa Lista',
  homeSubtitle: 'Temos um pequeno pedido antes de tudo o resto.',
  bookEyebrow: 'Primeiro que tudo',
  bookTitle: 'Tragam-nos um livro',
  bookCopy1:
    'Tragam um livro para a Izzy ou para o Zé — algo que adoram, ou algo que acham que pertence à nossa estante.',
  bookCopy2: 'Um dia, serão a nossa biblioteca — com um bocadinho de todos vocês.',
  presenceTitle: 'A vossa presença é mesmo o presente.',
  presenceCopy1:
    'Todas as listas dizem isto. Mas alguns de vocês vão atravessar um oceano até Évora — desta vez é mesmo a sério.',
  presenceCopy2: 'Se mesmo assim quiserem dar algo mais, ficaríamos imensamente gratos.',
  giftCta: 'Também quero dar um presente',
  dividerAnd: 'e',
  dividerOr: 'ou',

  giftTitle: 'Ajudem-nos a decidir o próximo passo',
  giftSubtitle: 'Escolham o capítulo da nossa vida que gostavam de ajudar a moldar.',
  giftOptions: [
    { id: 'seattle', emoji: '🌲', title: 'Criar raízes em Seattle', tagline: 'Convençam-nos a ficar.' },
    { id: 'portugal', emoji: '🇵🇹', title: 'Voltar para Portugal', tagline: 'Mandem-nos de volta para o Alentejo.' },
    { id: 'mexico', emoji: '🇲🇽', title: 'Voltar para o México', tagline: 'Levem-nos de volta ao lugar onde tudo começou.' },
    { id: 'newyork', emoji: '🗽', title: 'Voltar para Nova Iorque', tagline: 'Deem outra oportunidade a Nova Iorque.' },
  ],

  amountLeadIn: 'Estão a contribuir para',
  amountLabel: 'Insiram a vossa contribuição',
  amountHint: 'Qualquer valor em EUR',
  continueCta: 'Continuar',

  paymentTitle: 'Como preferem enviar o presente?',
  paymentSubtitle: 'Escolham o que for mais fácil para vocês.',
  venmoTag: 'Ideal para convidados dos EUA',
  mbwayTag: 'Ideal para Portugal',
  revolutTag: 'Para utilizadores Revolut',
  bankTag: 'EUA · Portugal · Internacional',

  bankWhereTitle: 'De onde vão transferir?',
  bankWhereSubtitle: 'Mostramos-vos os dados bancários certos.',
  bankUSLabel: 'EUA',
  bankUSTag: 'Dados bancários dos EUA',
  bankPTLabel: 'Portugal',
  bankPTTag: 'Dados bancários portugueses',
  bankIntlLabel: 'Internacional',
  bankIntlTag: 'Dados para transferência internacional',

  venmoTitle: 'Enviar com Venmo',
  mbwayTitle: 'Enviar com MB WAY',
  mbwayInstructions: 'Abram a app MB WAY e enviem o presente para este número.',
  revolutTitle: 'Enviar com Revolut',
  bankUSTitle: 'Dados Bancários — EUA',
  bankPTTitle: 'Dados Bancários Portugueses',
  bankIntlTitle: 'Dados Bancários Internacionais',
  detailThanks: 'Obrigado!',

  openVenmo: 'Abrir Venmo',
  openRevolut: 'Abrir Revolut',
  copyUsername: 'Copiar utilizador',
  copyNumber: 'Copiar número',
  copyLabel: 'Copiar',
  copied: 'Copiado',

  fieldAccountHolder: 'Titular da conta',
  fieldRoutingNumber: 'Routing number',
  fieldAccountNumber: 'Número de conta',
  fieldAccountType: 'Tipo de conta',
  fieldIban: 'IBAN',
  fieldBicSwift: 'BIC / SWIFT',
  fieldBankName: 'Banco',
  fieldBankAddress: 'Morada do banco',
  fieldPhoneNumber: 'Número de telemóvel',

  thankYouTitle: 'Obrigado ♡',
  thankYouCopy: 'Mal podemos esperar para celebrar convosco em Évora.',
  backToRegistry: '← Voltar aos Presentes',
  back: '← Voltar',
};

const mx: RegistryStrings = {
  tabItinerary: 'Itinerario',
  tabDressCode: 'Código de Vestimenta',
  tabGifts: 'Regalos',
  comingSoon: 'Próximamente.',

  breadcrumbRegistry: 'Regalos',
  breadcrumbGift: 'Regalo',
  breadcrumbAmount: 'Monto',
  breadcrumbPayment: 'Pago',
  breadcrumbBankTransfer: 'Transferencia',

  homeTitle: 'Nuestra Mesa de Regalos',
  homeSubtitle: 'Tenemos un pequeño favor antes que nada.',
  bookEyebrow: 'Lo primero es lo primero',
  bookTitle: 'Tráigannos un libro',
  bookCopy1:
    'Traigan un libro para Izzy o para Zé — algo que amen, o algo que crean que pertenece a nuestro librero.',
  bookCopy2: 'Un día serán nuestra biblioteca — con un pedacito de todos ustedes.',
  presenceTitle: 'Su presencia realmente es el regalo.',
  presenceCopy1:
    'Eso dicen todas las mesas de regalos. Pero algunos de ustedes van a cruzar un océano hasta Évora — así que esta vez lo decimos en serio.',
  presenceCopy2: 'Si aun así quieren dar algo más, estaríamos increíblemente agradecidos.',
  giftCta: 'También quiero dar un regalo',
  dividerAnd: 'y',
  dividerOr: 'o',

  giftTitle: 'Ayúdennos a decidir nuestro siguiente paso',
  giftSubtitle: 'Elijan el capítulo de nuestra vida que les gustaría ayudar a moldear.',
  giftOptions: [
    { id: 'seattle', emoji: '🌲', title: 'Echar raíces en Seattle', tagline: 'Convénzannos de quedarnos.' },
    { id: 'portugal', emoji: '🇵🇹', title: 'Volver a Portugal', tagline: 'Mándennos de regreso al Alentejo.' },
    { id: 'mexico', emoji: '🇲🇽', title: 'Volver a México', tagline: 'Llévennos de regreso a donde todo empezó.' },
    { id: 'newyork', emoji: '🗽', title: 'Volver a Nueva York', tagline: 'Denle otra oportunidad a Nueva York.' },
  ],

  amountLeadIn: 'Están contribuyendo para',
  amountLabel: 'Ingresen su contribución',
  amountHint: 'Cualquier monto en EUR',
  continueCta: 'Continuar',

  paymentTitle: '¿Cómo prefieren enviar su regalo?',
  paymentSubtitle: 'Elijan lo que les resulte más fácil.',
  venmoTag: 'Ideal para invitados de EE. UU.',
  mbwayTag: 'Ideal para Portugal',
  revolutTag: 'Para usuarios de Revolut',
  bankTag: 'EE. UU. · Portugal · Internacional',

  bankWhereTitle: '¿Desde dónde van a transferir?',
  bankWhereSubtitle: 'Les mostraremos los datos bancarios correctos.',
  bankUSLabel: 'EE. UU.',
  bankUSTag: 'Datos bancarios de EE. UU.',
  bankPTLabel: 'Portugal',
  bankPTTag: 'Datos bancarios portugueses',
  bankIntlLabel: 'Internacional',
  bankIntlTag: 'Datos para transferencia internacional',

  venmoTitle: 'Enviar con Venmo',
  mbwayTitle: 'Enviar con MB WAY',
  mbwayInstructions: 'Abran la app MB WAY y envíen su regalo a este número.',
  revolutTitle: 'Enviar con Revolut',
  bankUSTitle: 'Datos Bancarios — EE. UU.',
  bankPTTitle: 'Datos Bancarios Portugueses',
  bankIntlTitle: 'Datos Bancarios Internacionales',
  detailThanks: '¡Gracias!',

  openVenmo: 'Abrir Venmo',
  openRevolut: 'Abrir Revolut',
  copyUsername: 'Copiar usuario',
  copyNumber: 'Copiar número',
  copyLabel: 'Copiar',
  copied: 'Copiado',

  fieldAccountHolder: 'Titular de la cuenta',
  fieldRoutingNumber: 'Routing number',
  fieldAccountNumber: 'Número de cuenta',
  fieldAccountType: 'Tipo de cuenta',
  fieldIban: 'IBAN',
  fieldBicSwift: 'BIC / SWIFT',
  fieldBankName: 'Banco',
  fieldBankAddress: 'Dirección del banco',
  fieldPhoneNumber: 'Número de teléfono',

  thankYouTitle: 'Gracias ♡',
  thankYouCopy: 'No podemos esperar para celebrar con ustedes en Évora.',
  backToRegistry: '← Volver a Regalos',
  back: '← Volver',
};

export const registryContent: Record<string, RegistryStrings> = { en, pt, mx };
