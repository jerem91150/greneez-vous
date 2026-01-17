// ============================================
// DONNEES INITIALES - PRODUITS GREENEZ VOUS
// Mis a jour depuis la boutique SumUp
// ============================================

const initialCategories = [
    { id: 1, name: "Salle de Bain", slug: "salle-de-bain" },
    { id: 2, name: "Cheveux", slug: "cheveux" },
    { id: 3, name: "Pour les Enfants", slug: "pour-les-enfants" }
];

const initialProducts = [
    // ============================================
    // MINI SERVIETTES VISAGE
    // ============================================
    {
        id: 1,
        name: "Mini serviette visage",
        subtitle: "Motifs fleuris roses",
        description: "Mini serviette lavable pour le visage, ideale pour se demaquiller ou se rafraichir. Tissu doux et absorbant, lavable en machine a 30°. Fait main en France.",
        price: 6.00,
        stock: 30,
        categoryId: 1,
        image: "https://images.sumup.com/img_2X6JNB07X491NB54RJ7D3PV6E6",
        tag: "Best-seller",
        active: true
    },
    {
        id: 2,
        name: "Mini serviette visage",
        subtitle: "Motifs fleuris jaunes",
        description: "Mini serviette lavable pour le visage, ideale pour se demaquiller ou se rafraichir. Tissu doux et absorbant, lavable en machine a 30°. Fait main en France.",
        price: 6.00,
        stock: 25,
        categoryId: 1,
        image: "https://images.sumup.com/img_5A0746478499CVYFF957JZGWSA",
        tag: null,
        active: true
    },
    {
        id: 3,
        name: "Mini serviette visage Toile de Jouy bleue",
        subtitle: "Motif Toile de Jouy",
        description: "Mini serviette visage au motif Toile de Jouy bleue, elegante et douce. Parfaite pour vos rituels beaute quotidiens. Lavable et reutilisable.",
        price: 6.00,
        stock: 25,
        categoryId: 1,
        image: "https://images.sumup.com/img_1JPSQQWYTZ89VAF11QCAX5XHF9",
        tag: null,
        active: true
    },
    {
        id: 4,
        name: "Mini serviette visage Toile de Jouy rouge",
        subtitle: "Motif Toile de Jouy",
        description: "Mini serviette visage au motif Toile de Jouy rouge, elegante et douce. Un accessoire zero dechet indispensable.",
        price: 6.00,
        stock: 20,
        categoryId: 1,
        image: "https://images.sumup.com/img_2Z7NB4EM8D8B08Q3HHB6EF4TKS",
        tag: null,
        active: true
    },
    // ============================================
    // MINI GANTS
    // ============================================
    {
        id: 5,
        name: "Mini gant en micro eponge de bambou Toile de Jouy rouge",
        subtitle: "Micro eponge de bambou",
        description: "Mini gant lavable en micro eponge de bambou et coton imprime Toile de Jouy rouge. Parfait pour nettoyer le visage en douceur. Texture ultra douce pour les peaux sensibles.",
        price: 4.00,
        stock: 40,
        categoryId: 1,
        image: "https://images.sumup.com/img_3TNNHV46HK9BNBVJ0VT2RRRJZ1",
        tag: "Nouveau",
        active: true
    },
    {
        id: 6,
        name: "Mini gant lavable en micro eponge \"Paris\"",
        subtitle: "Motif Paris",
        description: "Mini gant lavable en micro eponge de bambou et coton imprime Paris. Naturellement antibacterien et ultra absorbant. Ideal pour les soins du visage.",
        price: 4.00,
        stock: 35,
        categoryId: 1,
        image: "https://images.sumup.com/img_3P3494JDDX9EFBC65HNS5AZ6G9",
        tag: null,
        active: true
    },
    {
        id: 7,
        name: "Mini gant lavable en micro eponge Toile de Jouy rose",
        subtitle: "Motif Toile de Jouy rose",
        description: "Mini gant lavable en micro eponge de bambou et coton imprime Toile de Jouy rose. Doux et ecologique.",
        price: 4.00,
        stock: 30,
        categoryId: 1,
        image: "https://images.sumup.com/img_6G44FRA7S887KSX781WW2Z189M",
        tag: null,
        active: true
    },
    // ============================================
    // BANDEAUX DE SOINS
    // ============================================
    {
        id: 8,
        name: "Bandeau de soins pour cheveux motifs fleurettes bleu",
        subtitle: "Fleurettes fond bleu",
        description: "Bandeau pour cheveux en coton et micro eponge de bambou. Fermeture par bande agrippante. Permet de tenir les cheveux lorsqu'on se lave le visage. Lavage en machine a 30° et sechage naturel.",
        price: 12.00,
        stock: 25,
        categoryId: 2,
        image: "https://images.sumup.com/img_0S7R651QCK9HZS37VJBWC57P9A",
        tag: "Best-seller",
        active: true
    },
    {
        id: 9,
        name: "Bandeau de soins pour cheveux motifs fleurettes rouges",
        subtitle: "Fleurettes rouges",
        description: "Bandeau pour cheveux en coton et micro eponge de bambou. Fermeture par bande agrippante. Permet de tenir les cheveux lorsqu'on se lave le visage. Lavage en machine a 30° et sechage naturel.",
        price: 12.00,
        stock: 20,
        categoryId: 2,
        image: "https://images.sumup.com/img_48G46PTYEH87GA4G69P2B2KFSW",
        tag: null,
        active: true
    },
    {
        id: 10,
        name: "Bandeau de soins pour cheveux Toile de Jouy rouge",
        subtitle: "Motif Toile de Jouy",
        description: "Bandeau pour cheveux en coton et micro eponge de bambou. Fermeture par bande agrippante. Permet de tenir les cheveux lorsqu'on se lave le visage. Lavage en machine a 30° et sechage naturel.",
        price: 12.00,
        stock: 15,
        categoryId: 2,
        image: "https://images.sumup.com/img_5Z3NBE1T1N97NTG9NGH7HJEPEV",
        tag: null,
        active: true
    },
    // ============================================
    // CHOUCHOUS
    // ============================================
    {
        id: 11,
        name: "Chouchou cheveux Toile de Jouy rouge",
        subtitle: "Coton imprime",
        description: "Chouchou cheveux en coton. Impression Toile de Jouy rouge. Realise a partir de chutes de tissu. Chaque piece est unique.",
        price: 5.00,
        stock: 50,
        categoryId: 2,
        image: "https://images.sumup.com/img_178FTDQWJ78SF9Y89002DA7016",
        tag: null,
        active: true
    },
    {
        id: 12,
        name: "Chouchou cheveux Toile de Jouy vert d'eau",
        subtitle: "Coton imprime",
        description: "Chouchou cheveux en coton. Impression Toile de Jouy vert d'eau. Un accessoire chic et eco-responsable.",
        price: 5.00,
        stock: 45,
        categoryId: 2,
        image: "https://images.sumup.com/img_0D1RX3BZEN845SR45C37MW26K9",
        tag: null,
        active: true
    },
    // ============================================
    // FLEURS DE DOUCHE
    // ============================================
    {
        id: 13,
        name: "Fleur de douche jaune safran",
        subtitle: "Micro eponge de bambou",
        description: "Fleur de douche en micro eponge de bambou. Couleur jaune safran. Ideal pour se laver sous la douche ! Rincer apres la douche et suspendre pour sechage. Passe a la machine a laver a 30°. Sechage a l'air libre.",
        price: 8.00,
        stock: 30,
        categoryId: 1,
        image: "https://images.sumup.com/img_6J8NFARCAP87Y9HTEP0QHP2VRG",
        tag: "Populaire",
        active: true
    },
    {
        id: 14,
        name: "Fleur de douche grise",
        subtitle: "Micro eponge de bambou",
        description: "Fleur de douche en micro eponge de bambou. Couleur grise. Ideal pour se laver sous la douche ! Rincer apres la douche et suspendre pour sechage. Passe a la machine a laver a 30°.",
        price: 8.00,
        stock: 25,
        categoryId: 1,
        image: "https://images.sumup.com/img_5RQNZGGRP982Q85NX4V4PDXX81",
        tag: null,
        active: true
    },
    {
        id: 15,
        name: "Fleur de douche beige",
        subtitle: "Micro eponge de bambou",
        description: "Fleur de douche en micro eponge de bambou. Couleur beige. Ideal pour se laver sous la douche ! Rincer apres la douche et suspendre pour sechage. Passe a la machine a laver a 30°.",
        price: 8.00,
        stock: 20,
        categoryId: 1,
        image: "https://images.sumup.com/img_0NTQDPMWQ88T7BTS67WJ9AFFV8",
        tag: null,
        active: true
    },
    // ============================================
    // POCHONS
    // ============================================
    {
        id: 16,
        name: "Pochon anti-gaspi en coton bio",
        subtitle: "Coton biologique",
        description: "Pochette a savon en coton biologique. Deposez vos savons ou shampoings solides dans le pochon et serrez le cordon. Vous pouvez ensuite vous laver directement avec la pochette a savon. Suspendez ensuite le filet par son cordon afin qu'il seche entre deux utilisations. Dimensions : 15 x 11 cm environ.",
        price: 6.00,
        stock: 40,
        categoryId: 1,
        image: "https://images.sumup.com/img_0VWXRPQJVG8TQVJ3GEJNX5T2AQ",
        tag: "Eco-responsable",
        active: true
    },
    {
        id: 17,
        name: "Pochon pour produits solides Toile de Jouy rouge",
        subtitle: "Motif Toile de Jouy",
        description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le sechage.",
        price: 6.00,
        stock: 35,
        categoryId: 1,
        image: "https://images.sumup.com/img_5S1VB99A1W8AT83V5T1YM5XV00",
        tag: null,
        active: true
    },
    {
        id: 18,
        name: "Pochon pour produits solides lin naturel",
        subtitle: "Lin naturel",
        description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le sechage.",
        price: 6.00,
        stock: 30,
        categoryId: 1,
        image: "https://images.sumup.com/img_4SKY9NWPV792N81N02DHW3S4R8",
        tag: null,
        active: true
    },
    {
        id: 19,
        name: "Pochon pour produits solides Toile de Jouy bleu",
        subtitle: "Motif Toile de Jouy",
        description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le sechage.",
        price: 6.00,
        stock: 25,
        categoryId: 1,
        image: "https://images.sumup.com/img_351T386RZ98BFAGKM42VS1GGRW",
        tag: null,
        active: true
    },
    {
        id: 20,
        name: "Pochon pour produits solides motif fleurs",
        subtitle: "Motif fleuri",
        description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le sechage.",
        price: 6.00,
        stock: 20,
        categoryId: 1,
        image: "https://images.sumup.com/img_0MXHVEGXMT8N7SJF074JRSQ5NT",
        tag: null,
        active: true
    },
    {
        id: 21,
        name: "Pochon pour produits solides liberty",
        subtitle: "Motif liberty",
        description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le sechage.",
        price: 6.00,
        stock: 25,
        categoryId: 1,
        image: "https://images.sumup.com/img_4NXBS82FC09S4RRZB30FFRKBNA",
        tag: null,
        active: true
    },
    {
        id: 22,
        name: "Pochon pour produits solides etoiles",
        subtitle: "Motif etoiles",
        description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le sechage.",
        price: 6.00,
        stock: 30,
        categoryId: 1,
        image: "https://images.sumup.com/img_071EQ7GH4N90SS80WYJH8ZY2QC",
        tag: null,
        active: true
    },
    // ============================================
    // POUR LES ENFANTS
    // ============================================
    {
        id: 23,
        name: "Circuit de poche",
        subtitle: "Jeu de voyage",
        description: "Le circuit de poche a emporter partout. Il se replie pour tenir dans la poche ou le sac a main. Il dispose d'une pochette servant de garage pour 3 voitures. Format ouvert : 29 x 25 cm environ (pochette pour 3 voitures 12 x 10 cm). Format ferme : 12 x 10 cm et epaisseur 2 cm. Vendu sans voiture.",
        price: 20.00,
        stock: 15,
        categoryId: 3,
        image: "https://images.sumup.com/img_4HNA0HDEYF8H7A7V7MZVY83825",
        tag: "Piece unique",
        active: true
    }
];

