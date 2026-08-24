export const content = {
  en: {
    hero: {
      saveTheDate: 'Join our fiesta',
      coupleNames: 'Izzy & Zé',
      location: 'ÉVORA · PORTUGAL',
      date: 'SEPTEMBER 5TH · 2026',
      ctaText: 'RSVP',
    },
    eventDetails: {
      title: 'Event Details',
      description: "Join us for a weekend celebration in the historic city of Évora, Portugal. We can't wait to welcome family and friends from around the world to experience Zé's hometown and share this special day with you.",
      dateLabel: 'Date',
      date: 'September 4th and 5th, 2026',
      locationLabel: 'Location',
      location: 'Évora, Portugal',
    },
    day1: {
      title: 'Day 1',
      subtitle: 'Friday, September 4th, 2026',
      location: "Celeiro D'Évora",
      events: [
        {
          time: '5:00 PM',
          name: 'Welcome Reception',
          description: 'Join us for drinks and light bites as we kick off the celebration. Meet fellow guests and explore the historic venue.',
        },
      ],
    },
    day2: {
      title: 'Day 2',
      subtitle: 'Saturday, September 5th, 2026',
      location: "Zé's family home, Évora",
      events: [
        {
          time: '5:00 PM',
          name: 'Cocktail Hour',
          description: 'Grab a cocktail and say hi to friends and family as we get ready to exchange vows.'
        },
        {
          time: '6:00 PM',
          name: 'Wedding Ceremony',
          description: 'Witness our short ceremony as we officially tie the knot.',
        },
        {
          time: '7:00 PM',
          name: 'Dinner & Fiesta',
          description: 'Sit for dinner and taste the local Alentejo flavors, followed by music, dancing, and celebration.',
        },
      ],
    },
    infoSections: [
      {
        title: 'Travel & Stay — Évora, Portugal',
        preview: 'Recommended stay: 2 nights (Friday and Saturday). Évora can be explored in a day or two and is best enjoyed as part of a longer trip through Portugal.',
        subsections: [
          {
            title: 'About Évora',
            content: 'Évora is a UNESCO World Heritage city in the heart of the Alentejo region, known for its Roman ruins, medieval streets, and excellent food and wine.',
          },
          {
            title: 'Getting To Évora',
            content: 'Évora is 1.5 hours from Lisbon by car, bus, or train. We recommend flying into Lisbon Airport (LIS) and either renting a car or taking the direct train.',
          },
          {
            title: 'Where to Stay',
            content: 'We recommend staying within the city walls for Friday and Saturday. Boutique hotels and guesthouses fill up quickly, so we encourage booking early.',
          },
          {
            title: 'What to Do',
            content: 'Visit the Roman Temple, Chapel of Bones, and Cathedral, wander the historic streets, and enjoy Alentejo cuisine and wines. The city is compact, walkable, and easy to experience in just a few hours.',
          },
        ],
        tip: {
          eyebrow: 'Travel Tips',
          title: 'Train and bus from Lisbon',
          content: 'There are two main stations for both: Oriente and Sete Rios. If you\'re going to Sete Rios by metro, the stop is called Jardim Zoológico. The train always leaves from Oriente and stops at Sete Rios. The bus leaves either from one or the other, or from the airport.',
          note: {
            title: 'Car Rental',
            content: 'This would be our third choice. We only recommend renting a car if you\'re planning to explore more of the country going beyond Lisbon, Évora and Porto. Only when visiting other places like Nazaré, Coimbra, all the Algarve beach towns or south of Spain does a car become the best option.',
          },
          arrival: {
            title: 'Arriving in Évora',
            content: 'If you\'re arriving at the train station or bus terminal, we recommend taking a taxi or an Uber (there usually aren\'t many Ubers available), as the stations are outside the city walls. Once inside the city walls, you can do everything on foot.',
          },
          groups: [
            {
              name: 'Train',
              badge: 'BEST',
              link: { href: 'https://www.cp.pt/en', label: 'Book via CP' },
              rows: [
                { label: 'Duration', value: '1h25' },
                { label: 'How often', value: '5x / day' },
              ],
            },
            {
              name: 'Bus',
              link: { href: 'https://rede-expressos.pt/en', label: 'Book via Rede Expressos' },
              rows: [
                { label: 'Duration', value: '1h35' },
                { label: 'How often', value: '20x / day' },
              ],
            },
          ],
        },
      },
      {
        title: 'Venue and Dresscode',
        preview: "Zé's childhood home in the heart of Évora — a place filled with family memories.",
        subsections: [
          {
            title: 'The Venue',
            content: "Our wedding will be held at Zé's childhood home, a place filled with family memories and where many of his favorite moments growing up took place. We're excited to welcome you to a setting we've spent countless memories together with both our families over the years.",
          },
        ],
        dresscode: {
          title: 'Dresscode',
          cards: [
            {
              title: 'Day 1: Cocktail Reception',
              content: 'Wear your favorite summer cocktail colorful dresses and shirts to celebrate with us in stylish comfort.',
              image: '__COCKTAIL__',
              imagePosition: 'left' as const,
            },
            {
              title: 'Day 2: Wedding Reception',
              content: 'Think suits, a great tie, and elegant dresses — a step up from the night before.',
              image: '__WEDDING__',
              imagePosition: 'right' as const,
            },
          ],
        },
      },
      {
        title: 'Explore Portugal — Our Recommendations',
        preview: 'From Lisbon and Porto to the Algarve and beyond — our favorite spots and must dos.',
        subsections: [
          {
            title: 'Near Lisbon — the closest airport to Évora (1.5h by car or train)',
            content: 'Visit the towns of Cascais and Sintra, and explore Lisbon\'s neighborhoods of Campo de Ourique, Mouraria, and Alfama. For beaches, we recommend driving south to any of the following: Costa da Caparica, Arrábida Natural Park, or Praia da Comporta.',
          },
          {
            title: 'Venture North — Porto (4h from Évora and 3h from Lisbon)',
            content: 'Visit the city of Porto, stroll along the Ribeira waterfront, and explore the famous wine cellars across the river in Vila Nova de Gaia. For wine lovers, spend a day in the stunning Douro Valley, one of the world\'s oldest wine regions. Nearby, we also recommend visiting the charming towns of Braga and Guimarães.',
          },
          {
            title: 'Venture South — Algarve Region (3h from Évora and Lisbon)',
            content: 'The Algarve is known for its golden cliffs, hidden coves, and some of Europe\'s best beaches. We recommend staying near Lagos, Tavira, or Albufeira depending on your preferred pace. Our favorites include Praia da Arrifana, the Sagres cape, and the long sandy stretches around Ilha de Tavira.',
          },
          {
            title: 'For the true adventurers',
            content: 'You can drive to Sevilla, Spain (3h from Évora), discover the southern coast of Spain — Marbella, Málaga… (4–5h from Évora) OR take a 1.5h flight to Morocco. We\'ve done all that!',
          },
        ],
      },
    ],
    formUrl: 'https://airtable.com/embed/app5BN54ZOQHHWwxj/pagDfEkcD13OzncWs/form',
  },
  pt: {
    hero: {
      saveTheDate: ' ',
      coupleNames: 'Izzy & Zé',
      location: 'ÉVORA · PORTUGAL',
      date: '5 DE SETEMBRO · 2026',
      ctaText: 'RSVP',
    },
    eventDetails: {
      title: 'Detalhes do Evento',
      description: 'Junte-se a nós para um fim-de-semana de celebração na cidade histórica de Évora, Portugal. Mal podemos esperar por receber família e amigos de todo o mundo e partilhar este dia especial.',
      dateLabel: 'Data',
      date: '4 e 5 de Setembro de 2026',
      locationLabel: 'Localização',
      location: 'Évora, Portugal',
    },
    day1: {
      title: 'Dia 1',
      subtitle: 'Sexta-feira, 4 de Setembro de 2026',
      location: "Celeiro D'Évora",
      events: [
        {
          time: '17:00',
          name: 'Receção de Boas-Vindas',
          description: 'Junte-se a nós para bebidas e petiscos enquanto iniciamos a celebração. Conheça outros convidados e explore o local histórico.',
        },
      ],
    },
    day2: {
      title: 'Dia 2',
      subtitle: 'Sábado, 5 de Setembro de 2026',
      location: 'Casa da familia do Zé, Évora',
      events: [
        {
          time: '17:00',
          name: 'Cocktails',
          description: 'Abra o apetite com cocktails e petiscos alentejanos enquanto nos preparamos para o grande momento.',
        },
        {
          time: '18:00',
          name: 'Cerimónia',
          description: 'Acompanhe a nossa breve cerimónia enquanto oficializamos o casamento perante amigos e família.',
        },
        {
          time: '19:00',
          name: 'Jantar e Fiesta',
          description: 'Sente-se para jantar e prove os sabores locais do Alentejo, seguido de música, dança e celebração.',
        },
      ],
    },
    infoSections: [
      {
        title: 'Viagem & Alojamento — Évora, Portugal',
        preview: 'Estadia recomendada: 2 noites (sexta e sábado). Évora pode ser explorada num dia ou dois e é melhor aproveitada como parte de uma viagem mais longa por Portugal.',
        subsections: [
          {
            title: 'Sobre Évora',
            content: 'Évora é uma cidade Património Mundial da UNESCO no coração da região do Alentejo, conhecida pelas suas ruínas romanas, ruas medievais e excelente gastronomia e vinhos.',
          },
          {
            title: 'Como Chegar',
            content: 'Évora fica a 1h30 de Lisboa de carro, autocarro ou comboio. Recomendamos voar para o Aeroporto de Lisboa (LIS) e alugar um carro ou apanhar o comboio direto.',
          },
          {
            title: 'Onde Ficar',
            content: 'Recomendamos ficar dentro das muralhas da cidade na sexta e no sábado. Os hotéis boutique e alojamentos locais esgotam rapidamente, por isso encorajamos a reservar com antecedência.',
          },
          {
            title: 'O Que Fazer',
            content: 'Visite o Templo Romano, a Capela dos Ossos, percorra as ruas históricas e coma bem e beba bem. A cidade é pequena, fácil de percorrer a pé e de explorar em poucas horas.',
          },
        ],
        tip: {
          eyebrow: 'Dicas de Viagem',
          title: 'Comboio e autocarro desde Lisboa',
          content: 'Há duas estações principais para ambos: Oriente e Sete Rios. Se forem para Sete Rios de metro, a paragem chama-se Jardim Zoológico. O comboio sai sempre do Oriente e passa por Sete Rios. O autocarro ou sai de um ou do outro, ou também desde o aeroporto.',
          note: {
            title: 'Aluguer de Carro',
            content: 'Seria a nossa terceira escolha. Só recomendamos alugar carro se planearem explorar mais do país, para além de Lisboa, Évora e Porto. Só quando visitarem outros lugares como a Nazaré, Coimbra, as praias do Algarve ou o sul de Espanha é que o carro se torna a melhor opção.',
          },
          arrival: {
            title: 'Chegar a Évora',
            content: 'Se chegarem à estação de comboios ou ao terminal de autocarros, recomendamos que apanhem um táxi ou um Uber (normalmente não há muitos Ubers disponíveis), pois as estações ficam fora das muralhas da cidade. Uma vez dentro das muralhas, podem fazer tudo a pé.',
          },
          groups: [
            {
              name: 'Comboio',
              badge: 'MELHOR',
              link: { href: 'https://www.cp.pt', label: 'Reservar na CP' },
              rows: [
                { label: 'Duração', value: '1h25' },
                { label: 'Frequência', value: '5x / dia' },
              ],
            },
            {
              name: 'Autocarro',
              link: { href: 'https://rede-expressos.pt', label: 'Reservar na Rede Expressos' },
              rows: [
                { label: 'Duração', value: '1h35' },
                { label: 'Frequência', value: '20x / dia' },
              ],
            },
          ],
        },
      },
      {
        title: 'Sobre o Local da Festa',
        preview: 'A casa onde cresceu o Zé no centro de Évora — um lugar cheio de memórias de família.',
        subsections: [
          {
            title: 'O Local da Festa',
            content: 'O nosso casamento realizará na casa onde o Zé cresceu, um lugar cheio de memórias de família. Mal podemos esperar por vos receber num espaço que nos é profundamente pessoal e significativo.',
          },
        ],
        dresscode: {
          title: 'Dresscode',
          cards: [
            {
              title: 'Dia 1: Cocktail de Boas-Vindas',
              content: 'Tragam os vossos vestidos e camisas coloridas de verão para celebrar connosco em estilo e com conforto.',
              image: '__COCKTAIL__',
              imagePosition: 'left' as const,
            },
            {
              title: 'Dia 2: Casamento',
              content: 'Pensem em fato e gravata, e vestidos elegantes — um nível acima da noite anterior.',
              image: '__WEDDING__',
              imagePosition: 'right' as const,
            },
          ],
        },
      },
      {
        title: 'Portugal além de Évora — O que Recomendamos',
        preview: 'De Lisboa e Porto aos Algarves e além — os nossos lugares favoritos por Portugal.',
        subsections: [
          {
            title: 'Perto de Lisboa — o aeroporto mais próximo de Évora (1h30 de carro ou comboio)',
            content: 'Visite as vilas de Cascais e Sintra, e explore os bairros de Campo de Ourique, Mouraria e Alfama em Lisboa. Para praias, recomendamos a Costa da Caparica, o Parque Natural da Arrábida ou a Praia da Comporta.',
          },
          {
            title: 'Rumo ao Norte — Porto (4h de Évora e 3h de Lisboa)',
            content: 'Visite a cidade do Porto, passeie pela Ribeira e explore as famosas caves de vinho em Vila Nova de Gaia. Para os amantes de vinho, passe um dia no deslumbrante Vale do Douro. Perto, recomendamos também as encantadoras cidades de Braga e Guimarães.',
          },
          {
            title: 'Rumo ao Sul — Algarve (3h de Évora e de Lisboa)',
            content: 'O Algarve é conhecido pelas suas praias com falésias, algumas das melhores da Europa. Recomendamos ficar perto de Lagos, Tavira ou Albufeira. Os nossos favoritos incluem a Praia da Arrifana, Sagres e as extensas praias da Ilha de Tavira.',
          },
          {
            title: 'Para os verdadeiros aventureiros',
            content: 'Pode conduzir até Sevilha (3h de Évora), descobrir a costa sul de Espanha — Marbella, Málaga… (4–5h de Évora) ou fazer um voo de 1h30 até Marrocos. Já fizemos tudo isso!',
          },
        ],
      },
    ],
    formUrl: 'https://airtable.com/embed/app5BN54ZOQHHWwxj/pagdYGXk73y6gUS4f/form',
  },
  mx: {
    hero: {
      saveTheDate: ' ',
      coupleNames: 'Izzy & Zé',
      location: 'ÉVORA · PORTUGAL',
      date: '5 DE SEPTIEMBRE · 2026',
      ctaText: 'RSVP',
    },
    eventDetails: {
      title: 'Detalles del Evento',
      description: 'Acompáñanos a celebrar un fin de semana en la histórica ciudad de Évora, Portugal. No podemos esperar para recibir a familia y amigos de todas partes del mundo y compartir este día tan especial.',
      dateLabel: 'Fecha',
      date: '4 y 5 de septiembre de 2026',
      locationLabel: 'Ubicación',
      location: 'Évora, Portugal',
    },
    day1: {
      title: 'Día 1',
      subtitle: 'Viernes, 4 de septiembre de 2026',
      location: "Celeiro D'Évora",
      events: [
        {
          time: '17:00',
          name: 'Recepción de Bienvenida',
          description: 'Acompáñanos para tomar unos drinks y botanas mientras arrancamos la celebración. Conoce a otros invitados y explora este increíble lugar histórico.',
        },
      ],
    },
    day2: {
      title: 'Día 2',
      subtitle: 'Sábado, 5 de septiembre de 2026',
      location: 'Casa de la familia de Zé, Évora',
      events: [
        {
          time: '17:00',
          name: 'Cocktails',
          description: 'Comienza la tarde con cocktails y botanas alentejanas mientras nos preparamos para el gran momento.',
        },
        {
          time: '18:00',
          name: 'Ceremonia',
          description: 'Sé testigo de nuestra breve ceremonia mientras hacemos oficial el matrimonio frente a familia y amigos.',
        },
        {
          time: '19:00',
          name: 'Cena y Fiesta',
          description: 'Siéntate a disfrutar de una cena con sabores locales del Alentejo, seguida de música, baile y celebración.',
        },
      ],
    },
    infoSections: [
      {
        title: 'Viaje y Hospedaje — Évora, Portugal',
        preview: 'Duración recomendada: 2 noches (viernes y sábado). Évora puede explorarse en uno o dos días y se disfruta mejor como parte de un viaje más largo por Portugal.',
        subsections: [
          {
            title: 'Sobre Évora',
            content: 'Évora es una ciudad Patrimonio Mundial de la UNESCO en el centro de Alentejo, conocida por sus ruinas romanas, calles medievales y su excelente gastronomía y vinos.',
          },
          {
            title: 'Cómo Llegar',
            content: 'Évora está a una hora y media de Lisboa manejando, en autobús o en tren. Recomendamos volar al Aeropuerto de Lisboa (LIS) y rentar un auto (si viajas por el país) o tomar el tren directo.',
          },
          {
            title: 'Dónde Hospedarse',
            content: 'Recomendamos hospedarse dentro de las murallas de la ciudad el viernes y sábado. Los hoteles boutique y Airbnbs se llenan rápido, por lo que te animamos a reservar con anticipación.',
          },
          {
            title: 'Qué Hacer',
            content: 'Visita el Templo Romano, la Capilla de los Huesos, recorre las calles históricas y disfruta de la gastronomía y vinos del Alentejo. La ciudad es compacta, perfecta para caminar y fácil de recorrer en pocas horas.',
          },
        ],
        tip: {
          eyebrow: 'Tips de Viaje',
          title: 'Tren y autobús desde Lisboa',
          content: 'Hay dos estaciones principales para ambos: Oriente y Sete Rios. Si van a Sete Rios en metro, la parada se llama Jardim Zoológico.El tren siempre sale de Oriente y pasa por Siete Rios. El autobus sale desde una u otra, o inclusivé desde el aeropuerto',
          note: {
            title: 'Renta de Auto',
            content: 'Esta sería nuestra tercera opción. Solo recomendamos rentar un carro si planean explorar más del país, más allá de Lisboa, Évora y Oporto. Solo al visitar otros lugares como Nazaré, Coimbra, las playas del Algarve o el sur de España el carro se vuelve la mejor opción.',
          },
          arrival: {
            title: 'Llegar a Évora',
            content: 'Si llegan a la estación de tren o a la terminal de autobuses, les recomendamos tomar un taxi o un Uber (normalmente no hay muchos Ubers disponibles), ya que las estaciones están fuera de las murallas de la ciudad. Una vez dentro de las murallas, pueden hacer todo caminando.',
          },
          groups: [
            {
              name: 'Tren',
              badge: 'MEJOR',
              link: { href: 'https://www.cp.pt/en', label: 'Reservar en CP' },
              rows: [
                { label: 'Duración', value: '1h25' },
                { label: 'Frecuencia', value: '5x / día' },
              ],
            },
            {
              name: 'Autobús',
              link: { href: 'https://rede-expressos.pt/en', label: 'Reservar en Rede Expressos' },
              rows: [
                { label: 'Duración', value: '1h35' },
                { label: 'Frecuencia', value: '20x / día' },
              ],
            },
          ],
        },
      },
      {
        title: 'Sobre el Lugar',
        preview: 'La casa de la infancia de Zé en el corazón de Évora — un lugar lleno de recuerdos familiares.',
        subsections: [
          {
            title: 'El Lugar de La Fiesta',
            content: 'Nuestra boda se celebrará en la casa en donde creció Zé, un lugar lleno de recuerdos familiares. Nos emociona recibirlos en un espacio que tanto disfrutamos y que significa mucho para nosotros.',
          },
        ],
        dresscode: {
          title: 'Dresscode',
          cards: [
            {
              title: 'Día 1: Recepción con Cocktails',
              content: 'Usa tus vestidos y camisas coloridas de verano para celebrar con nosotros con estilo y comodidad.',
              image: '__COCKTAIL__',
              imagePosition: 'left' as const,
            },
            {
              title: 'Día 2: Recepción de Boda',
              content: 'Piensa en traje y corbata, y vestidos elegantes — un paso más arriba que la noche anterior.',
              image: '__WEDDING__',
              imagePosition: 'right' as const,
            },
          ],
        },
      },
      {
        title: 'Explora Portugal más allá de Évora — Nuestras Recomendaciones',
        preview: 'De Lisboa y Porto al Algarve y más allá — nuestros lugares favoritos en Portugal.',
        subsections: [
          {
            title: 'Cerca de Lisboa — el aeropuerto más cercano a Évora (1.5h en carro o tren)',
            content: 'Visita los pueblos de Cascais y Sintra, y explora los barrios de Campo de Ourique, Mouraria y Alfama en Lisboa. Para playas, recomendamos manejar al sur: Costa da Caparica, el Parque Natural de Arrábida o Praia da Comporta.',
          },
          {
            title: 'Rumbo al Norte — Porto (4h de Évora y 3h de Lisboa)',
            content: 'Visita la ciudad de Porto, pasea por el malecón de la Ribeira y explora las famosas bodegas de vino en Vila Nova de Gaia. Para los amantes del vino, pasa un día en el impresionante Valle del Duero. Cerca, también recomendamos los encantadores pueblos de Braga y Guimarães.',
          },
          {
            title: 'Rumbo al Sur — Región del Algarve (3h de Évora y Lisboa)',
            content: 'El Algarve es conocido por sus acantilados dorados, calas escondidas y algunas de las mejores playas de Europa. Recomendamos hospedarse cerca de Lagos, Tavira o Albufeira. Nuestras favoritas incluyen Praia da Arrifana, el Cabo de Sagres y las largas playas de Ilha de Tavira.',
          },
          {
            title: 'Para los verdaderos aventureros',
            content: 'Puedes manejar a Sevilla, España (3h de Évora), descubrir la costa sur de España — Marbella, Málaga… (4–5h de Évora) o tomar un vuelo de 1.5h a Marruecos. ¡Hemos hecho todo eso!',
          },
        ],
      },
    ],
    formUrl: 'https://airtable.com/embed/app5BN54ZOQHHWwxj/pagxz6LH6mvTX7cKm/form',
  },
};
