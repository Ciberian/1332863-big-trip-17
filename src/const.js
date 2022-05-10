export const offerType = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

export const offers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 190,
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 30,
      },
      {
        id: 3,
        title: 'Choose temperature',
        price: 170,
      },
      {
        id: 4,
        title: 'Drive quickly, I\'m in a hurry',
        price: 100,
      },
      {
        id: 5,
        title: 'Drive slowly',
        price: 110,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Infotainment system',
        price: 50,
      },
      {
        id: 2,
        title: 'Order meal',
        price: 100,
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 190,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Book a taxi at the arrival point',
        price: 110,
      },
      {
        id: 2,
        title: 'Order a breakfast',
        price: 80,
      },
      {
        id: 3,
        title: 'Wake up at a certain time',
        price: 140,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 120,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 90,
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 120,
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 120,
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 170,
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 160,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Choose the time of check-in',
        price: 70,
      },
      {
        id: 2,
        title: 'Choose the time of check-out',
        price: 190,
      },
      {
        id: 3,
        title: 'Add breakfast',
        price: 110,
      },
      {
        id: 4,
        title: 'Laundry',
        price: 140,
      },
      {
        id: 5,
        title: 'Order a meal from the restaurant',
        price: 30,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 130,
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 160,
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 170,
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 150,
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 100,
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 40,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'With automatic transmission',
        price: 110,
      },
      {
        id: 2,
        title: 'With air conditioning',
        price: 180,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose live music',
        price: 150,
      },
      {
        id: 2,
        title: 'Choose VIP area',
        price: 70,
      },
    ],
  },
];