const initialEvents = [
    {
        id: 1,
        title: "Marche de Noel Artisanal",
        description: "Retrouvez-nous au marche de Noel de Lyon, place Bellecour. Venez decouvrir toutes nos creations !",
        date: "2025-12-15",
        location: "Lyon, Place Bellecour",
        active: true
    },
    {
        id: 2,
        title: "Atelier Couture Zero Dechet",
        description: "Apprenez a coudre vos propres lingettes demaquillantes ! Places limitees, inscription obligatoire.",
        date: "2025-12-20",
        location: "Atelier Greenez Vous, Lyon 3e",
        active: true
    },
    {
        id: 3,
        title: "Marche des Createurs",
        description: "Greenez Vous sera present au marche des createurs de Villeurbanne.",
        date: "2026-01-18",
        location: "Villeurbanne, Place Grandclement",
        active: true
    }
];

const initialPromos = [
    {
        id: 1,
        code: "BIENVENUE10",
        discount: 10,
        type: "percent",
        minOrder: 0,
        active: true,
        usageCount: 45,
        maxUsage: 100
    },
    {
        id: 2,
        code: "HIVER2026",
        discount: 15,
        type: "percent",
        minOrder: 25,
        active: true,
        usageCount: 0,
        maxUsage: 50
    },
    {
        id: 3,
        code: "ZERODECHET",
        discount: 5,
        type: "fixed",
        minOrder: 30,
        active: true,
        usageCount: 8,
        maxUsage: 30
    }
];

// ============================================
// HELPERS LOCALSTORAGE
// ============================================

const getStoredData = (key, defaultValue) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch {
        return defaultValue;
    }
};

const setStoredData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {}
};