export const destinations = [
  {
    name: 'Chamonix',
    description: 'Chamonix, is a beautiful city, a true asian pearl, in a middle of Europe, with a beautiful old town.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0003286738755539087',
        description: 'Chamonix central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5926081022467291',
        description: 'Chamonix embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.49464753791341654',
        description: 'Chamonix zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.38474039680550254',
        description: 'Chamonix zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6786095367492344',
        description: 'Chamonix street market',
      },
    ],
  },
  {
    name: 'Geneva',
    description:
			'Geneva, with a beautiful old town, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.8735064311191179',
        description: 'Geneva park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.002256591374185435',
        description: 'Geneva city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9766676551283322',
        description: 'Geneva central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.04553239351688898',
        description: 'Geneva parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5739866210135003',
        description: 'Geneva street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.14264305389007914',
        description: 'Geneva parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.77781408006049',
        description: 'Geneva street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9501697460383374',
        description: 'Geneva park',
      },
    ],
  },
  {
    name: 'Amsterdam',
    description: 'Amsterdam, is a beautiful city.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.2985443382819106',
        description: 'Amsterdam city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.426493083738372',
        description: 'Amsterdam biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.48934054440669184',
        description: 'Amsterdam parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7426900698379002',
        description: 'Amsterdam embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8492201808254931',
        description: 'Amsterdam zoo',
      },
    ],
  },
  {
    name: 'Helsinki',
    description: 'Helsinki, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.8607921813367116',
        description: 'Helsinki zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.24374159333507373',
        description: 'Helsinki parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7821862135849422',
        description: 'Helsinki street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.777487332433167',
        description: 'Helsinki street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.43015601674966875',
        description: 'Helsinki central station',
      },
    ],
  },
  {
    name: 'Oslo',
    description: 'Oslo, is a beautiful city, for those who value comfort and coziness.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.8592318765988769',
        description: 'Oslo street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3899639961669088',
        description: 'Oslo zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5037824104995712',
        description: 'Oslo biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8231424891220205',
        description: 'Oslo park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.18473583143090644',
        description: 'Oslo kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3303966991849394',
        description: 'Oslo parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.37274729464709067',
        description: 'Oslo zoo',
      },
    ],
  },
  {
    name: 'Kopenhagen',
    description:
			'Kopenhagen, with crowded streets, in a middle of Europe, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.9534176944246109',
        description: 'Kopenhagen zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6005024177364988',
        description: 'Kopenhagen parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.05141249079043386',
        description: 'Kopenhagen parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.4146504550706287',
        description: 'Kopenhagen biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.2050905571356758',
        description: 'Kopenhagen zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.16912539524482084',
        description: 'Kopenhagen biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5966251056391212',
        description: 'Kopenhagen parliament building',
      },
    ],
  },
  {
    name: 'Den Haag',
    description: 'Den Haag, with crowded streets.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7713899936059185',
        description: 'Den Haag city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6660940310161652',
        description: 'Den Haag zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6526078868792633',
        description: 'Den Haag zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.48650841981769344',
        description: 'Den Haag parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8144925646038819',
        description: 'Den Haag embankment',
      },
    ],
  },
  {
    name: 'Rotterdam',
    description: 'Rotterdam, is a beautiful city, a true asian pearl, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7094923323332478',
        description: 'Rotterdam kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7988194061156797',
        description: 'Rotterdam parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6305346379558365',
        description: 'Rotterdam zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5921821035349559',
        description: 'Rotterdam kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.15258338409349115',
        description: 'Rotterdam kindergarten',
      },
    ],
  },
  {
    name: 'Saint Petersburg',
    description:
			'Saint Petersburg, with crowded streets, in a middle of Europe, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.34392951219378776',
        description: 'Saint Petersburg city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0051442050957755114',
        description: 'Saint Petersburg parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.23414112758012728',
        description: 'Saint Petersburg embankment',
      },
    ],
  },
  {
    name: 'Moscow',
    description:
			'Moscow, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.8747632853409206',
        description: 'Moscow central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.09096972262964798',
        description: 'Moscow kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.06993956064252593',
        description: 'Moscow park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5841229934747147',
        description: 'Moscow street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.28580908904475133',
        description: 'Moscow zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8970635506006936',
        description: 'Moscow park',
      },
    ],
  },
  {
    name: 'Sochi',
    description: 'Sochi, a true asian pearl, in a middle of Europe, with a beautiful old town, middle-eastern paradise, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7480580472823224',
        description: 'Sochi parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.13270848592213147',
        description: 'Sochi kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8053549191916476',
        description: 'Sochi kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9171025575656102',
        description: 'Sochi park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.03960878365391096',
        description: 'Sochi zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.03855661572799507',
        description: 'Sochi park',
      },
    ],
  },
  {
    name: 'Tokio',
    description: 'Tokio, with crowded streets, in a middle of Europe.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.23325693668859793',
        description: 'Tokio parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9203689258740346',
        description: 'Tokio zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5778357055347179',
        description: 'Tokio kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3048786162483297',
        description: 'Tokio city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3706075366827781',
        description: 'Tokio kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3772829944748819',
        description: 'Tokio zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.37669980846808016',
        description: 'Tokio kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.11271481065637956',
        description: 'Tokio central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.44746288823873237',
        description: 'Tokio city centre',
      },
    ],
  },
  {
    name: 'Kioto',
    description:
			'Kioto, with crowded streets, in a middle of Europe, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.3365855359914989',
        description: 'Kioto park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.47107061369731995',
        description: 'Kioto street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.19123620111967932',
        description: 'Kioto park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.27401886381462304',
        description: 'Kioto street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8103351530179133',
        description: 'Kioto kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.37411757596616924',
        description: 'Kioto park',
      },
    ],
  },
  {
    name: 'Nagasaki',
    description: 'Nagasaki, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.8831892868008497',
        description: 'Nagasaki embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.2113940510261092',
        description: 'Nagasaki zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.2608488507382811',
        description: 'Nagasaki parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.08542849818055487',
        description: 'Nagasaki central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.2519087252178094',
        description: 'Nagasaki central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7836344530476045',
        description: 'Nagasaki zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7396992136300411',
        description: 'Nagasaki zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6750113857210893',
        description: 'Nagasaki kindergarten',
      },
    ],
  },
  {
    name: 'Hiroshima',
    description: 'Hiroshima, is a beautiful city, with crowded streets.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7562909098577757',
        description: 'Hiroshima parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.12466447884172438',
        description: 'Hiroshima parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5060920442048322',
        description: 'Hiroshima biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8675089532710936',
        description: 'Hiroshima city centre',
      },
    ],
  },
  {
    name: 'Berlin',
    description:
			'Berlin, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.25289103075200625',
        description: 'Berlin central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.41230578022493636',
        description: 'Berlin park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3897561714223641',
        description: 'Berlin embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.21017255447491756',
        description: 'Berlin street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.1842425946154389',
        description: 'Berlin street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3271544431594977',
        description: 'Berlin parliament building',
      },
    ],
  },
  {
    name: 'Munich',
    description: 'Munich, is a beautiful city, with crowded streets, for those who value comfort and coziness, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.07329441981374751',
        description: 'Munich zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5591437430249526',
        description: 'Munich biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.25756117865639117',
        description: 'Munich city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7483719517751792',
        description: 'Munich kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.12134769937987899',
        description: 'Munich zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.2827607145446065',
        description: 'Munich zoo',
      },
    ],
  },
  {
    name: 'Frankfurt',
    description: 'Frankfurt, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.1722052346359717',
        description: 'Frankfurt embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3514722850882934',
        description: 'Frankfurt embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5763485203613143',
        description: 'Frankfurt parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5747499785829122',
        description: 'Frankfurt city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.4206268785259972',
        description: 'Frankfurt central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.4701579645502323',
        description: 'Frankfurt street market',
      },
    ],
  },
  {
    name: 'Vien',
    description:
			'Vien, a true asian pearl, with crowded streets, in a middle of Europe, with a beautiful old town, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.15835808460013556',
        description: 'Vien street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6621111213294424',
        description: 'Vien park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5866690000373413',
        description: 'Vien city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7967706443731937',
        description: 'Vien embankment',
      },
    ],
  },
  {
    name: 'Rome',
    description:
			'Rome, with crowded streets, in a middle of Europe, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.08745877306776739',
        description: 'Rome biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7529773507855708',
        description: 'Rome central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.3754162516577806',
        description: 'Rome central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.03294664311729578',
        description: 'Rome parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6229174342446278',
        description: 'Rome zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7783963900139454',
        description: 'Rome park',
      },
    ],
  },
  {
    name: 'Naples',
    description: 'Naples, a true asian pearl, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.31025265405817914',
        description: 'Naples zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.588270468516912',
        description: 'Naples kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.026775841296281522',
        description: 'Naples city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5228483024020856',
        description: 'Naples biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9771216604517616',
        description: 'Naples zoo',
      },
    ],
  },
  {
    name: 'Venice',
    description: 'Venice, a true asian pearl, with a beautiful old town, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7911449386054912',
        description: 'Venice parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.19611007949300552',
        description: 'Venice street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9373462199677629',
        description: 'Venice kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.22347494695095715',
        description: 'Venice city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.73536647374929',
        description: 'Venice zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8255070041921062',
        description: 'Venice embankment',
      },
    ],
  },
  {
    name: 'Milan',
    description:
			'Milan, is a beautiful city, with crowded streets, middle-eastern paradise, for those who value comfort and coziness, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.9644390874001174',
        description: 'Milan embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6156186666223176',
        description: 'Milan street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.016061605203846918',
        description: 'Milan biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7371733047834286',
        description: 'Milan embankment',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.4482448596576587',
        description: 'Milan city centre',
      },
    ],
  },
  {
    name: 'Monaco',
    description: 'Monaco, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.7333091452715363',
        description: 'Monaco city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.03303972136442557',
        description: 'Monaco park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.9014299398788606',
        description: 'Monaco parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6761601878648238',
        description: 'Monaco central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.1298624078590802',
        description: 'Monaco embankment',
      },
    ],
  },
  {
    name: 'Paris',
    description:
			'Paris, in a middle of Europe, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.2818410810347167',
        description: 'Paris parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6260625723822157',
        description: 'Paris central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5423458075239125',
        description: 'Paris kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7839562500116561',
        description: 'Paris central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8919350977077116',
        description: 'Paris kindergarten',
      },
    ],
  },
  {
    name: 'Barcelona',
    description:
			'Barcelona, is a beautiful city, with a beautiful old town, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.28807786441103866',
        description: 'Barcelona biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.7671998842685637',
        description: 'Barcelona zoo',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.003977890160512532',
        description: 'Barcelona street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.05719828919530179',
        description: 'Barcelona park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8995594200729005',
        description: 'Barcelona city centre',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8080653301670673',
        description: 'Barcelona central station',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.8149069263288347',
        description: 'Barcelona central station',
      },
    ],
  },
  {
    name: 'Valencia',
    description:
			'Valencia, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.6401598821321268',
        description: 'Valencia kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.5536319451794032',
        description: 'Valencia biggest supermarket',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.16758111267614062',
        description: 'Valencia street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.25983455710099235',
        description: 'Valencia parliament building',
      },
    ],
  },
  {
    name: 'Madrid',
    description: 'Madrid, a perfect place to stay with a family.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.37734043786348415',
        description: 'Madrid kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.25101101989587926',
        description: 'Madrid kindergarten',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.6533081814614479',
        description: 'Madrid street market',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.943319736989195',
        description: 'Madrid kindergarten',
      },
    ],
  },
];
