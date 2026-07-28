const { useState, useEffect, createContext, useContext } = React;

// ICONES
const IconWrapper = ({ children, size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>);
const Leaf = (props) => (<IconWrapper {...props}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></IconWrapper>);
const ShoppingBag = (props) => (<IconWrapper {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></IconWrapper>);
const MenuIcon = (props) => (<IconWrapper {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>);
const XIcon = (props) => (<IconWrapper {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>);
const Star = (props) => (<IconWrapper {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconWrapper>);
const ArrowRight = (props) => (<IconWrapper {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></IconWrapper>);
const ArrowLeft = (props) => (<IconWrapper {...props}><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></IconWrapper>);
const MoveRight = (props) => (<IconWrapper {...props}><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></IconWrapper>);
const Instagram = (props) => (<IconWrapper {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></IconWrapper>);
const Facebook = (props) => (<IconWrapper {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></IconWrapper>);
const Mail = (props) => (<IconWrapper {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconWrapper>);
const Plus = (props) => (<IconWrapper {...props}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>);
const Minus = (props) => (<IconWrapper {...props}><path d="M5 12h14"/></IconWrapper>);
const Trash = (props) => (<IconWrapper {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></IconWrapper>);
const Edit = (props) => (<IconWrapper {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></IconWrapper>);
const User = (props) => (<IconWrapper {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>);
const Package = (props) => (<IconWrapper {...props}><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/></IconWrapper>);
const Calendar = (props) => (<IconWrapper {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></IconWrapper>);
const Tag = (props) => (<IconWrapper {...props}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></IconWrapper>);
const ShoppingCart = (props) => (<IconWrapper {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></IconWrapper>);
const Eye = (props) => (<IconWrapper {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></IconWrapper>);
const Search = (props) => (<IconWrapper {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconWrapper>);
const Check = (props) => (<IconWrapper {...props}><polyline points="20 6 9 17 4 12"/></IconWrapper>);
const MapPin = (props) => (<IconWrapper {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconWrapper>);
const CreditCard = (props) => (<IconWrapper {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></IconWrapper>);
const Truck = (props) => (<IconWrapper {...props}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></IconWrapper>);
const BarChart = (props) => (<IconWrapper {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></IconWrapper>);
const Scissors = (props) => (<IconWrapper {...props}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" x2="8.12" y1="4" y2="15.88"/><line x1="14.47" x2="20" y1="14.48" y2="20"/><line x1="8.12" x2="12" y1="8.12" y2="12"/></IconWrapper>);
const Clock = (props) => (<IconWrapper {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>);
const CheckCircle = (props) => (<IconWrapper {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>);
const Download = (props) => (<IconWrapper {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></IconWrapper>);
const Users = (props) => (<IconWrapper {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>);
const Filter = (props) => (<IconWrapper {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></IconWrapper>);
const AlertTriangle = (props) => (<IconWrapper {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></IconWrapper>);
const Heart = (props) => (<IconWrapper {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconWrapper>);
const LogOut = (props) => (<IconWrapper {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></IconWrapper>);
const Edit3 = (props) => (<IconWrapper {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></IconWrapper>);

// DONNEES - PRODUITS GREENEZ VOUS (depuis SumUp)
const initialCategories = [
    { id: 1, name: "Salle de Bain", slug: "salle-de-bain" },
    { id: 2, name: "Cheveux", slug: "cheveux" },
    { id: 3, name: "Pour les Enfants", slug: "pour-les-enfants" }
];

const initialProducts = [
    // MINI SERVIETTES VISAGE
    { id: 1, name: "Mini serviette visage", subtitle: "Motifs fleuris roses", description: "Mini serviette lavable pour le visage, idéale pour se demaquiller ou se rafraichir. Tissu doux et absorbant, lavable en machine a 30°. Fait main en France.", price: 6.00, stock: 30, categoryId: 1, image: "https://images.sumup.com/img_2X6JNB07X491NB54RJ7D3PV6E6", tag: "Best-seller", active: true, featured: true },
    { id: 2, name: "Mini serviette visage", subtitle: "Motifs fleuris jaunes", description: "Mini serviette lavable pour le visage, idéale pour se demaquiller ou se rafraichir. Tissu doux et absorbant, lavable en machine a 30°. Fait main en France.", price: 6.00, stock: 25, categoryId: 1, image: "https://images.sumup.com/img_5A0746478499CVYFF957JZGWSA", tag: null, active: true, featured: false },
    { id: 3, name: "Mini serviette visage Toile de Jouy bleue", subtitle: "Motif Toile de Jouy", description: "Mini serviette visage au motif Toile de Jouy bleue, élégante et douce. Parfaite pour vos rituels beaute quotidiens. Lavable et reutilisable.", price: 6.00, stock: 25, categoryId: 1, image: "https://images.sumup.com/img_1JPSQQWYTZ89VAF11QCAX5XHF9", tag: null, active: true },
    { id: 4, name: "Mini serviette visage Toile de Jouy rouge", subtitle: "Motif Toile de Jouy", description: "Mini serviette visage au motif Toile de Jouy rouge, élégante et douce. Un accessoire zéro déchet indispensable.", price: 6.00, stock: 20, categoryId: 1, image: "https://images.sumup.com/img_2Z7NB4EM8D8B08Q3HHB6EF4TKS", tag: null, active: true },
    // MINI GANTS
    { id: 5, name: "Mini gant en micro éponge de bambou Toile de Jouy rouge", subtitle: "Micro éponge de bambou", description: "Mini gant lavable en micro éponge de bambou et coton imprimé Toile de Jouy rouge. Parfait pour nettoyer le visage en douceur. Texture ultra douce pour les peaux sensibles.", price: 4.00, stock: 40, categoryId: 1, image: "https://images.sumup.com/img_3TNNHV46HK9BNBVJ0VT2RRRJZ1", tag: "Nouveau", active: true, featured: true },
    { id: 6, name: "Mini gant lavable en micro éponge Paris", subtitle: "Motif Paris", description: "Mini gant lavable en micro éponge de bambou et coton imprimé Paris. Naturellement antibactérien et ultra absorbant. Idéal pour les soins du visage.", price: 4.00, stock: 35, categoryId: 1, image: "https://images.sumup.com/img_3P3494JDDX9EFBC65HNS5AZ6G9", tag: null, active: true },
    { id: 7, name: "Mini gant lavable en micro éponge Toile de Jouy rose", subtitle: "Motif Toile de Jouy rose", description: "Mini gant lavable en micro éponge de bambou et coton imprimé Toile de Jouy rose. Doux et écologique.", price: 4.00, stock: 30, categoryId: 1, image: "https://images.sumup.com/img_6G44FRA7S887KSX781WW2Z189M", tag: null, active: true },
    // BANDEAUX DE SOINS
    { id: 8, name: "Bandeau de soins pour cheveux motifs fleurettes bleu", subtitle: "Fleurettes fond bleu", description: "Bandeau pour cheveux en coton et micro éponge de bambou. Fermeture par bande agrippante. Permet de tenir les cheveux lorsqu'on se lave le visage. Lavage en machine a 30° et séchage naturel.", price: 12.00, stock: 25, categoryId: 2, image: "https://images.sumup.com/img_0S7R651QCK9HZS37VJBWC57P9A", tag: "Best-seller", active: true, featured: true },
    { id: 9, name: "Bandeau de soins pour cheveux motifs fleurettes rouges", subtitle: "Fleurettes rouges", description: "Bandeau pour cheveux en coton et micro éponge de bambou. Fermeture par bande agrippante. Permet de tenir les cheveux lorsqu'on se lave le visage. Lavage en machine a 30° et séchage naturel.", price: 12.00, stock: 20, categoryId: 2, image: "https://images.sumup.com/img_48G46PTYEH87GA4G69P2B2KFSW", tag: null, active: true },
    { id: 10, name: "Bandeau de soins pour cheveux Toile de Jouy rouge", subtitle: "Motif Toile de Jouy", description: "Bandeau pour cheveux en coton et micro éponge de bambou. Fermeture par bande agrippante. Permet de tenir les cheveux lorsqu'on se lave le visage. Lavage en machine a 30° et séchage naturel.", price: 12.00, stock: 15, categoryId: 2, image: "https://images.sumup.com/img_5Z3NBE1T1N97NTG9NGH7HJEPEV", tag: null, active: true },
    // CHOUCHOUS
    { id: 11, name: "Chouchou cheveux Toile de Jouy rouge", subtitle: "Coton imprimé", description: "Chouchou cheveux en coton. Impression Toile de Jouy rouge. Réalisé à partir de chutes de tissu. Chaque pièce est unique.", price: 5.00, stock: 50, categoryId: 2, image: "https://images.sumup.com/img_178FTDQWJ78SF9Y89002DA7016", tag: null, active: true },
    { id: 12, name: "Chouchou cheveux Toile de Jouy vert d'eau", subtitle: "Coton imprimé", description: "Chouchou cheveux en coton. Impression Toile de Jouy vert d'eau. Un accessoire chic et éco-responsable.", price: 5.00, stock: 45, categoryId: 2, image: "https://images.sumup.com/img_0D1RX3BZEN845SR45C37MW26K9", tag: null, active: true },
    // FLEURS DE DOUCHE
    { id: 13, name: "Fleur de douche jaune safran", subtitle: "Micro éponge de bambou", description: "Fleur de douche en micro éponge de bambou. Couleur jaune safran. Idéal pour se laver sous la douche ! Rincer apres la douche et suspendre pour séchage. Passe a la machine a laver a 30°. Sechage a l'air libre.", price: 8.00, stock: 30, categoryId: 1, image: "https://images.sumup.com/img_6J8NFARCAP87Y9HTEP0QHP2VRG", tag: "Populaire", active: true, featured: true },
    { id: 14, name: "Fleur de douche grise", subtitle: "Micro éponge de bambou", description: "Fleur de douche en micro éponge de bambou. Couleur grise. Idéal pour se laver sous la douche ! Rincer apres la douche et suspendre pour séchage. Passe a la machine a laver a 30°.", price: 8.00, stock: 25, categoryId: 1, image: "https://images.sumup.com/img_5RQNZGGRP982Q85NX4V4PDXX81", tag: null, active: true },
    { id: 15, name: "Fleur de douche beige", subtitle: "Micro éponge de bambou", description: "Fleur de douche en micro éponge de bambou. Couleur beige. Idéal pour se laver sous la douche ! Rincer apres la douche et suspendre pour séchage. Passe a la machine a laver a 30°.", price: 8.00, stock: 20, categoryId: 1, image: "https://images.sumup.com/img_0NTQDPMWQ88T7BTS67WJ9AFFV8", tag: null, active: true },
    // POCHONS
    { id: 16, name: "Pochon anti-gaspi en coton bio", subtitle: "Coton biologique", description: "Pochette a savon en coton biologique. Déposez vos savons ou shampoings solides dans le pochon et serrez le cordon. Vous pouvez ensuite vous laver directement avec la pochette a savon. Suspendez ensuite le filet par son cordon afin qu'il sèche entre deux utilisations. Dimensions : 15 x 11 cm environ.", price: 6.00, stock: 40, categoryId: 1, image: "https://images.sumup.com/img_0VWXRPQJVG8TQVJ3GEJNX5T2AQ", tag: "Eco-responsable", active: true },
    { id: 17, name: "Pochon pour produits solides Toile de Jouy rouge", subtitle: "Motif Toile de Jouy", description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le séchage.", price: 6.00, stock: 35, categoryId: 1, image: "https://images.sumup.com/img_5S1VB99A1W8AT83V5T1YM5XV00", tag: null, active: true },
    { id: 18, name: "Pochon pour produits solides lin naturel", subtitle: "Lin naturel", description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le séchage.", price: 6.00, stock: 30, categoryId: 1, image: "https://images.sumup.com/img_4SKY9NWPV792N81N02DHW3S4R8", tag: null, active: true },
    { id: 19, name: "Pochon pour produits solides Toile de Jouy bleu", subtitle: "Motif Toile de Jouy", description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le séchage.", price: 6.00, stock: 25, categoryId: 1, image: "https://images.sumup.com/img_351T386RZ98BFAGKM42VS1GGRW", tag: null, active: true },
    { id: 20, name: "Pochon pour produits solides motif fleurs", subtitle: "Motif fleuri", description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le séchage.", price: 6.00, stock: 20, categoryId: 1, image: "https://images.sumup.com/img_0MXHVEGXMT8N7SJF074JRSQ5NT", tag: null, active: true },
    { id: 21, name: "Pochon pour produits solides liberty", subtitle: "Motif liberty", description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le séchage.", price: 6.00, stock: 25, categoryId: 1, image: "https://images.sumup.com/img_4NXBS82FC09S4RRZB30FFRKBNA", tag: null, active: true },
    { id: 22, name: "Pochon pour produits solides etoiles", subtitle: "Motif etoiles", description: "Pochon ideal pour ranger et transporter vos cosmetiques solides (shampoing, savon, dentifrice). Tissu respirant qui permet le séchage.", price: 6.00, stock: 30, categoryId: 1, image: "https://images.sumup.com/img_071EQ7GH4N90SS80WYJH8ZY2QC", tag: null, active: true },
    // POUR LES ENFANTS
    { id: 23, name: "Circuit de poche", subtitle: "Jeu de voyage", description: "Le circuit de poche a emporter partout. Il se replie pour tenir dans la poche ou le sac a main. Il dispose d'une pochette servant de garage pour 3 voitures. Format ouvert : 29 x 25 cm environ (pochette pour 3 voitures 12 x 10 cm). Format ferme : 12 x 10 cm et épaisseur 2 cm. Vendu sans voiture.", price: 20.00, stock: 15, categoryId: 3, image: "https://images.sumup.com/img_4HNA0HDEYF8H7A7V7MZVY83825", tag: "Piece unique", active: true }
];

const initialEvents = [
    { id: 1, title: "Marché de Noël Artisanal", description: "Retrouvez-nous au marche de Noel de Lyon, place Bellecour. Venez découvrir toutes nos créations !", date: "2025-12-15", location: "Lyon, Place Bellecour", active: true },
    { id: 2, title: "Atelier Couture Zéro Déchet", description: "Apprenez à coudre vos propres lingettes démaquillantes ! Places limitées, inscription obligatoire.", date: "2025-12-20", location: "Atelier Greenez Vous, Lyon 3e", active: true },
    { id: 3, title: "Marche des Créateurs", description: "Greenez Vous sera present au marche des createurs de Villeurbanne.", date: "2026-01-18", location: "Villeurbanne, Place Grandclement", active: true }
];

const initialPromos = [
    { id: 1, code: "BIENVENUE10", discount: 10, type: "percent", minOrder: 0, active: true, usageCount: 45, maxUsage: 100 },
    { id: 2, code: "HIVER2026", discount: 15, type: "percent", minOrder: 25, active: true, usageCount: 0, maxUsage: 50 },
    { id: 3, code: "ZERODECHET", discount: 5, type: "fixed", minOrder: 30, active: true, usageCount: 8, maxUsage: 30 }
];

// AVIS CLIENTS
const initialReviews = [
    { id: 1, productId: 1, author: "Marie L.", rating: 5, comment: "Superbes lingettes, tres douces et pratiques !", date: "2025-11-15", approved: true },
    { id: 2, productId: 8, author: "Sophie M.", rating: 5, comment: "Le bandeau tient parfaitement, je recommande !", date: "2025-12-01", approved: true },
    { id: 3, productId: 13, author: "Claire D.", rating: 4, comment: "Tres belle fleur de douche, couleur magnifique.", date: "2025-12-10", approved: true }
];

// CONTENU DU SITE (editable dans admin)
const initialSiteContent = {
    heroTitle: "Naturel",
    heroTitleItalic: "et poetique.",
    heroSubtitle: "Une couture artisanale française qui prend soin de vous et de la planète. Simple, durable et terriblement douce.",
    heroBadge: "Artisanat Textile Français",
    heroImage: "https://images.sumup.com/img_2X6JNB07X491NB54RJ7D3PV6E6",
    heroQuote: "Mes lingettes préférées depuis 2 ans !",
    aboutTitle: "Notre Histoire",
    aboutText: "Greenez Vous est né d'une envie simple : créer de beaux objets utiles, sans compromis sur l'éthique. Dans mon petit atelier lyonnais, je coupe, je couds, je brode chaque pièce a la main.",
    aboutImage: "https://images.sumup.com/img_4HNA0HDEYF8H7A7V7MZVY83825",
    categoryImage1: "https://images.sumup.com/img_6J8NFARCAP87Y9HTEP0QHP2VRG",
    categoryTitle1: "Salle de Bain",
    categoryDesc1: "Lingettes, serviettes & gants",
    categoryImage2: "https://images.sumup.com/img_0VWXRPQJVG8TQVJ3GEJNX5T2AQ",
    categoryTitle2: "Cheveux",
    categoryImage3: "https://images.sumup.com/img_0S7R651QCK9HZS37VJBWC57P9A",
    categoryTitle3: "Pour les Enfants",
    customTitle: "Une creation sur mesure ?",
    customText: "Vous avez un tissu de famille que vous souhaitez transformer ? Discutons-en ensemble.",
    marquee1: "FAIT MAIN EN FRANCE",
    marquee2: "MATIERES NATURELLES",
    marquee3: "ZERO DECHET",
    featuredLabel: "Selection du mois",
    featuredTitle: "Les Pepites",
    footerText: "Rejoignez le mouvement slow life. Une couture a la fois, pour un monde plus doux.",
    contactEmail: "contact@greenez-vous.fr",
    contactPhone: "06 00 00 00 00",
    instagram: "https://instagram.com/Greenez_vous",
    facebook: "https://facebook.com/greenezvous"
};

// PAGES LEGALES
const initialLegalPages = {
    cgv: {
        title: "Conditions Générales de Vente",
        content: `<h2>Article 1 - Objet</h2>
<p>Les presentes Conditions Générales de Vente (CGV) regissent les ventes de produits effectuees par Greenez Vous, micro-entreprise dont le siege social est situe a Lyon (69000), France.</p>

<h2>Article 2 - Prix</h2>
<p>Les prix sont indiques en euros TTC. Greenez Vous se reserve le droit de modifier ses prix a tout moment mais les produits seront factures sur la base des tarifs en vigueur au moment de la validation de la commande.</p>

<h2>Article 3 - Commande</h2>
<p>Le client passe commande sur le site internet. La vente sera consideree comme definitive apres l'envoi au client de la confirmation de la commande par email et apres encaissement du prix.</p>

<h2>Article 4 - Livraison</h2>
<p>Les produits sont livres a l'adresse indiquee par le client. Les delais de livraison sont donnes a titre indicatif. Livraison en France metropolitaine uniquement.</p>

<h2>Article 5 - Droit de retractation</h2>
<p>Conformement a l'article L.221-18 du Code de la consommation, le client dispose d'un delai de 14 jours a compter de la reception des produits pour exercer son droit de retractation sans avoir a justifier de motifs.</p>

<h2>Article 6 - Garanties</h2>
<p>Tous les produits beneficient de la garantie légale de conformite et de la garantie des vices caches.</p>

<h2>Article 7 - Donnees personnelles</h2>
<p>Les informations collectees sont nécessaires au traitement de la commande. Conformement au RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos données.</p>`
    },
    mentions: {
        title: "Mentions Legales",
        content: `<h2>Editeur du site</h2>
<p><strong>Greenez Vous</strong><br>
Micro-entreprise<br>
Siege social : Lyon (69000), France<br>
Email : contact@greenez-vous.fr<br>
SIRET : A completer</p>

<h2>Hebergement</h2>
<p>Ce site est heberge par : Hostinger International Ltd.<br>
61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>

<h2>Propriete intellectuelle</h2>
<p>L'ensemble du contenu de ce site (textes, images, logos) est la propriete exclusive de Greenez Vous. Toute reproduction est interdite sans autorisation prealable.</p>

<h2>Donnees personnelles et cookies</h2>
<p>Ce site utilise des cookies pour ameliorer l'experience utilisateur. Conformement au RGPD, vous pouvez a tout moment modifier vos preferences en matiere de cookies.</p>

<h2>Credits</h2>
<p>Site réalisé avec amour par Greenez Vous.</p>`
    },
    confidentialite: {
        title: "Politique de Confidentialité",
        content: `<h2>Collecte des données</h2>
<p>Nous collectons les données suivantes : nom, prénom, adresse email, adresse postale, numéro de téléphone. Ces données sont nécessaires au traitement de vos commandes.</p>

<h2>Utilisation des données</h2>
<p>Vos données sont utilisees uniquement pour :<br>
- Le traitement et l'expedition de vos commandes<br>
- L'envoi de communications relatives a vos commandes<br>
- La gestion de la relation client</p>

<h2>Conservation des données</h2>
<p>Vos données sont conservées pendant une durée de 3 ans a compter de votre dernière commande.</p>

<h2>Vos droits</h2>
<p>Conformement au RGPD, vous disposez des droits suivants :<br>
- Droit d'acces a vos données<br>
- Droit de rectification<br>
- Droit a l'effacement<br>
- Droit a la portabilite<br>
Pour exercer ces droits, contactez-nous a : contact@greenez-vous.fr</p>`
    }
};

// CONFIGURATION LIVRAISON
const initialShippingOptions = [
    { id: 1, name: "Lettre suivie", description: "Livraison en 2-4 jours ouvrés", price: 3.50, minOrder: 0, maxOrder: 30, freeAbove: null, active: true },
    { id: 2, name: "Colissimo", description: "Livraison en 2-3 jours ouvrés avec suivi", price: 5.90, minOrder: 0, maxOrder: null, freeAbove: 50, active: true },
    { id: 3, name: "Colissimo Express", description: "Livraison en 24-48h", price: 8.90, minOrder: 0, maxOrder: null, freeAbove: null, active: true },
    { id: 4, name: "Point Relais", description: "Livraison en 3-5 jours ouvrés", price: 4.50, minOrder: 0, maxOrder: null, freeAbove: 40, active: true }
];

// NEWSLETTER
const initialNewsletterSubscribers = [];

// ACTUALITES (liées à Instagram)
const initialActualites = [
    {
        id: 1,
        title: "Nouvelle collection printemps",
        description: "Découvrez nos nouveaux motifs floraux pour le printemps ! Des créations colorées et joyeuses.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        instagramUrl: "https://instagram.com/p/example1",
        date: "2026-01-15",
        active: true
    },
    {
        id: 2,
        title: "Marché de Noël - Retour en images",
        description: "Merci a tous pour votre visite au marche de Noel ! Vos sourires nous font chaud au coeur.",
        image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400",
        instagramUrl: "https://instagram.com/p/example2",
        date: "2026-01-10",
        active: true
    },
    {
        id: 3,
        title: "Atelier couture du weekend",
        description: "Super moment de partage lors de notre atelier ! Prochaine date bientot annoncee.",
        image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
        instagramUrl: "https://instagram.com/p/example3",
        date: "2026-01-05",
        active: true
    }
];

// HELPERS
const getStoredData = (key, defaultValue) => { try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : defaultValue; } catch { return defaultValue; } };
const setStoredData = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
const isProductionMode = () => window.GREENEZ_MODE === 'production';
const getAPI = () => window.GreenezAPI;

// L'etat "admin" doit decouler du token, pas d'un booleen en localStorage :
// un simple greenez_admin=true suffisait sinon a afficher tout le tableau de
// bord (les donnees restaient protegees par le serveur, mais l'interface
// s'ouvrait). On ne verifie ici que le type et l'expiration ; la signature
// HMAC n'est verifiable que cote serveur, qui reste seul juge.
// Les pages legales (CGV, mentions, confidentialite) sont stockees dans
// site_settings sous les cles legal_<clef>, serialisees en JSON.
// Elles n'etaient auparavant conservees qu'en localStorage : une modification
// faite depuis l'admin n'etait visible que dans le navigateur de l'admin,
// jamais par les clients.
const LEGAL_KEYS = ['cgv', 'mentions', 'confidentialite'];
const legalSettingKey = (key) => 'legal_' + key;

const parseLegalSettings = (settings) => {
    const pages = {};
    LEGAL_KEYS.forEach(key => {
        const raw = settings[legalSettingKey(key)];
        if (!raw) return;
        try {
            const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
            if (parsed && (parsed.title || parsed.content)) pages[key] = parsed;
        } catch {
            // Valeur illisible : on garde le contenu par defaut
        }
    });
    return pages;
};

// Retire les cles legal_* du reste des reglages pour ne pas les melanger
// au contenu editorial du site
const stripLegalSettings = (settings) => {
    const rest = { ...settings };
    LEGAL_KEYS.forEach(key => { delete rest[legalSettingKey(key)]; });
    return rest;
};

const hasValidAdminToken = () => {
    try {
        const token = localStorage.getItem('greenez_admin_token');
        if (!token) return false;
        const payloadB64 = token.split('.')[0];
        const padded = payloadB64 + '='.repeat((4 - payloadB64.length % 4) % 4);
        const payload = JSON.parse(atob(padded));
        return payload.type === 'admin' && (payload.exp * 1000) > Date.now();
    } catch {
        return false;
    }
};

// NORMALISATION DES REPONSES API (snake_case SQL -> format attendu par le rendu)
// Idempotent : une commande deja au format demo passe sans modification
const normalizeOrder = (o) => {
    if (!o) return o;
    const order = { ...o };
    order.trackingCode = o.trackingCode || o.tracking_code || null;
    order.date = o.date || o.created_at || null;
    order.customer = (o.customer && o.customer.email) ? o.customer : {
        email: o.customer_email || '',
        firstName: o.customer_first_name || '',
        lastName: o.customer_last_name || '',
        phone: o.customer_phone || '',
        address: o.customer_address || '',
        city: o.customer_city || '',
        postalCode: o.customer_postal_code || '',
        country: o.customer_country || 'France'
    };
    let items = o.items;
    if (typeof items === 'string') { try { items = JSON.parse(items); } catch (e) { items = []; } }
    order.items = Array.isArray(items) ? items : [];
    const history = o.statusHistory || o.status_history || [];
    order.statusHistory = (Array.isArray(history) ? history : []).map(h => ({ status: h.status, note: h.note || '', date: h.date || h.created_at || null }));
    order.promoUsed = o.promoUsed || o.promo_code || null;
    order.promoDiscount = parseFloat(o.promoDiscount !== undefined ? o.promoDiscount : o.promo_discount) || 0;
    order.shippingCost = o.shippingCost !== undefined ? o.shippingCost : (parseFloat(o.shipping_cost) || 0);
    order.shippingMethod = o.shippingMethod || o.shipping_method || null;
    order.invoiceNumber = o.invoiceNumber || o.invoice_number || null;
    order.paymentMethod = o.paymentMethod || o.payment_method || null;
    order.paymentStatus = o.paymentStatus || o.payment_status || 'pending';
    order.unreadByAdmin = o.unreadByAdmin !== undefined ? !!o.unreadByAdmin : !!o.unread_by_admin;
    order.unreadByCustomer = o.unreadByCustomer !== undefined ? !!o.unreadByCustomer : !!o.unread_by_customer;
    let messages = o.messages;
    if (typeof messages === 'string') { try { messages = JSON.parse(messages); } catch (e) { messages = []; } }
    order.messages = (Array.isArray(messages) ? messages : []).map(m => ({
        id: m.id,
        sender: m.sender || (m.is_admin ? 'admin' : 'customer'),
        content: m.message !== undefined ? m.message : (m.content !== undefined ? m.content : m.text),
        date: m.date || m.created_at || null,
        read: m.read !== undefined ? !!m.read : !!m.is_read
    }));
    return order;
};

const normalizeReview = (r) => {
    if (!r) return r;
    return {
        ...r,
        productId: r.productId !== undefined ? r.productId : r.product_id,
        author: r.author || r.customer_name || 'Anonyme',
        rating: parseInt(r.rating) || 0,
        date: r.date || r.created_at || null,
        approved: !!(r.approved !== undefined ? r.approved : r.is_approved)
    };
};

const normalizePromo = (p) => {
    if (!p) return p;
    return {
        ...p,
        discount: parseFloat(p.discount) || 0,
        minOrder: parseFloat(p.minOrder !== undefined ? p.minOrder : p.min_order) || 0,
        usageCount: parseInt(p.usageCount !== undefined ? p.usageCount : p.usage_count) || 0,
        maxUsage: parseInt(p.maxUsage !== undefined ? p.maxUsage : p.max_usage) || 0,
        active: p.active !== undefined ? !!p.active : true
    };
};

const normalizeSubscriber = (s) => {
    if (!s) return s;
    return { ...s, firstName: s.firstName !== undefined ? s.firstName : (s.first_name || ''), date: s.date || s.created_at || null, active: s.active !== undefined ? !!s.active : true };
};

// CONTEXTE
const AppContext = createContext();
// Hash routing helpers
const pageToHash = { home: '/', shop: '/boutique', product: '/produit', events: '/evenements', actualites: '/actualites', favorites: '/favoris', auth: '/connexion', account: '/mon-compte', about: '/atelier', checkout: '/commande', confirmation: '/confirmation', login: '/admin-login', admin: '/admin', legal: '/mentions-legales', tracking: '/suivi', 'reset-password': '/reset-password' };
const hashToPage = Object.fromEntries(Object.entries(pageToHash).map(([k, v]) => [v, k]));

// Routage par vraies URL (/produit/12) au lieu de fragments (#/produit/12).
// Un fragment n'est pas une URL distincte pour un moteur de recherche : avec
// l'ancien routage, une seule page etait indexable pour toute la boutique.
// Necessite la reecriture Apache definie dans .htaccess.
const routeFromPath = (path) => {
    const clean = (path || '/').replace(/\/+$/, '') || '/';
    if (clean.startsWith('/produit/')) return { page: 'product', productId: parseInt(clean.split('/')[2]) };
    if (clean.startsWith('/mentions-legales/')) return { page: 'legal', legalKey: clean.split('/')[2] };
    if (clean.startsWith('/reset-password/')) return { page: 'reset-password', resetToken: clean.split('/')[2] };
    return { page: hashToPage[clean] || null };
};

// Les anciens liens #/suivi restent valides : les emails deja envoyes en
// contiennent, et des clients ont pu en mettre en favori.
const getCurrentRoute = () => {
    const hash = (window.location.hash || '').slice(1);
    if (hash.startsWith('/')) {
        const legacy = routeFromPath(hash);
        if (legacy.page) return { ...legacy, legacyPath: hash };
    }
    const route = routeFromPath(window.location.pathname);
    // unknown : le chemin ne correspond a aucune page. On affiche l'accueil,
    // mais l'URL doit etre corrigee, sinon la reecriture Apache renvoie
    // l'accueil pour n'importe quelle adresse et un moteur de recherche
    // indexerait une infinite de doublons.
    return {
        ...route,
        page: route.page || 'home',
        unknown: !route.page && window.location.pathname !== '/',
    };
};

const pathForPage = (page, opts = {}) => {
    if (page === 'product' && opts.productId) return '/produit/' + opts.productId;
    if (page === 'legal' && opts.legalKey) return '/mentions-legales/' + opts.legalKey;
    if (page === 'reset-password' && opts.resetToken) return '/reset-password/' + opts.resetToken;
    return pageToHash[page] || '/';
};

const AppProvider = ({ children }) => {
    const initRoute = getCurrentRoute();
    const [page, setPageRaw] = useState(initRoute.page);
    const [pendingProductId, setPendingProductId] = useState(initRoute.productId || null);
    const setPage = (p, opts = {}) => {
        setPageRaw(p);
        window.scrollTo(0, 0);
        if (opts.skipHash) return;
        const path = pathForPage(p, opts);
        if (window.location.pathname !== path || window.location.hash) {
            window.history.pushState({ page: p }, '', path);
        }
    };

    // Normalisation de l'URL a l'arrivee, sans ajouter d'entree d'historique :
    // - ancien lien #/... converti en URL propre
    // - adresse inconnue ramenee a l'accueil
    useEffect(() => {
        if (initRoute.legacyPath) {
            window.history.replaceState({ page: initRoute.page }, '', initRoute.legacyPath);
        } else if (initRoute.unknown) {
            window.history.replaceState({ page: 'home' }, '', '/');
        }
    }, []);
    const navigateToProduct = (product) => { setSelectedProduct(product); setPage('product', { productId: product.id }); };
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [lastOrder, setLastOrder] = useState(() => { try { const saved = sessionStorage.getItem('greenez_last_order'); return saved ? JSON.parse(saved) : null; } catch(e) { return null; } });
    const [selectedLegalPage, setSelectedLegalPage] = useState(initRoute.legalKey || null);
    const [resetToken, setResetToken] = useState(initRoute.resetToken || null);
    const [cart, setCart] = useState(() => getStoredData('greenez_cart', []));
    const [products, setProducts] = useState(() => isProductionMode() ? [] : getStoredData('greenez_products', initialProducts));
    const [categories, setCategories] = useState(isProductionMode() ? [] : initialCategories);
    const [apiLoading, setApiLoading] = useState(isProductionMode());
    const [apiError, setApiError] = useState(null);
    const [events, setEvents] = useState(() => isProductionMode() ? [] : getStoredData('greenez_events', initialEvents));
    const [promos, setPromos] = useState(() => isProductionMode() ? [] : getStoredData('greenez_promos', initialPromos));
    const [orders, setOrders] = useState(() => isProductionMode() ? [] : getStoredData('greenez_orders', []));
    const [reviews, setReviews] = useState(() => isProductionMode() ? [] : getStoredData('greenez_reviews', initialReviews));
    const [siteContent, setSiteContent] = useState(() => getStoredData('greenez_content', initialSiteContent));
    const [legalPages, setLegalPages] = useState(() => getStoredData('greenez_legal', initialLegalPages));
    const [cookiesAccepted, setCookiesAccepted] = useState(() => getStoredData('greenez_cookies', null));
    const [isAdmin, setIsAdmin] = useState(() => isProductionMode() ? hasValidAdminToken() : getStoredData('greenez_admin', false));
    const [cartOpen, setCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [shippingOptions, setShippingOptions] = useState(() => isProductionMode() ? [] : getStoredData('greenez_shipping', initialShippingOptions));
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [newsletterSubscribers, setNewsletterSubscribers] = useState(() => isProductionMode() ? [] : getStoredData('greenez_newsletter', initialNewsletterSubscribers));
    const [newsletterPopupShown, setNewsletterPopupShown] = useState(() => getStoredData('greenez_newsletter_shown', false));
    const [actualites, setActualites] = useState(() => isProductionMode() ? [] : getStoredData('greenez_actualites', initialActualites));
    const [favorites, setFavorites] = useState(() => getStoredData('greenez_favorites', []));
    const [users, setUsers] = useState(() => getStoredData('greenez_users', []));
    const [currentUser, setCurrentUser] = useState(() => getStoredData('greenez_current_user', null));
    const [emailLogs, setEmailLogs] = useState(() => getStoredData('greenez_email_logs', []));

    // Chargement des données depuis l'API en mode production
    useEffect(() => {
        if (!isProductionMode()) return;
        const loadApiData = async () => {
            try {
                setApiLoading(true);
                setApiError(null);
                // La liste des codes promo n'est plus publique : elle n'est
                // recuperee que pour le tableau de bord (voir plus bas)
                const [productsData, categoriesData, eventsData, reviewsData, shippingData, actualitesData, settingsData] = await Promise.all([
                    getAPI().products.getAll(false),
                    getAPI().categories.getAll(),
                    getAPI().events.getAll(false),
                    getAPI().reviews.getAll(),
                    getAPI().shipping.getAll(),
                    getAPI().actualites.getAll(false),
                    getAPI().settings.getAll()
                ]);
                setProducts(productsData || []);
                setCategories(categoriesData || []);
                setEvents(eventsData || []);
                setReviews((reviewsData || []).map(normalizeReview));
                setShippingOptions(shippingData || []);
                setActualites(actualitesData || []);
                if (settingsData) {
                    setSiteContent(prev => ({ ...prev, ...stripLegalSettings(settingsData) }));
                    const legalFromApi = parseLegalSettings(settingsData);
                    if (Object.keys(legalFromApi).length > 0) {
                        setLegalPages(prev => ({ ...prev, ...legalFromApi }));
                    }
                }
                // Charger les commandes, promos et abonnes newsletter si admin
                if (isAdmin) {
                    const ordersData = await getAPI().orders.getAll();
                    setOrders((ordersData || []).map(normalizeOrder));
                    try {
                        const promosData = await getAPI().promos.getAll();
                        setPromos((promosData || []).map(normalizePromo));
                    } catch (e) { console.error('Erreur chargement promos:', e); }
                    try {
                        const subscribersData = await getAPI().newsletter.getSubscribers();
                        setNewsletterSubscribers((subscribersData || []).map(normalizeSubscriber));
                    } catch (e) { console.error('Erreur chargement abonnes:', e); }
                }
            } catch (error) {
                console.error('Erreur chargement API:', error);
                setApiError(error.message);
            } finally {
                setApiLoading(false);
            }
        };
        loadApiData();
    }, [isAdmin]);

    // Sauvegarde localStorage (seulement en mode demo)
    useEffect(() => { setStoredData('greenez_cart', cart); }, [cart]);
    useEffect(() => { setStoredData('greenez_favorites', favorites); }, [favorites]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_users', users); }, [users]);
    useEffect(() => { setStoredData('greenez_current_user', currentUser); }, [currentUser]);
    useEffect(() => { setStoredData('greenez_email_logs', emailLogs); }, [emailLogs]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_actualites', actualites); }, [actualites]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_shipping', shippingOptions); }, [shippingOptions]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_newsletter', newsletterSubscribers); }, [newsletterSubscribers]);
    useEffect(() => { setStoredData('greenez_newsletter_shown', newsletterPopupShown); }, [newsletterPopupShown]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_products', products); }, [products]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_events', events); }, [events]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_promos', promos); }, [promos]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_orders', orders); }, [orders]);
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_reviews', reviews); }, [reviews]);
    useEffect(() => { setStoredData('greenez_content', siteContent); }, [siteContent]);
    useEffect(() => { setStoredData('greenez_legal', legalPages); }, [legalPages]);
    useEffect(() => { setStoredData('greenez_cookies', cookiesAccepted); }, [cookiesAccepted]);
    // En production l'etat admin provient du token, pas de ce drapeau
    useEffect(() => { if (!isProductionMode()) setStoredData('greenez_admin', isAdmin); }, [isAdmin]);
    useEffect(() => { if (lastOrder) sessionStorage.setItem('greenez_last_order', JSON.stringify(lastOrder)); }, [lastOrder]);

    // Boutons precedent/suivant du navigateur (History API)
    useEffect(() => {
        const handleNavigation = () => {
            const route = getCurrentRoute();
            if (route.page === 'product' && route.productId) {
                const product = products.find(p => p.id === route.productId);
                if (product) { setSelectedProduct(product); setPageRaw('product'); }
                else { setPageRaw('shop'); }
            } else {
                setPageRaw(route.page);
                if (route.legalKey) setSelectedLegalPage(route.legalKey);
                if (route.resetToken) setResetToken(route.resetToken);
            }
            window.scrollTo(0, 0);
        };
        window.addEventListener('popstate', handleNavigation);
        return () => window.removeEventListener('popstate', handleNavigation);
    }, [products]);

    // Resolve pending product from initial URL
    useEffect(() => {
        if (pendingProductId && products.length > 0) {
            const product = products.find(p => p.id === pendingProductId);
            if (product) { setSelectedProduct(product); setPageRaw('product'); }
            setPendingProductId(null);
        }
    }, [products, pendingProductId]);

    // Dynamic page title
    useEffect(() => {
        const titles = { home: 'Greenez Vous - Creations Textiles Artisanales', shop: 'Boutique | Greenez Vous', events: 'Evenements | Greenez Vous', actualites: 'Actualites | Greenez Vous', about: 'L\'Atelier | Greenez Vous', favorites: 'Mes Favoris | Greenez Vous', auth: 'Connexion | Greenez Vous', account: 'Mon Compte | Greenez Vous', checkout: 'Commander | Greenez Vous', confirmation: 'Commande confirmee | Greenez Vous', tracking: 'Suivi de commande | Greenez Vous', legal: 'Mentions legales | Greenez Vous', admin: 'Administration | Greenez Vous', 'reset-password': 'Mot de passe oublie | Greenez Vous' };
        if (page === 'product' && selectedProduct) { document.title = selectedProduct.name + ' | Greenez Vous'; }
        else { document.title = titles[page] || 'Greenez Vous'; }

        // Chaque page ayant desormais sa propre URL, la balise canonique et la
        // meta description doivent suivre : sans cela, toutes les pages
        // pointeraient vers l'accueil et se feraient dedupliquer.
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', window.location.origin + window.location.pathname);
        }
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && page === 'product' && selectedProduct) {
            const desc = (selectedProduct.description || '').slice(0, 155);
            if (desc) metaDesc.setAttribute('content', desc);
        } else if (metaDesc && metaDesc.dataset.default) {
            metaDesc.setAttribute('content', metaDesc.dataset.default);
        }
    }, [page, selectedProduct]);

    const showNotification = (message, type = 'success') => { setNotification({ message, type }); setTimeout(() => setNotification(null), 3000); };
    const addToCart = (product, qty = 1) => { if (product.stock <= 0) { showNotification('Ce produit est en rupture de stock', 'error'); return; } setCart(prev => { const existing = prev.find(item => item.id === product.id); const currentQty = existing ? existing.quantity : 0; const newQty = Math.min(currentQty + qty, product.stock); if (currentQty >= product.stock) { showNotification('Stock maximum atteint pour ' + product.name, 'error'); return prev; } if (existing) { return prev.map(item => item.id === product.id ? { ...item, quantity: newQty } : item); } return [...prev, { ...product, quantity: Math.min(qty, product.stock) }]; }); showNotification(product.name + ' ajoute au panier !'); };
    const removeFromCart = (productId) => setCart(prev => prev.filter(item => item.id !== productId));
    const updateCartQuantity = (productId, qty) => { if (qty <= 0) { removeFromCart(productId); return; } setCart(prev => prev.map(item => { if (item.id !== productId) return item; const maxQty = item.stock || 999; const cappedQty = Math.min(qty, maxQty); if (qty > maxQty) showNotification('Stock maximum: ' + maxQty, 'error'); return { ...item, quantity: cappedQty }; })); };
    const clearCart = () => setCart([]);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const applyPromoCode = async (code) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().promos.validate(code, cartTotal);
                const promo = normalizePromo(result.promo || result);
                if (!promo || !promo.code) { showNotification('Code promo invalide', 'error'); return false; }
                setAppliedPromo(promo);
                showNotification('Code promo ' + promo.code + ' applique !');
                return true;
            } catch (e) {
                showNotification(e.message || 'Code promo invalide', 'error');
                return false;
            }
        }
        const promo = promos.find(p => p.code.toUpperCase() === code.toUpperCase() && p.active && p.usageCount < p.maxUsage);
        if (promo) {
            if (cartTotal >= promo.minOrder) { setAppliedPromo(promo); showNotification('Code promo ' + promo.code + ' applique !'); return true; }
            showNotification('Commande minimum de ' + promo.minOrder + ' € requise', 'error');
            return false;
        }
        showNotification('Code promo invalide', 'error');
        return false;
    };
    const getDiscountedTotal = () => { if (!appliedPromo) return cartTotal; if (appliedPromo.type === 'percent') return cartTotal * (1 - appliedPromo.discount / 100); return Math.max(0, cartTotal - appliedPromo.discount); };
    useEffect(() => { if (appliedPromo && cartTotal < appliedPromo.minOrder) { setAppliedPromo(null); showNotification('Code promo retire : minimum de commande non atteint', 'error'); } }, [cart]);
    const generateTrackingCode = () => { const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let code = 'GV-'; for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)]; return code; };
    const orderStatuses = [
        { key: 'pending', label: 'En attente', icon: 'clock', color: 'yellow' },
        { key: 'confirmed', label: 'Confirmee', icon: 'check', color: 'blue' },
        { key: 'crafting', label: 'En cours de creation', icon: 'scissors', color: 'purple' },
        { key: 'quality', label: 'Controle qualite', icon: 'eye', color: 'indigo' },
        { key: 'packing', label: 'Emballage', icon: 'package', color: 'cyan' },
        { key: 'shipped', label: 'Expédiée', icon: 'truck', color: 'orange' },
        { key: 'delivered', label: 'Livrée', icon: 'check-circle', color: 'green' }
    ];
    // "Annulee" est volontairement hors de orderStatuses : cette liste sert de
    // progression lineaire dans le suivi client (barre d'avancement), une
    // annulation n'en est pas une etape.
    const cancelledStatus = { key: 'cancelled', label: 'Annulée', icon: 'x', color: 'red' };
    const allOrderStatuses = [...orderStatuses, cancelledStatus];
    const placeOrder = async (customerInfo, paymentInfo = null) => {
        const shippingOption = shippingOptions.find(o => o.id === selectedShipping);
        const shippingCost = selectedShipping ? getShippingPrice(selectedShipping) : 0;
        const subtotal = getDiscountedTotal();
        const finalTotal = subtotal + shippingCost;

        if (isProductionMode()) {
            try {
                const orderData = {
                    items: cart.map(item => ({ product_id: item.id, name: item.name, subtitle: item.subtitle || '', image: item.image || '', quantity: item.quantity, price: item.price })),
                    customer: customerInfo,
                    subtotal,
                    shippingCost,
                    shippingMethod: shippingOption ? shippingOption.name : 'Non specifie',
                    total: finalTotal,
                    promoCode: appliedPromo?.code || null,
                    promoDiscount: appliedPromo ? (appliedPromo.type === 'percent' ? (cartTotal * appliedPromo.discount / 100) : appliedPromo.discount) : 0,
                    paymentMethod: paymentInfo?.method || 'A regler apres confirmation',
                    customerId: currentUser?.id || null
                };
                const result = await getAPI().orders.create(orderData);
                try { const freshProducts = await getAPI().products.getAll(); setProducts(freshProducts); } catch(e) {}
                setLastOrder({ ...result, items: [...cart], customer: customerInfo, subtotal, shippingCost, shippingMethod: shippingOption ? shippingOption.name : 'Non specifie', total: finalTotal, promoUsed: appliedPromo?.code || null });
                clearCart();
                setSelectedShipping(null);
                setAppliedPromo(null);
                setPage('confirmation');
                return result;
            } catch (e) {
                showNotification('Erreur: ' + e.message, 'error');
                return null;
            }
        } else {
            const trackingCode = generateTrackingCode();
            const now = new Date().toISOString();
            const newOrder = {
                id: Date.now(),
                trackingCode,
                items: [...cart],
                customer: customerInfo,
                subtotal,
                shippingCost,
                shippingMethod: shippingOption ? shippingOption.name : 'Non specifie',
                total: finalTotal,
                promoUsed: appliedPromo?.code || null,
                promoDiscount: appliedPromo ? (appliedPromo.type === 'percent' ? (cartTotal * appliedPromo.discount / 100) : appliedPromo.discount) : 0,
                status: 'pending',
                date: now,
                statusHistory: [{ status: 'pending', date: now, note: 'Commande reçue' }],
                messages: [],
                unreadByAdmin: false,
                unreadByCustomer: false,
                paymentMethod: paymentInfo?.method || 'A regler apres confirmation',
                paymentStatus: 'pending',
                invoiceNumber: 'GV-' + new Date().getFullYear() + '-' + String(orders.length + 1).padStart(4, '0')
            };
            setOrders(prev => [...prev, newOrder]);
            setProducts(prev => prev.map(p => { const cartItem = cart.find(item => item.id === p.id); if (cartItem) return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) }; return p; }));
            if (appliedPromo) { setPromos(prev => prev.map(p => p.id === appliedPromo.id ? { ...p, usageCount: p.usageCount + 1 } : p)); }
            sendEmailNotification('order_confirmation', customerInfo.email, { trackingCode, total: finalTotal.toFixed(2) });
            setLastOrder(newOrder);
            clearCart();
            setSelectedShipping(null);
            setAppliedPromo(null);
            setPage('confirmation');
            return newOrder;
        }
    };

    const addProduct = async (product) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().products.create(product);
                setProducts(prev => [...prev, result]);
                showNotification('Produit ajouté !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setProducts(prev => [...prev, { ...product, id: Date.now(), active: true }]);
            showNotification('Produit ajouté !');
        }
    };
    const updateProduct = async (id, updates) => {
        if (isProductionMode()) {
            try {
                await getAPI().products.update(id, updates);
                setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
                showNotification('Produit mis à jour !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
            showNotification('Produit mis à jour !');
        }
    };
    const deleteProduct = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().products.delete(id);
                setProducts(prev => prev.filter(p => p.id !== id));
                showNotification('Produit supprimé !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setProducts(prev => prev.filter(p => p.id !== id));
            showNotification('Produit supprimé !');
        }
    };
    const addEvent = async (event) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().events.create(event);
                setEvents(prev => [...prev, result]);
                showNotification('Événement ajouté !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setEvents(prev => [...prev, { ...event, id: Date.now(), active: true }]);
            showNotification('Événement ajouté !');
        }
    };
    const updateEvent = async (id, updates) => {
        if (isProductionMode()) {
            try {
                await getAPI().events.update(id, updates);
                setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
                showNotification('Événement mis à jour !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
            showNotification('Événement mis à jour !');
        }
    };
    const deleteEvent = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().events.delete(id);
                setEvents(prev => prev.filter(e => e.id !== id));
                showNotification('Événement supprimé !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setEvents(prev => prev.filter(e => e.id !== id));
            showNotification('Événement supprimé !');
        }
    };
    const addPromo = async (promo) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().promos.create(promo);
                setPromos(prev => [...prev, normalizePromo(result)]);
                showNotification('Code promo ajouté !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setPromos(prev => [...prev, { ...promo, id: Date.now(), usageCount: 0, active: true }]);
            showNotification('Code promo ajouté !');
        }
    };
    const updatePromo = async (id, updates) => {
        if (isProductionMode()) {
            try {
                await getAPI().promos.update(id, updates);
                setPromos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
                showNotification('Code promo mis à jour !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setPromos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
            showNotification('Code promo mis à jour !');
        }
    };
    const deletePromo = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().promos.delete(id);
                setPromos(prev => prev.filter(p => p.id !== id));
                showNotification('Code promo supprimé !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setPromos(prev => prev.filter(p => p.id !== id));
            showNotification('Code promo supprimé !');
        }
    };
    const updateOrderStatus = async (id, status, note = '') => {
        const statusLabel = allOrderStatuses.find(s => s.key === status)?.label || status;
        const defaultNote = note || ('Statut: ' + statusLabel);
        if (isProductionMode()) {
            try {
                await getAPI().orders.updateStatus(id, status, defaultNote);
                // L'annulation remet le stock en rayon cote serveur : recharger
                // les produits pour que l'admin voie les quantites a jour
                if (status === 'cancelled') {
                    try { setProducts(await getAPI().products.getAll(false)); } catch (e3) {}
                }
                // Recharger la commande depuis l'API pour obtenir l'historique a jour
                try {
                    const fresh = normalizeOrder(await getAPI().orders.getById(id));
                    setOrders(prev => prev.map(o => o.id === id ? fresh : o));
                } catch (e2) {
                    const now = new Date().toISOString();
                    setOrders(prev => prev.map(o => o.id === id ? { ...o, status, statusHistory: [...(o.statusHistory || []), { status, date: now, note: defaultNote }] } : o));
                }
                showNotification('Statut mis à jour !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            const now = new Date().toISOString();
            const order = orders.find(o => o.id === id);
            setOrders(prev => prev.map(o => {
                if (o.id !== id) return o;
                const newHistory = [...(o.statusHistory || []), { status, date: now, note: defaultNote }];
                return { ...o, status, statusHistory: newHistory };
            }));
            // Annulation : remettre le stock en rayon (equivalent local du
            // traitement fait par l'API en mode production)
            if (order && status === 'cancelled' && order.status !== 'cancelled') {
                setProducts(prev => prev.map(p => {
                    const item = order.items.find(i => i.id === p.id);
                    return item ? { ...p, stock: p.stock + item.quantity } : p;
                }));
            }
            if (order && status === 'shipped') {
                sendEmailNotification('order_shipped', order.customer.email, { trackingCode: order.trackingCode });
            } else if (order && ['confirmed', 'crafting', 'quality', 'packing', 'delivered'].includes(status)) {
                sendEmailNotification('order_status_update', order.customer.email, { trackingCode: order.trackingCode, status: statusLabel });
            }
            showNotification('Statut mis à jour !');
        }
    };
    // Encaissement enregistre a la main par l'atelier tant qu'aucun
    // prestataire de paiement n'est branche
    const updatePaymentStatus = async (id, paymentStatus) => {
        if (isProductionMode()) {
            try {
                await getAPI().orders.updatePaymentStatus(id, paymentStatus);
            } catch (e) {
                showNotification('Erreur: ' + e.message, 'error');
                return;
            }
        }
        setOrders(prev => prev.map(o => o.id === id ? { ...o, paymentStatus } : o));
        showNotification(paymentStatus === 'paid' ? 'Commande marquee comme reglee' : 'Statut de paiement mis à jour');
    };

    const getOrderByTracking = async (trackingCode, email) => {
        if (isProductionMode()) {
            try {
                return normalizeOrder(await getAPI().orders.getByTracking(trackingCode, email));
            } catch (e) {
                console.error('Erreur suivi commande:', e);
                return null;
            }
        } else {
            return orders.find(o => o.trackingCode === trackingCode && o.customer.email.toLowerCase() === email.toLowerCase());
        }
    };
    const addMessageToOrder = (orderId, message, sender, trackingCode = null) => {
        const now = new Date().toISOString();
        if (isProductionMode()) {
            // Persistance cote serveur + mise a jour optimiste du state local
            const order = orders.find(o => o.id === orderId);
            const tc = trackingCode || (sender === 'customer' ? (order && order.trackingCode) : null);
            getAPI().orders.addMessage(orderId, message, tc)
                .catch(e => showNotification('Erreur: ' + e.message, 'error'));
        }
        setOrders(prev => prev.map(o => {
            if (o.id !== orderId) return o;
            const newMessage = { id: Date.now(), sender, content: message, date: now, read: false };
            return {
                ...o,
                messages: [...(o.messages || []), newMessage],
                unreadByAdmin: sender === 'customer' ? true : o.unreadByAdmin,
                unreadByCustomer: sender === 'admin' ? true : o.unreadByCustomer
            };
        }));
        showNotification('Message envoyé !');
    };
    const markMessagesAsRead = (orderId, reader) => {
        if (isProductionMode()) {
            const order = orders.find(o => o.id === orderId);
            const tc = reader === 'customer' ? (order && order.trackingCode) : null;
            getAPI().orders.markMessagesRead(orderId, tc)
                .catch(e => console.error('Erreur marquage messages lus:', e));
        }
        setOrders(prev => prev.map(o => {
            if (o.id !== orderId) return o;
            return {
                ...o,
                unreadByAdmin: reader === 'admin' ? false : o.unreadByAdmin,
                unreadByCustomer: reader === 'customer' ? false : o.unreadByCustomer,
                messages: (o.messages || []).map(m => ({ ...m, read: true }))
            };
        }));
    };
    const getUnreadMessagesCount = () => orders.filter(o => o.unreadByAdmin).length;

    // Reviews functions
    const addReview = async (review) => {
        if (isProductionMode()) {
            try {
                const apiReview = { product_id: review.productId, customer_name: review.author, rating: review.rating, comment: review.comment };
                const result = await getAPI().reviews.create(apiReview);
                setReviews(prev => [...prev, normalizeReview(result)]);
                showNotification('Merci pour votre avis ! Il sera publie apres validation.');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setReviews(prev => [...prev, { ...review, id: Date.now(), date: new Date().toISOString().split('T')[0], approved: false }]);
            showNotification('Merci pour votre avis ! Il sera publie apres validation.');
        }
    };
    const approveReview = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().reviews.approve(id);
                setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
                showNotification('Avis approuve !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
            showNotification('Avis approuve !');
        }
    };
    const deleteReview = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().reviews.delete(id);
                setReviews(prev => prev.filter(r => r.id !== id));
                showNotification('Avis supprimé !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setReviews(prev => prev.filter(r => r.id !== id));
            showNotification('Avis supprimé !');
        }
    };
    const getProductReviews = (productId) => reviews.filter(r => (r.productId === productId || r.product_id === productId) && r.approved);
    const getProductRating = (productId) => { const productReviews = getProductReviews(productId); if (productReviews.length === 0) return 0; return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length; };

    // Site content functions
    const updateSiteContent = async (updates) => {
        setSiteContent(prev => ({ ...prev, ...updates }));
        if (isProductionMode()) {
            try { await getAPI().settings.update(updates); } catch (e) { console.error('Erreur sauvegarde settings:', e); }
        }
        showNotification('Contenu mis à jour !');
    };
    const updateLegalPage = async (pageKey, updates) => {
        const updated = { ...(legalPages[pageKey] || {}), ...updates };
        setLegalPages(prev => ({ ...prev, [pageKey]: updated }));
        if (isProductionMode()) {
            try {
                await getAPI().settings.update({ [legalSettingKey(pageKey)]: JSON.stringify(updated) });
            } catch (e) {
                showNotification('Erreur de sauvegarde : ' + e.message, 'error');
                return;
            }
        }
        showNotification('Page légale mise à jour !');
    };

    // Shipping functions
    const getAvailableShipping = () => {
        return shippingOptions.filter(opt => {
            if (!opt.active) return false;
            if (opt.maxOrder && cartTotal > parseFloat(opt.maxOrder)) return false;
            return true;
        });
    };
    const getShippingPrice = (shippingId) => {
        const option = shippingOptions.find(o => o.id === shippingId);
        if (!option) return 0;
        if (option.freeAbove && cartTotal >= parseFloat(option.freeAbove)) return 0;
        return parseFloat(option.price) || 0;
    };
    const getFinalTotal = () => {
        const subtotal = getDiscountedTotal();
        const shipping = selectedShipping ? getShippingPrice(selectedShipping) : 0;
        return subtotal + shipping;
    };
    const updateShippingOption = async (id, updates) => {
        if (isProductionMode()) {
            try {
                await getAPI().shipping.update(id, updates);
                setShippingOptions(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
                showNotification('Option de livraison mise à jour !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setShippingOptions(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
            showNotification('Option de livraison mise à jour !');
        }
    };
    const addShippingOption = async (option) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().shipping.create(option);
                setShippingOptions(prev => [...prev, result]);
                showNotification('Option de livraison ajoutée !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setShippingOptions(prev => [...prev, { ...option, id: Date.now(), active: true }]);
            showNotification('Option de livraison ajoutée !');
        }
    };
    const deleteShippingOption = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().shipping.delete(id);
                setShippingOptions(prev => prev.filter(o => o.id !== id));
                showNotification('Option de livraison supprimee !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setShippingOptions(prev => prev.filter(o => o.id !== id));
            showNotification('Option de livraison supprimee !');
        }
    };

    // Newsletter functions
    const subscribeToNewsletter = async (email, firstName = '') => {
        if (newsletterSubscribers.find(s => s.email.toLowerCase() === email.toLowerCase())) {
            showNotification('Cet email est déjà inscrit !', 'error');
            return false;
        }
        if (isProductionMode()) {
            try {
                const result = await getAPI().newsletter.subscribe(email, firstName);
                setNewsletterSubscribers(prev => [...prev, normalizeSubscriber(result)]);
                showNotification('Merci pour votre inscription !');
                return true;
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); return false; }
        } else {
            setNewsletterSubscribers(prev => [...prev, { id: Date.now(), email, firstName, date: new Date().toISOString(), active: true }]);
            sendEmailNotification('newsletter_welcome', email, { firstName: firstName || 'cher(e) client(e)' });
            showNotification('Merci pour votre inscription !');
            return true;
        }
    };
    const unsubscribeNewsletter = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().newsletter.unsubscribe(id);
                setNewsletterSubscribers(prev => prev.filter(s => s.id !== id));
                showNotification('Desabonne !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setNewsletterSubscribers(prev => prev.filter(s => s.id !== id));
            showNotification('Desabonne !');
        }
    };

    // Actualites functions
    const addActualite = async (actualite) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().actualites.create(actualite);
                setActualites(prev => [...prev, result]);
                showNotification('Actualité ajoutée !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setActualites(prev => [...prev, { ...actualite, id: Date.now(), date: new Date().toISOString().split('T')[0], active: true }]);
            showNotification('Actualité ajoutée !');
        }
    };
    const updateActualite = async (id, updates) => {
        if (isProductionMode()) {
            try {
                await getAPI().actualites.update(id, updates);
                setActualites(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
                showNotification('Actualité mise à jour !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setActualites(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
            showNotification('Actualité mise à jour !');
        }
    };
    const deleteActualite = async (id) => {
        if (isProductionMode()) {
            try {
                await getAPI().actualites.delete(id);
                setActualites(prev => prev.filter(a => a.id !== id));
                showNotification('Actualité supprimée !');
            } catch (e) { showNotification('Erreur: ' + e.message, 'error'); }
        } else {
            setActualites(prev => prev.filter(a => a.id !== id));
            showNotification('Actualité supprimée !');
        }
    };
    const getActiveActualites = () => actualites.filter(a => a.active).sort((a, b) => new Date(b.date) - new Date(a.date));

    // Favorites functions
    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            if (prev.includes(productId)) {
                showNotification('Retire des favoris');
                return prev.filter(id => id !== productId);
            } else {
                showNotification('Ajoute aux favoris !');
                return [...prev, productId];
            }
        });
    };
    const isFavorite = (productId) => favorites.includes(productId);
    const getFavoriteProducts = () => products.filter(p => favorites.includes(p.id) && p.active);
    const favoritesCount = favorites.length;

    // Email notification functions (simulation)
    const sendEmailNotification = (type, recipient, data = {}) => {
        const templates = {
            order_confirmation: {
                subject: 'Confirmation de votre commande #{trackingCode}',
                preview: 'Merci pour votre commande ! Votre numéro de suivi : {trackingCode}'
            },
            order_shipped: {
                subject: 'Votre commande #{trackingCode} a été expédiée',
                preview: 'Bonne nouvelle ! Votre colis est en route.'
            },
            newsletter_welcome: {
                subject: 'Bienvenue dans la newsletter Greenez Vous !',
                preview: 'Merci de votre inscription. Profitez de -10% avec le code BIENVENUE10'
            },
            account_created: {
                subject: 'Bienvenue chez Greenez Vous !',
                preview: 'Votre compte a été créé avec succès. Découvrez nos créations artisanales.'
            },
            order_status_update: {
                subject: 'Mise à jour de votre commande #{trackingCode}',
                preview: 'Votre commande est maintenant : {status}'
            }
        };
        const template = templates[type];
        if (!template) return;
        const formatText = (text) => {
            let result = text;
            Object.keys(data).forEach(key => {
                result = result.replace(new RegExp(`{${key}}`, 'g'), data[key]);
            });
            return result;
        };
        const emailLog = {
            id: Date.now(),
            type,
            recipient,
            subject: formatText(template.subject),
            preview: formatText(template.preview),
            data,
            sentAt: new Date().toISOString(),
            status: 'sent'
        };
        setEmailLogs(prev => [emailLog, ...prev]);
    };
    const getEmailLogs = () => emailLogs;
    const clearEmailLogs = () => setEmailLogs([]);

    // User account functions
    const registerUser = async (userData) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().auth.registerCustomer(userData);
                setCurrentUser(result.user);
                showNotification('Compte créé avec succès !');
                return true;
            } catch (e) {
                showNotification(e.message || 'Erreur lors de l\'inscription', 'error');
                return false;
            }
        } else {
            const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
            if (existingUser) {
                showNotification('Un compte existe déjà avec cet email', 'error');
                return false;
            }
            const newUser = {
                id: Date.now(),
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone || '',
                address: userData.address || '',
                city: userData.city || '',
                postalCode: userData.postalCode || '',
                country: 'France',
                createdAt: new Date().toISOString()
            };
            setUsers(prev => [...prev, newUser]);
            setCurrentUser({ ...newUser, password: undefined });
            sendEmailNotification('account_created', newUser.email, { firstName: newUser.firstName });
            showNotification('Compte créé avec succès !');
            return true;
        }
    };
    const loginUser = async (email, password) => {
        if (isProductionMode()) {
            try {
                const result = await getAPI().auth.loginCustomer(email, password);
                setCurrentUser(result.user);
                showNotification('Connexion reussie !');
                return true;
            } catch (e) {
                showNotification(e.message || 'Email ou mot de passe incorrect', 'error');
                return false;
            }
        } else {
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
            if (user) {
                setCurrentUser({ ...user, password: undefined });
                showNotification('Connexion reussie !');
                return true;
            }
            showNotification('Email ou mot de passe incorrect', 'error');
            return false;
        }
    };
    const logoutUser = () => {
        if (isProductionMode()) {
            getAPI().auth.logoutCustomer();
        }
        setCurrentUser(null);
        showNotification('Deconnexion reussie');
    };
    const updateUserProfile = async (updates) => {
        if (!currentUser) return false;
        if (isProductionMode()) {
            try {
                await getAPI().customers.updateProfile(updates);
                setCurrentUser(prev => ({ ...prev, ...updates }));
                showNotification('Profil mis à jour !');
                return true;
            } catch (e) {
                showNotification('Erreur: ' + e.message, 'error');
                return false;
            }
        } else {
            const updatedUser = { ...currentUser, ...updates };
            setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
            setCurrentUser(updatedUser);
            showNotification('Profil mis à jour !');
            return true;
        }
    };
    const getUserOrders = async () => {
        if (!currentUser) return [];
        if (isProductionMode()) {
            try {
                const data = await getAPI().customers.getOrders();
                return (data || []).map(normalizeOrder);
            } catch (e) {
                console.error('Erreur chargement commandes:', e);
                return [];
            }
        } else {
            return orders.filter(o => o.customer?.email?.toLowerCase() === currentUser.email.toLowerCase());
        }
    };
    const isLoggedIn = !!currentUser;

    const value = { page, setPage, selectedProduct, setSelectedProduct, selectedCategory, setSelectedCategory, selectedLegalPage, setSelectedLegalPage, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, cartTotal, cartCount, products, categories, events, promos, orders, reviews, siteContent, legalPages, cookiesAccepted, setCookiesAccepted, isAdmin, setIsAdmin, cartOpen, setCartOpen, searchOpen, setSearchOpen, notification, setNotification, showNotification, appliedPromo, applyPromoCode, getDiscountedTotal, placeOrder, addProduct, updateProduct, deleteProduct, addEvent, updateEvent, deleteEvent, addPromo, updatePromo, deletePromo, updateOrderStatus, updatePaymentStatus, orderStatuses, cancelledStatus, allOrderStatuses, getOrderByTracking, addMessageToOrder, markMessagesAsRead, getUnreadMessagesCount, addReview, approveReview, deleteReview, getProductReviews, getProductRating, updateSiteContent, updateLegalPage, shippingOptions, selectedShipping, setSelectedShipping, getAvailableShipping, getShippingPrice, getFinalTotal, updateShippingOption, addShippingOption, deleteShippingOption, newsletterSubscribers, newsletterPopupShown, setNewsletterPopupShown, subscribeToNewsletter, unsubscribeNewsletter, actualites, addActualite, updateActualite, deleteActualite, getActiveActualites, favorites, toggleFavorite, isFavorite, getFavoriteProducts, favoritesCount, currentUser, isLoggedIn, registerUser, loginUser, logoutUser, updateUserProfile, getUserOrders, users, emailLogs, getEmailLogs, clearEmailLogs, apiLoading, apiError, lastOrder, navigateToProduct, resetToken };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
const useApp = () => useContext(AppContext);

// COMPOSANTS UI
const Notification = () => { const { notification, setNotification } = useApp(); if (!notification) return null; return (<div role="alert" aria-live="polite" className={"fixed top-20 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg animate-fadeIn text-white font-medium flex items-center gap-3 " + (notification.type === 'error' ? 'bg-red-500' : 'bg-emerald-600')}><span>{notification.message}</span><button onClick={() => setNotification(null)} className="ml-2 opacity-70 hover:opacity-100 transition" aria-label="Fermer"><XIcon size={16} /></button></div>); };
const Modal = ({ isOpen, onClose, title, children }) => { useEffect(() => { if (!isOpen) return; const handleEsc = (e) => { if (e.key === 'Escape') onClose(); }; document.addEventListener('keydown', handleEsc); return () => document.removeEventListener('keydown', handleEsc); }, [isOpen, onClose]); if (!isOpen) return null; return (<div className="fixed inset-0 z-[60] modal-backdrop flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}><div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn" onClick={e => e.stopPropagation()}><div className="p-6 border-b border-stone-100 flex justify-between items-center"><h3 className="font-editorial text-2xl text-emerald-950">{title}</h3><button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition" aria-label="Fermer"><XIcon size={20} /></button></div><div className="p-6">{children}</div></div></div>); };
const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => { const base = "font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2"; const variants = { primary: "bg-emerald-900 text-white hover:bg-emerald-800", secondary: "border border-emerald-900/20 text-emerald-900 hover:bg-emerald-50", danger: "bg-red-500 text-white hover:bg-red-600", ghost: "text-stone-600 hover:bg-stone-100" }; const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4" }; return <button className={base + " " + variants[variant] + " " + sizes[size] + " " + className} {...props}>{children}</button>; };
const Input = ({ label, id, ...props }) => { const inputId = id || (label ? 'input-' + label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined); return (<div className="mb-4">{label && <label htmlFor={inputId} className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}<input id={inputId} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" {...props} /></div>); };
const Select = ({ label, options, id, ...props }) => { const selectId = id || (label ? 'select-' + label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined); return (<div className="mb-4">{label && <label htmlFor={selectId} className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}<select id={selectId} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white" {...props}>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select></div>); };
const Textarea = ({ label, id, ...props }) => { const textareaId = id || (label ? 'textarea-' + label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined); return (<div className="mb-4">{label && <label htmlFor={textareaId} className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}<textarea id={textareaId} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none" rows={4} {...props} /></div>); };

// BANDEAU COOKIES RGPD
const CookieBanner = () => {
    const { cookiesAccepted, setCookiesAccepted, setPage, setSelectedLegalPage } = useApp();
    if (cookiesAccepted !== null) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white shadow-2xl border-t border-stone-200 p-4 md:p-6 animate-fadeIn" role="dialog" aria-label="Bandeau cookies">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="text-stone-800 font-medium mb-1">Ce site utilise des cookies</p>
                    <p className="text-stone-600 text-sm">Nous utilisons des cookies pour ameliorer votre experience et analyser le trafic. En continuant, vous acceptez notre <button onClick={() => { setSelectedLegalPage('confidentialite'); setPage('legal', { legalKey: 'confidentialite' }); }} className="text-emerald-700 underline">politique de confidentialite</button>.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setCookiesAccepted(false)} className="px-6 py-2 border border-stone-300 rounded-full text-sm font-medium text-stone-600 hover:bg-stone-100 transition">Refuser</button>
                    <button onClick={() => setCookiesAccepted(true)} className="px-6 py-2 bg-emerald-900 text-white rounded-full text-sm font-medium hover:bg-emerald-800 transition">Accepter</button>
                </div>
            </div>
        </div>
    );
};

// POPUP NEWSLETTER
const NewsletterPopup = () => {
    const { newsletterPopupShown, setNewsletterPopupShown, subscribeToNewsletter, cookiesAccepted, page } = useApp();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!newsletterPopupShown && cookiesAccepted !== null && page !== 'checkout' && page !== 'confirmation') {
            const timer = setTimeout(() => setShowPopup(true), 15000); // Show after 15s
            return () => clearTimeout(timer);
        }
        // Ne jamais afficher la popup pendant le checkout ou la confirmation
        if (page === 'checkout' || page === 'confirmation') setShowPopup(false);
    }, [newsletterPopupShown, cookiesAccepted, page]);

    const handleClose = () => {
        setShowPopup(false);
        setNewsletterPopupShown(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await subscribeToNewsletter(email, firstName)) {
            setSubmitted(true);
            setTimeout(() => { handleClose(); }, 2000);
        }
    };

    if (!showPopup || newsletterPopupShown || page === 'checkout' || page === 'confirmation') return null;

    return (
        <div className="fixed inset-0 z-[90] modal-backdrop flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Inscription newsletter" onClick={handleClose}>
            <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-fadeIn" onClick={e => e.stopPropagation()}>
                <div className="relative h-32 bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center">
                    <div className="text-white text-center">
                        <Mail size={40} className="mx-auto mb-2" />
                        <p className="text-emerald-100 text-sm">Newsletter</p>
                    </div>
                    <button onClick={handleClose} className="absolute top-4 right-4 text-white/80 hover:text-white" aria-label="Fermer"><XIcon size={24} /></button>
                </div>
                <div className="p-6">
                    {submitted ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-emerald-600" /></div>
                            <h3 className="font-editorial text-2xl text-emerald-950 mb-2">Merci !</h3>
                            <p className="text-stone-600">Vous recevrez bientot nos actualites.</p>
                        </div>
                    ) : (
                        <>
                            <h3 className="font-editorial text-2xl text-emerald-950 text-center mb-2">Restez connecte(e)</h3>
                            <p className="text-stone-600 text-center text-sm mb-6">Recevez en avant-premiere nos nouveautes, conseils zéro déchet et offres exclusives.</p>
                            <div className="bg-emerald-50 rounded-xl p-3 mb-6 text-center">
                                <p className="text-emerald-800 font-medium text-sm">-10% sur votre prochaine commande</p>
                                <p className="text-emerald-600 text-xs">en vous inscrivant maintenant</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <Input label="Prénom" placeholder="Votre prénom" autoComplete="given-name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                <Input label="Email *" type="email" required placeholder="votre@email.fr" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
                                <Button type="submit" className="w-full">S'inscrire <ArrowRight size={16} /></Button>
                            </form>
                            <p className="text-xs text-stone-400 text-center mt-4">Desabonnement possible a tout moment. Pas de spam.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// BARRE DE RECHERCHE
const SearchModal = () => {
    const { searchOpen, setSearchOpen, products, setSelectedProduct, setPage, navigateToProduct } = useApp();
    const [query, setQuery] = useState('');
    const results = query.length >= 2 ? products.filter(p => p.active && (p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle?.toLowerCase().includes(query.toLowerCase()) || p.description?.toLowerCase().includes(query.toLowerCase()))).slice(0, 6) : [];
    useEffect(() => { if (searchOpen) setQuery(''); }, [searchOpen]);
    useEffect(() => { if (!searchOpen) return; const handleEsc = (e) => { if (e.key === 'Escape') setSearchOpen(false); }; document.addEventListener('keydown', handleEsc); return () => document.removeEventListener('keydown', handleEsc); }, [searchOpen]);
    if (!searchOpen) return null;
    return (
        <div className="fixed inset-0 z-[75] modal-backdrop flex items-start justify-center pt-24" role="dialog" aria-modal="true" aria-label="Recherche" onClick={() => setSearchOpen(false)}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden animate-fadeIn" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-stone-100">
                    <div className="relative"><Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" /><input type="search" placeholder="Rechercher un produit..." value={query} onChange={e => setQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 text-lg focus:outline-none" autoFocus aria-label="Rechercher un produit" /></div>
                </div>
                {query.length >= 2 && (
                    <div className="max-h-96 overflow-y-auto">
                        {results.length === 0 ? (
                            <div className="p-8 text-center text-stone-500">Aucun produit trouve pour "{query}"</div>
                        ) : (
                            <div className="p-2">{results.map(product => (
                                <button key={product.id} onClick={() => { navigateToProduct(product); setSearchOpen(false); }} className="w-full flex items-center gap-4 p-3 hover:bg-stone-50 rounded-xl transition text-left">
                                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover" loading="lazy" />
                                    <div className="flex-1"><h4 className="font-medium text-stone-900">{product.name}</h4><p className="text-sm text-stone-500">{product.subtitle}</p></div>
                                    <span className="font-medium text-emerald-900">{parseFloat(product.price).toFixed(2)} €</span>
                                </button>
                            ))}</div>
                        )}
                    </div>
                )}
                {query.length < 2 && <div className="p-8 text-center text-stone-400">Tapez au moins 2 caracteres pour rechercher</div>}
            </div>
        </div>
    );
};

// PAGE LEGALE
const LegalPage = () => {
    const { selectedLegalPage, legalPages, setPage } = useApp();
    const pageData = legalPages[selectedLegalPage];
    useEffect(() => { if (!pageData) setPage('home'); }, [pageData]);
    if (!pageData) return null;
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4">
                <button onClick={() => setPage('home')} className="flex items-center gap-2 text-stone-600 hover:text-emerald-800 transition mb-8"><ArrowLeft size={20} /> Retour</button>
                <h1 className="font-editorial text-4xl md:text-5xl text-emerald-950 mb-8">{pageData.title}</h1>
                <div className="prose prose-stone prose-headings:font-editorial prose-headings:text-emerald-950 prose-p:text-stone-600 prose-a:text-emerald-700 max-w-none" dangerouslySetInnerHTML={{ __html: pageData.content }} />
            </div>
            <Footer />
        </div>
    );
};

// PAGE SUIVI COMMANDE
const TrackingPage = () => {
    const { setPage, getOrderByTracking, orderStatuses, allOrderStatuses, addMessageToOrder, markMessagesAsRead, orders } = useApp();
    const [trackingCode, setTrackingCode] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    // Refresh order data when orders change
    useEffect(() => {
        if (order) {
            const updated = orders.find(o => o.id === order.id);
            if (updated) setOrder(updated);
        }
    }, [orders]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        const found = await getOrderByTracking(trackingCode.toUpperCase(), email);
        if (found) {
            setOrder(found);
            setSearched(true);
        } else {
            setOrder(null);
            setSearched(true);
            setError('Commande introuvable. Vérifiez votre code de suivi et votre email.');
        }
    };

    const getStatusIcon = (statusKey) => {
        const icons = {
            pending: <Clock size={20} />,
            confirmed: <Check size={20} />,
            crafting: <Scissors size={20} />,
            quality: <Eye size={20} />,
            packing: <Package size={20} />,
            shipped: <Truck size={20} />,
            delivered: <CheckCircle size={20} />
        };
        return icons[statusKey] || <Clock size={20} />;
    };

    const getStatusColor = (statusKey) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
            crafting: 'bg-purple-100 text-purple-800 border-purple-300',
            quality: 'bg-indigo-100 text-indigo-800 border-indigo-300',
            packing: 'bg-cyan-100 text-cyan-800 border-cyan-300',
            shipped: 'bg-orange-100 text-orange-800 border-orange-300',
            delivered: 'bg-green-100 text-green-800 border-green-300'
        };
        return colors[statusKey] || 'bg-stone-100 text-stone-800 border-stone-300';
    };

    const currentStatusIndex = order ? orderStatuses.findIndex(s => s.key === order.status) : -1;

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4">
                <button onClick={() => setPage('home')} className="flex items-center gap-2 text-stone-600 hover:text-emerald-800 transition mb-8"><ArrowLeft size={20} /> Retour</button>
                <div className="text-center mb-12">
                    <h1 className="font-editorial text-4xl md:text-5xl text-emerald-950 mb-4">Suivi de commande</h1>
                    <p className="text-stone-600">Suivez l'avancement de votre creation artisanale</p>
                </div>

                {!order && (
                    <div className="max-w-md mx-auto">
                        <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-lg p-8">
                            <Input label="Code de suivi" required value={trackingCode} onChange={e => setTrackingCode(e.target.value.toUpperCase())} placeholder="GV-XXXXXXXX" autoComplete="off" />
                            <Input label="Email de commande" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr" autoComplete="email" />
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <Button type="submit" className="w-full"><Search size={18} /> Rechercher ma commande</Button>
                        </form>
                    </div>
                )}

                {order && (
                    <div className="animate-fadeIn">
                        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-stone-100">
                                <div>
                                    <p className="text-sm text-stone-500">Commande</p>
                                    <p className="font-mono font-bold text-xl text-emerald-900">{order.trackingCode}</p>
                                    <p className="text-sm text-stone-500 mt-1">Passee le {new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                                <div className={"px-4 py-2 rounded-full border-2 font-medium flex items-center gap-2 " + (order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : getStatusColor(order.status))}>
                                    {order.status === 'cancelled' ? <XIcon size={20} /> : getStatusIcon(order.status)}
                                    {allOrderStatuses.find(s => s.key === order.status)?.label || order.status}
                                </div>
                            </div>

                            {/* Une commande annulee ne suit plus la progression de fabrication */}
                            {order.status === 'cancelled' ? (
                            <div className="mb-8 bg-red-50 border border-red-200 rounded-2xl p-5">
                                <p className="text-red-900 font-medium mb-1">Cette commande a été annulée</p>
                                <p className="text-red-700 text-sm">Si vous pensez qu'il s'agit d'une erreur, écrivez-nous via la messagerie ci-dessous.</p>
                            </div>
                            ) : (
                            /* Barre de progression */
                            <div className="mb-8">
                                <div className="flex justify-between mb-2">
                                    {orderStatuses.map((status, index) => (
                                        <div key={status.key} className={"flex flex-col items-center flex-1 " + (index <= currentStatusIndex ? 'text-emerald-700' : 'text-stone-300')}>
                                            <div className={"w-8 h-8 rounded-full flex items-center justify-center mb-1 " + (index <= currentStatusIndex ? 'bg-emerald-100' : 'bg-stone-100')}>
                                                {getStatusIcon(status.key)}
                                            </div>
                                            <span className="text-xs text-center hidden md:block">{status.label}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500" style={{ width: ((currentStatusIndex + 1) / orderStatuses.length * 100) + '%' }}></div>
                                </div>
                            </div>
                            )}

                            {/* Timeline */}
                            <div>
                                <h3 className="font-editorial text-xl text-emerald-950 mb-4">Historique</h3>
                                <div className="space-y-4">
                                    {(order.statusHistory || []).slice().reverse().map((entry, index) => {
                                        const statusInfo = allOrderStatuses.find(s => s.key === entry.status);
                                        return (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className={"w-10 h-10 rounded-full flex items-center justify-center " + (index === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500')}>
                                                        {getStatusIcon(entry.status)}
                                                    </div>
                                                    {index < (order.statusHistory?.length || 0) - 1 && <div className="w-px h-full bg-stone-200 my-1"></div>}
                                                </div>
                                                <div className="flex-1 pb-4">
                                                    <p className="font-medium text-stone-900">{statusInfo?.label || entry.status}</p>
                                                    <p className="text-sm text-stone-600 mt-1">{entry.note}</p>
                                                    <p className="text-xs text-stone-400 mt-1">{new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Resume commande */}
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <h3 className="font-editorial text-xl text-emerald-950 mb-4">Articles commandes</h3>
                            <div className="space-y-4">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" loading="lazy" />
                                        <div className="flex-1">
                                            <p className="font-medium text-stone-900">{item.name}</p>
                                            <p className="text-sm text-stone-500">x{item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-emerald-900">{(parseFloat(item.price) * item.quantity).toFixed(2)} €</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-stone-100 mt-6 pt-6 flex justify-between items-center">
                                <span className="text-stone-600">Total</span>
                                <span className="text-2xl font-bold text-emerald-900">{parseFloat(order.total).toFixed(2)} €</span>
                            </div>
                        </div>

                        {/* Messagerie */}
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <h3 className="font-editorial text-xl text-emerald-950 mb-4 flex items-center gap-2">
                                <MessageSquare size={24} className="text-emerald-700" />
                                Discuter avec l'artisan
                                {order.unreadByCustomer && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>}
                            </h3>
                            <p className="text-sm text-stone-500 mb-4">Posez vos questions sur votre commande, demandez des precisions sur la creation...</p>

                            {/* Messages */}
                            <div className="bg-stone-50 rounded-2xl p-4 mb-4 max-h-80 overflow-y-auto">
                                {(!order.messages || order.messages.length === 0) ? (
                                    <p className="text-center text-stone-400 py-8">Aucun message pour le moment.<br/>Envoyez un message pour demarrer la conversation.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {order.messages.map((msg, idx) => (
                                            <div key={msg.id || idx} className={"flex " + (msg.sender === 'customer' ? 'justify-end' : 'justify-start')}>
                                                <div className={"max-w-[80%] rounded-2xl px-4 py-3 " + (msg.sender === 'customer' ? 'bg-emerald-600 text-white' : 'bg-white border border-stone-200')}>
                                                    <p className={"text-xs mb-1 " + (msg.sender === 'customer' ? 'text-emerald-100' : 'text-emerald-700 font-medium')}>
                                                        {msg.sender === 'customer' ? 'Vous' : 'Greenez Vous'}
                                                    </p>
                                                    <p className={msg.sender === 'customer' ? 'text-white' : 'text-stone-700'}>{msg.content}</p>
                                                    <p className={"text-xs mt-1 " + (msg.sender === 'customer' ? 'text-emerald-200' : 'text-stone-400')}>
                                                        {new Date(msg.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Formulaire message */}
                            <form onSubmit={(e) => { e.preventDefault(); if (newMessage.trim()) { const content = newMessage.trim(); addMessageToOrder(order.id, content, 'customer', order.trackingCode); setOrder(prev => prev ? { ...prev, messages: [...(prev.messages || []), { id: Date.now(), sender: 'customer', content, date: new Date().toISOString(), read: false }] } : prev); setNewMessage(''); } }} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    placeholder="Votre message..."
                                    className="flex-1 px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                                <Button type="submit" disabled={!newMessage.trim()}>
                                    <MoveRight size={18} />
                                </Button>
                            </form>
                        </div>

                        <div className="text-center mt-8">
                            <Button variant="secondary" onClick={() => { setOrder(null); setSearched(false); setTrackingCode(''); setEmail(''); setNewMessage(''); }}>
                                <Search size={18} /> Rechercher une autre commande
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

// NAVIGATION
const Navigation = () => {
    const { page, setPage, cartCount, setCartOpen, isAdmin, setSearchOpen, favoritesCount, isLoggedIn, currentUser } = useApp();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => { const handleScroll = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

    const handleUserClick = () => {
        if (isAdmin) setPage('admin');
        else if (isLoggedIn) setPage('account');
        else setPage('auth');
    };
    const getUserTitle = () => {
        if (isAdmin) return 'Admin';
        if (isLoggedIn) return currentUser?.firstName || 'Mon compte';
        return 'Connexion';
    };

    return (
        <nav className={"fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 py-4 " + (scrolled ? 'py-2' : 'py-6')} role="navigation" aria-label="Navigation principale">
            <div className={"max-w-7xl mx-auto rounded-full transition-all duration-500 " + (scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3 px-6' : 'bg-transparent py-2 px-0')}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { setPage('home'); setIsMenuOpen(false); }}>
                        <div className="w-8 h-8 bg-emerald-900 text-emerald-50 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition duration-300"><Leaf size={14} /></div>
                        <span className="font-editorial font-bold text-xl text-emerald-950 tracking-tight">Greenez Vous</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => setPage('shop')} className={"text-sm font-medium transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-emerald-800 after:transition-all " + (page === 'shop' ? 'text-emerald-800 after:w-full' : 'text-stone-600 hover:text-emerald-800 after:w-0 hover:after:w-full')}>Boutique</button>
                        <button onClick={() => setPage('events')} className={"text-sm font-medium transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-emerald-800 after:transition-all " + (page === 'events' ? 'text-emerald-800 after:w-full' : 'text-stone-600 hover:text-emerald-800 after:w-0 hover:after:w-full')}>Événements</button>
                        <button onClick={() => setPage('actualites')} className={"text-sm font-medium transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-emerald-800 after:transition-all " + (page === 'actualites' ? 'text-emerald-800 after:w-full' : 'text-stone-600 hover:text-emerald-800 after:w-0 hover:after:w-full')}>Actualités</button>
                        <button onClick={() => setPage('about')} className={"text-sm font-medium transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-emerald-800 after:transition-all " + (page === 'about' ? 'text-emerald-800 after:w-full' : 'text-stone-600 hover:text-emerald-800 after:w-0 hover:after:w-full')}>L'Atelier</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-emerald-50 rounded-full transition" title="Rechercher"><Search size={20} /></button>
                        <button onClick={() => setPage('favorites')} className="p-2 hover:bg-emerald-50 rounded-full transition relative" title="Favoris"><Heart size={20} />{favoritesCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{favoritesCount}</span>}</button>
                        <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 text-sm font-medium hover:text-emerald-800 transition relative"><ShoppingBag size={20} /><span className="hidden sm:inline">Panier</span>{cartCount > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">{cartCount}</span>}</button>
                        <button onClick={handleUserClick} className="p-2 hover:bg-emerald-50 rounded-full transition" title={getUserTitle()}><User size={20} className={isAdmin ? 'text-emerald-600' : isLoggedIn ? 'text-blue-600' : ''} /></button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-stone-800" aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={isMenuOpen}>{isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}</button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (<div className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl p-6 md:hidden z-50 animate-fadeIn"><nav className="flex flex-col gap-4 text-center"><button onClick={() => { setPage('shop'); setIsMenuOpen(false); }} className="text-xl font-editorial text-stone-800 py-2 border-b border-stone-100">Boutique</button><button onClick={() => { setPage('events'); setIsMenuOpen(false); }} className="text-xl font-editorial text-stone-800 py-2 border-b border-stone-100">Événements</button><button onClick={() => { setPage('actualites'); setIsMenuOpen(false); }} className="text-xl font-editorial text-stone-800 py-2 border-b border-stone-100">Actualités</button><button onClick={() => { setPage('about'); setIsMenuOpen(false); }} className="text-xl font-editorial text-stone-800 py-2 border-b border-stone-100">L'Atelier</button><button onClick={() => { handleUserClick(); setIsMenuOpen(false); }} className="text-xl font-editorial text-stone-800 py-2">{isLoggedIn ? 'Mon Compte' : 'Connexion'}</button></nav></div>)}
        </nav>
    );
};

// PANIER
const CartSidebar = () => {
    const { cartOpen, setCartOpen, cart, cartTotal, removeFromCart, updateCartQuantity, setPage, appliedPromo, applyPromoCode, getDiscountedTotal } = useApp();
    const [promoInput, setPromoInput] = useState('');
    useEffect(() => { if (!cartOpen) return; const handleEsc = (e) => { if (e.key === 'Escape') setCartOpen(false); }; document.addEventListener('keydown', handleEsc); return () => document.removeEventListener('keydown', handleEsc); }, [cartOpen]);
    if (!cartOpen) return null;
    return (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Panier">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl animate-slideIn flex flex-col">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center"><h2 className="font-editorial text-2xl text-emerald-950">Votre Panier</h2><button onClick={() => setCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition" aria-label="Fermer le panier"><XIcon size={20} /></button></div>
                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (<div className="text-center py-12"><ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Votre panier est vide</p><Button variant="secondary" className="mt-4" onClick={() => { setCartOpen(false); setPage('shop'); }}>Decouvrir la boutique</Button></div>) : (<div className="space-y-4">{cart.map(item => (<div key={item.id} className="flex gap-4 p-4 bg-stone-50 rounded-2xl"><img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" /><div className="flex-1"><h4 className="font-medium text-stone-900">{item.name}</h4>{item.subtitle && <p className="text-xs text-stone-400">{item.subtitle}</p>}<p className="text-sm text-stone-500">{parseFloat(item.price).toFixed(2)} €</p><div className="flex items-center gap-2 mt-2"><button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-stone-200 rounded" aria-label="Diminuer la quantite"><Minus size={16} /></button><span className="w-8 text-center" aria-label={"Quantite: " + item.quantity}>{item.quantity}</span><button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-stone-200 rounded" aria-label="Augmenter la quantite"><Plus size={16} /></button></div></div><button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full h-fit" aria-label="Retirer du panier"><Trash size={18} /></button></div>))}</div>)}
                </div>
                {cart.length > 0 && (<div className="p-6 border-t border-stone-100 bg-stone-50"><div className="flex gap-2 mb-4"><input type="text" placeholder="Code promo" value={promoInput} onChange={e => setPromoInput(e.target.value)} className="flex-1 px-4 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" /><Button size="sm" onClick={() => { applyPromoCode(promoInput); setPromoInput(''); }}>Appliquer</Button></div>{appliedPromo && (<div className="flex items-center gap-2 text-emerald-600 text-sm mb-4"><Check size={16} /><span>Code {appliedPromo.code} applique (-{appliedPromo.discount}{appliedPromo.type === 'percent' ? '%' : ' €'})</span></div>)}<div className="flex justify-between items-center mb-2"><span className="text-stone-600">Sous-total</span><span className="font-medium">{cartTotal.toFixed(2)} €</span></div>{appliedPromo && (<div className="flex justify-between items-center mb-2 text-emerald-600"><span>Réduction</span><span>-{(cartTotal - getDiscountedTotal()).toFixed(2)} €</span></div>)}<div className="flex justify-between items-center mb-4 text-lg font-bold"><span>Total</span><span className="text-emerald-900">{getDiscountedTotal().toFixed(2)} €</span></div><Button className="w-full" onClick={() => { setCartOpen(false); setPage('checkout'); }}>Commander <ArrowRight size={16} /></Button></div>)}
            </div>
        </div>
    );
};

// CARTE PRODUIT
const StockBadge = ({ stock }) => {
    if (stock <= 0) return <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Rupture de stock</span>;
    if (stock <= 5) return <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Plus que {stock} en stock</span>;
    return null;
};

const ProductCard = ({ product }) => {
    const { addToCart, setPage, setSelectedProduct, toggleFavorite, isFavorite, navigateToProduct } = useApp();
    const favorite = isFavorite(product.id);
    const outOfStock = product.stock <= 0;
    return (
        <div className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-stone-200 cursor-pointer" onClick={() => { navigateToProduct(product); }}>
                {product.tag && <span className="absolute top-3 left-3 bg-emerald-900 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wide">{product.tag}</span>}
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className={"absolute top-3 right-3 z-10 p-2 rounded-full transition shadow-sm " + (favorite ? 'bg-red-500 text-white' : 'bg-white/80 text-stone-400 hover:text-red-500 hover:bg-white')} aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}><Heart size={18} className={favorite ? 'fill-white' : ''} /></button>
                <img src={product.image} alt={product.name} className={"w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" + (outOfStock ? ' opacity-60' : '')} />
                {outOfStock && <div className="absolute inset-0 flex items-center justify-center"><span className="bg-white/90 backdrop-blur text-red-600 font-medium px-4 py-2 rounded-full text-sm shadow">Rupture de stock</span></div>}
                {!outOfStock && <div className="absolute bottom-4 left-0 right-0 px-4 md:opacity-0 md:group-hover:opacity-100 transition duration-300 md:translate-y-4 md:group-hover:translate-y-0"><button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="w-full bg-white text-stone-900 py-3 rounded-xl font-medium shadow-lg hover:bg-emerald-50 transition">Ajouter</button></div>}
            </div>
            <div className="flex justify-between items-start"><div><h3 className="font-editorial text-xl text-stone-900 group-hover:text-emerald-800 transition cursor-pointer" onClick={() => { navigateToProduct(product); }}>{product.name}</h3><p className="text-sm text-stone-500">{product.subtitle}</p><StockBadge stock={product.stock} /></div><span className="font-medium text-emerald-900">{parseFloat(product.price).toFixed(2)} €</span></div>
        </div>
    );
};

// FOOTER
const Footer = () => {
    const { setPage, setSelectedLegalPage, siteContent, subscribeToNewsletter } = useApp();
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
    const goToLegal = (pageKey) => { setSelectedLegalPage(pageKey); setPage('legal', { legalKey: pageKey }); };
    const handleNewsletterSubmit = async (e) => { e.preventDefault(); if (await subscribeToNewsletter(newsletterEmail)) { setNewsletterSubmitted(true); setNewsletterEmail(''); } };
    return (
        <footer className="bg-emerald-950 text-emerald-50/60 pt-20 pb-10 mt-1">
            <div className="max-w-7xl mx-auto px-8">
                <div className="bg-emerald-900/50 rounded-2xl p-8 mb-16"><div className="flex flex-col md:flex-row items-center justify-between gap-6"><div className="text-center md:text-left"><h4 className="text-white font-editorial text-2xl mb-2">Restez informes</h4><p className="text-emerald-50/70">Recevez nos nouveautes et événements en avant-premiere</p></div>{newsletterSubmitted ? (<div className="flex items-center gap-2 text-emerald-400"><Check size={20} /> Merci pour votre inscription !</div>) : (<form onSubmit={handleNewsletterSubmit} className="flex gap-3 w-full md:w-auto"><input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="Votre email" required autoComplete="email" aria-label="Votre email pour la newsletter" className="px-4 py-3 rounded-full bg-emerald-950/50 border border-emerald-50/20 text-white placeholder-emerald-50/40 focus:outline-none focus:border-emerald-400 w-full md:w-64" /><button type="submit" className="px-6 py-3 bg-emerald-50 text-emerald-900 rounded-full font-medium hover:bg-white transition whitespace-nowrap">S'inscrire</button></form>)}</div></div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div className="max-w-md"><div className="flex items-center gap-3 mb-6 text-white"><Leaf className="fill-white" size={24}/><span className="font-editorial text-3xl">Greenez Vous</span></div><p className="text-lg font-light leading-relaxed mb-8">{siteContent.footerText}</p><div className="flex gap-4"><a href={siteContent.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-emerald-50/20 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-900 transition"><Instagram size={18}/></a><a href={siteContent.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-emerald-50/20 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-900 transition"><Facebook size={18}/></a><a href={"mailto:" + siteContent.contactEmail} aria-label="Nous contacter par email" className="w-10 h-10 rounded-full border border-emerald-50/20 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-900 transition"><Mail size={18}/></a></div></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
                        <div><h5 className="text-white font-medium mb-6">Explorer</h5><ul className="space-y-4 text-sm"><li><button onClick={() => setPage('shop')} className="hover:text-white transition">Boutique</button></li><li><button onClick={() => setPage('events')} className="hover:text-white transition">Événements</button></li><li><button onClick={() => setPage('about')} className="hover:text-white transition">L'Atelier</button></li></ul></div>
                        <div><h5 className="text-white font-medium mb-6">Aide</h5><ul className="space-y-4 text-sm"><li><button onClick={() => setPage('tracking')} className="hover:text-white transition">Suivi de commande</button></li><li><button onClick={() => goToLegal('cgv')} className="hover:text-white transition">Livraison & Retours</button></li><li><a href={"mailto:" + siteContent.contactEmail} className="hover:text-white transition">Contact</a></li></ul></div>
                        <div><h5 className="text-white font-medium mb-6">Legal</h5><ul className="space-y-4 text-sm"><li><button onClick={() => goToLegal('cgv')} className="hover:text-white transition">CGV</button></li><li><button onClick={() => goToLegal('mentions')} className="hover:text-white transition">Mentions légales</button></li><li><button onClick={() => goToLegal('confidentialite')} className="hover:text-white transition">Confidentialité</button></li></ul></div>
                    </div>
                </div>
                <div className="border-t border-emerald-50/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"><p>© 2026 Greenez Vous. Tous droits reserves.</p><p className="mt-2 md:mt-0">Fait avec amour a Lyon.</p></div>
            </div>
        </footer>
    );
};

// PAGE ACCUEIL
const HomePage = () => {
    const { setPage, products, events, siteContent, categories, setSelectedCategory } = useApp();
    const featuredProducts = products.filter(p => p.active && p.featured).length > 0 ? products.filter(p => p.active && p.featured).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) : products.filter(p => p.active).slice(0, 4);
    const upcomingEvent = events.find(e => e.active && new Date(e.date) >= new Date());
    return (
        <div className="min-h-screen">
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 relative z-10">
                        <span className="inline-block py-1 px-3 border border-emerald-900/20 rounded-full text-emerald-900 text-xs font-bold uppercase tracking-widest mb-6">{siteContent.heroBadge}</span>
                        <h1 className="font-editorial text-6xl sm:text-7xl lg:text-8xl text-emerald-950 leading-[0.9] mb-8"><span className="absolute w-px h-px overflow-hidden" style={{clip: 'rect(0,0,0,0)'}}>Greenez Vous - Creations textiles artisanales zero dechet - </span>{siteContent.heroTitle} <br/><span className="italic font-light text-emerald-800">{siteContent.heroTitleItalic}</span></h1>
                        <p className="text-lg text-stone-600 max-w-md mb-10 leading-relaxed">{siteContent.heroSubtitle}</p>
                        <div className="flex flex-wrap gap-4"><Button onClick={() => setPage('shop')}>Explorer la boutique <ArrowRight size={16} /></Button><Button variant="secondary" onClick={() => setPage('about')}>Notre manifeste</Button></div>
                    </div>
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[4/5] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/10">
                            <img src={siteContent.heroImage} alt="Greenez Vous - Creations textiles artisanales zero dechet" className="w-full h-full object-cover hover:scale-105 transition duration-1000 ease-out" {...{'fetchpriority': 'high'}} />
                            <div className="absolute bottom-6 right-6 bg-[#FDFCF8]/90 backdrop-blur p-4 rounded-2xl shadow-lg max-w-[150px]"><div className="flex gap-1 mb-1">{[...Array(5)].map((_,i) => <Star key={i} size={12} className="fill-emerald-900 text-emerald-900"/>)}</div><p className="text-xs text-stone-600 font-medium">"{siteContent.heroQuote}"</p></div>
                        </div>
                        <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border border-emerald-900/10 rounded-t-[10rem] rounded-b-[2rem]"></div>
                    </div>
                </div>
            </header>
            <div className="bg-emerald-900 text-[#FDFCF8] py-4 overflow-hidden whitespace-nowrap"><div className="flex animate-marquee">{[...Array(6)].map((_, i) => (<div key={i} className="flex items-center gap-8 mx-4"><span className="text-lg font-medium tracking-wide">{siteContent.marquee1}</span><Star size={12} className="text-emerald-400" /><span className="text-lg font-medium tracking-wide">{siteContent.marquee2}</span><Star size={12} className="text-emerald-400" /><span className="text-lg font-medium tracking-wide">{siteContent.marquee3}</span><Star size={12} className="text-emerald-400" /></div>))}</div></div>
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12"><h2 className="font-editorial text-4xl md:text-5xl text-emerald-950">L'Atelier</h2><button onClick={() => setPage('shop')} className="hidden md:flex items-center gap-2 text-stone-500 hover:text-emerald-900 transition mt-4 md:mt-0 pb-1 border-b border-transparent hover:border-emerald-900">Tout voir <MoveRight size={18}/></button></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    <div className="md:col-span-2 relative group overflow-hidden rounded-3xl cursor-pointer" onClick={() => { const cat = categories.find(c => c.name === siteContent.categoryTitle1); setSelectedCategory(cat ? cat.id : 1); setPage('shop'); }}><img src={siteContent.categoryImage1} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" alt={siteContent.categoryTitle1} /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8"><div className="text-white"><h3 className="font-editorial text-3xl mb-1">{siteContent.categoryTitle1}</h3><p className="opacity-0 group-hover:opacity-100 transition text-sm">{siteContent.categoryDesc1}</p></div></div></div>
                    <div className="relative group overflow-hidden rounded-3xl cursor-pointer" onClick={() => { const cat = categories.find(c => c.name === siteContent.categoryTitle2); setSelectedCategory(cat ? cat.id : 2); setPage('shop'); }}><img src={siteContent.categoryImage2} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" alt={siteContent.categoryTitle2} /><div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition flex items-center justify-center"><span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full font-editorial text-lg text-emerald-950 shadow-sm">{siteContent.categoryTitle2}</span></div></div>
                    <div className="relative group overflow-hidden rounded-3xl cursor-pointer" onClick={() => { const cat = categories.find(c => c.name === siteContent.categoryTitle3); setSelectedCategory(cat ? cat.id : 3); setPage('shop'); }}><img src={siteContent.categoryImage3} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" alt={siteContent.categoryTitle3} /><div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition flex items-center justify-center"><span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full font-editorial text-lg text-emerald-950 shadow-sm">{siteContent.categoryTitle3}</span></div></div>
                    <div className="md:col-span-2 bg-emerald-50 rounded-3xl p-8 flex flex-col justify-center items-start text-emerald-900 relative overflow-hidden group"><div className="absolute -right-8 -bottom-8 text-emerald-100 group-hover:rotate-12 transition duration-500"><Leaf size={120} /></div><h3 className="font-editorial text-3xl mb-4 relative z-10">{siteContent.customTitle}</h3><p className="mb-6 max-w-md relative z-10">{siteContent.customText}</p><Button className="relative z-10" onClick={() => window.location.href = 'mailto:' + siteContent.contactEmail}>Contacter l'atelier</Button></div>
                </div>
            </section>
            <section className="bg-stone-100 py-24 rounded-t-[3rem]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16"><p className="text-emerald-700 font-medium tracking-widest uppercase text-xs mb-3">{siteContent.featuredLabel}</p><h2 className="font-editorial text-4xl md:text-5xl text-stone-900">{siteContent.featuredTitle}</h2></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">{featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}</div>
                    <div className="text-center mt-12"><Button variant="secondary" onClick={() => setPage('shop')}>Voir tous les produits <ArrowRight size={16} /></Button></div>
                </div>
            </section>
            {upcomingEvent && (<section className="bg-emerald-900 text-white py-16 relative overflow-hidden"><div className="absolute inset-0 opacity-10"><div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div></div><div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8"><div><p className="text-emerald-300 text-sm font-medium mb-2 flex items-center gap-2"><Calendar size={16} /> Prochain événement</p><h3 className="font-editorial text-3xl mb-2">{upcomingEvent.title}</h3><p className="text-emerald-200/80 flex items-center gap-2"><MapPin size={16} /> {upcomingEvent.location} - {new Date(upcomingEvent.date).toLocaleDateString('fr-FR')}</p></div><Button variant="secondary" className="bg-white text-emerald-900 border-white hover:bg-emerald-50" onClick={() => setPage('events')}>Voir les événements</Button></div></section>)}
            <section className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100"><div className="px-4 py-4"><h4 className="font-editorial text-2xl text-emerald-950 mb-3">100% Fait Main</h4><p className="text-stone-500 text-sm leading-relaxed">Pas d'usine, juste mes dix doigts et une machine a coudre dans mon atelier en France.</p></div><div className="px-4 py-4"><h4 className="font-editorial text-2xl text-emerald-950 mb-3">Matieres Nobles</h4><p className="text-stone-500 text-sm leading-relaxed">Selection rigoureuse de lin lave, coton bio certifie GOTS et tissus upcycles.</p></div><div className="px-4 py-4"><h4 className="font-editorial text-2xl text-emerald-950 mb-3">Envoi Soigne</h4><p className="text-stone-500 text-sm leading-relaxed">Emballages sans plastique, cartes ensemencees et petite touche parfumee.</p></div></div></div></section>
            <Footer />
        </div>
    );
};

// PAGE BOUTIQUE
const ShopPage = () => {
    const { products, categories, selectedCategory, setSelectedCategory } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState('all');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const filteredProducts = products.filter(p => {
        if (!p.active) return false;
        if (selectedCategory && (p.categoryId || p.category_id) != selectedCategory) return false;
        if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (inStockOnly && p.stock <= 0) return false;
        if (priceRange === '0-5' && (p.price < 0 || p.price > 5)) return false;
        if (priceRange === '5-10' && (p.price < 5 || p.price > 10)) return false;
        if (priceRange === '10-15' && (p.price < 10 || p.price > 15)) return false;
        if (priceRange === '15+' && p.price < 15) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'newest') return b.id - a.id;
        return 0;
    });
    const activeFiltersCount = (priceRange !== 'all' ? 1 : 0) + (inStockOnly ? 1 : 0);
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12"><h1 className="font-editorial text-5xl md:text-6xl text-emerald-950 mb-4">La Boutique</h1><p className="text-stone-600 max-w-xl mx-auto">Découvrez nos créations artisanales, faites main en France avec des matieres naturelles et responsables.</p></div>
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                    <div className="flex flex-wrap gap-2"><button onClick={() => setSelectedCategory(null)} className={"px-4 py-2 rounded-full text-sm font-medium transition " + (!selectedCategory ? 'bg-emerald-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>Tous</button>{categories.map(cat => (<button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={"px-4 py-2 rounded-full text-sm font-medium transition " + (selectedCategory === cat.id ? 'bg-emerald-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>{cat.name}</button>))}</div>
                    <div className="flex gap-3 items-center">
                        <div className="relative"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" /><input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48" /></div>
                        <button onClick={() => setShowFilters(!showFilters)} className={"flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition " + (showFilters || activeFiltersCount > 0 ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50')}><Filter size={16} /> Filtres {activeFiltersCount > 0 && <span className="bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFiltersCount}</span>}</button>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 border border-stone-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"><option value="default">Trier par</option><option value="newest">Nouveautes</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix decroissant</option><option value="name">Nom A-Z</option></select>
                    </div>
                </div>
                {showFilters && (
                    <div className="bg-stone-50 rounded-2xl p-6 mb-8 animate-fadeIn">
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <h4 className="text-sm font-medium text-stone-700 mb-3">Prix</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[{v: 'all', l: 'Tous'}, {v: '0-5', l: '0-5 €'}, {v: '5-10', l: '5-10 €'}, {v: '10-15', l: '10-15 €'}, {v: '15+', l: '15+ €'}].map(opt => (
                                        <button key={opt.v} onClick={() => setPriceRange(opt.v)} className={"px-3 py-1.5 rounded-full text-sm transition " + (priceRange === opt.v ? 'bg-emerald-800 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-emerald-300')}>{opt.l}</button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-stone-700 mb-3">Disponibilité</h4>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500" />
                                    <span className="text-sm text-stone-600">En stock uniquement</span>
                                </label>
                            </div>
                            {activeFiltersCount > 0 && (
                                <button onClick={() => { setPriceRange('all'); setInStockOnly(false); }} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 ml-auto"><XIcon size={14} /> Effacer les filtres</button>
                            )}
                        </div>
                    </div>
                )}
                <p className="text-sm text-stone-500 mb-6">{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouve{filteredProducts.length > 1 ? 's' : ''}</p>
                {filteredProducts.length === 0 ? (<div className="text-center py-24"><Package size={64} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500 text-lg">Aucun produit trouve</p></div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">{filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}</div>)}
            </div>
            <Footer />
        </div>
    );
};

// PAGE PRODUIT
const ProductPage = () => {
    const { selectedProduct, addToCart, setPage, products, categories, getProductReviews, getProductRating, addReview } = useApp();
    const [quantity, setQuantity] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ author: '', rating: 5, comment: '' });
    useEffect(() => {
        if (!selectedProduct) return;
        const schema = { '@context': 'https://schema.org', '@type': 'Product', name: selectedProduct.name, description: selectedProduct.description || selectedProduct.subtitle || '', image: selectedProduct.image, brand: { '@type': 'Brand', name: 'Greenez Vous' }, offers: { '@type': 'Offer', price: selectedProduct.price, priceCurrency: 'EUR', availability: selectedProduct.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', seller: { '@type': 'Organization', name: 'Greenez Vous' } } };
        const script = document.createElement('script'); script.type = 'application/ld+json'; script.id = 'product-schema'; script.textContent = JSON.stringify(schema);
        const existing = document.getElementById('product-schema'); if (existing) existing.remove();
        document.head.appendChild(script);
        return () => { const el = document.getElementById('product-schema'); if (el) el.remove(); };
    }, [selectedProduct]);
    useEffect(() => { if (!selectedProduct) setPage('shop'); }, [selectedProduct]);
    if (!selectedProduct) return null;
    const category = categories.find(c => c.id === (selectedProduct.categoryId || selectedProduct.category_id));
    const relatedProducts = products.filter(p => (p.categoryId || p.category_id) === (selectedProduct.categoryId || selectedProduct.category_id) && p.id !== selectedProduct.id && p.active).slice(0, 4);
    const productReviews = getProductReviews(selectedProduct.id);
    const productRating = getProductRating(selectedProduct.id);
    const handleReviewSubmit = (e) => { e.preventDefault(); addReview({ ...reviewForm, productId: selectedProduct.id }); setReviewForm({ author: '', rating: 5, comment: '' }); setShowReviewForm(false); };
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-8"><button onClick={() => setPage('home')} className="hover:text-emerald-800 transition">Accueil</button><span>/</span><button onClick={() => setPage('shop')} className="hover:text-emerald-800 transition">Boutique</button><span>/</span><span className="text-stone-800">{selectedProduct.name}</span></div>
                <div className="grid lg:grid-cols-2 gap-12 mb-24">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-stone-100"><img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" loading="lazy" /></div>
                    <div className="flex flex-col justify-center">
                        {selectedProduct.tag && <span className="inline-block w-fit bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">{selectedProduct.tag}</span>}
                        <h1 className="font-editorial text-4xl md:text-5xl text-emerald-950 mb-2">{selectedProduct.name}</h1>
                        <p className="text-stone-500 mb-2">{selectedProduct.subtitle}</p>
                        {productReviews.length > 0 && (<div className="flex items-center gap-2 mb-4"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.round(productRating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />)}</div><span className="text-sm text-stone-500">({productReviews.length} avis)</span></div>)}
                        {category && <p className="text-sm text-emerald-700 mb-6">Catégorie: {category.name}</p>}
                        <p className="text-3xl font-bold text-emerald-900 mb-4">{parseFloat(selectedProduct.price).toFixed(2)} €</p>
                        {selectedProduct.stock <= 0 ? (
                            <div className="flex items-center gap-2 mb-6 bg-red-50 text-red-700 px-4 py-3 rounded-xl"><AlertTriangle size={18} /> <span className="font-medium">Rupture de stock</span></div>
                        ) : selectedProduct.stock <= 5 ? (
                            <div className="flex items-center gap-2 mb-6 bg-amber-50 text-amber-700 px-4 py-3 rounded-xl"><AlertTriangle size={18} /> <span className="font-medium">Plus que {selectedProduct.stock} en stock - Faites vite !</span></div>
                        ) : (
                            <div className="flex items-center gap-2 mb-6 text-emerald-700 text-sm"><Check size={16} /> En stock</div>
                        )}
                        <p className="text-stone-600 leading-relaxed mb-8">{selectedProduct.description}</p>
                        {selectedProduct.stock > 0 && (<><div className="flex items-center gap-4 mb-6"><span className="text-sm font-medium text-stone-700">Quantité:</span><div className="flex items-center border border-stone-200 rounded-full"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-stone-100 rounded-l-full transition"><Minus size={16} /></button><span className="w-12 text-center font-medium">{quantity}</span><button onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))} className="p-3 hover:bg-stone-100 rounded-r-full transition"><Plus size={16} /></button></div></div>
                        <div className="flex flex-wrap gap-4"><Button size="lg" onClick={() => addToCart(selectedProduct, quantity)}><ShoppingBag size={20} /> Ajouter au panier</Button></div></>)}
                        <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-2 gap-4"><div className="flex items-center gap-3 text-sm text-stone-600"><Truck size={20} className="text-emerald-700" /><span>Livraison soignee</span></div><div className="flex items-center gap-3 text-sm text-stone-600"><Leaf size={20} className="text-emerald-700" /><span>Fait main en France</span></div></div>
                    </div>
                </div>
                {/* SECTION AVIS CLIENTS */}
                <div className="mb-24">
                    <div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Avis clients</h2><Button variant="secondary" onClick={() => setShowReviewForm(!showReviewForm)}>{showReviewForm ? 'Annuler' : 'Donner mon avis'}</Button></div>
                    {showReviewForm && (<div className="bg-stone-50 rounded-2xl p-6 mb-8"><form onSubmit={handleReviewSubmit}><Input label="Votre prénom" required value={reviewForm.author} onChange={e => setReviewForm({...reviewForm, author: e.target.value})} placeholder="Marie" /><div className="mb-4"><label className="block text-sm font-medium text-stone-700 mb-2">Note</label><div className="flex gap-2">{[1,2,3,4,5].map(n => (<button key={n} type="button" onClick={() => setReviewForm({...reviewForm, rating: n})} className="p-1"><Star size={28} className={n <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} /></button>))}</div></div><Textarea label="Votre avis" required value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})} placeholder="Partagez votre experience avec ce produit..." /><Button type="submit">Envoyer mon avis</Button></form></div>)}
                    {productReviews.length === 0 ? (<div className="text-center py-12 bg-stone-50 rounded-2xl"><Star size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Aucun avis pour ce produit</p><p className="text-sm text-stone-400 mt-2">Soyez le premier a donner votre avis !</p></div>) : (<div className="space-y-4">{productReviews.map(review => (<div key={review.id} className="bg-white border border-stone-100 rounded-2xl p-6"><div className="flex justify-between items-start mb-3"><div><p className="font-medium text-stone-900">{review.author}</p><p className="text-sm text-stone-500">{new Date(review.date).toLocaleDateString('fr-FR')}</p></div><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />)}</div></div><p className="text-stone-600">{review.comment}</p></div>))}</div>)}
                </div>
                {relatedProducts.length > 0 && (<div><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Vous aimerez aussi</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">{relatedProducts.map(product => <ProductCard key={product.id} product={product} />)}</div></div>)}
            </div>
            <Footer />
        </div>
    );
};

// PAGE EVENEMENTS
const EventsPage = () => {
    const { events } = useApp();
    const activeEvents = events.filter(e => e.active).sort((a, b) => new Date(a.date) - new Date(b.date));
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16"><h1 className="font-editorial text-5xl md:text-6xl text-emerald-950 mb-4">Événements</h1><p className="text-stone-600 max-w-xl mx-auto">Retrouvez-nous lors de nos prochains marches et ateliers.</p></div>
                {activeEvents.length === 0 ? (<div className="text-center py-24"><Calendar size={64} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500 text-lg">Aucun événement a venir</p></div>) : (<div className="space-y-6">{activeEvents.map(event => (<div key={event.id} className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition"><div className="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><div className="flex items-center gap-2 text-emerald-700 text-sm font-medium mb-2"><Calendar size={16} />{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div><h3 className="font-editorial text-2xl text-emerald-950 mb-2">{event.title}</h3><p className="text-stone-600 mb-3">{event.description}</p><div className="flex items-center gap-2 text-stone-500 text-sm"><MapPin size={16} />{event.location}</div></div><div className="flex-shrink-0"><div className="text-center bg-emerald-50 rounded-2xl p-4 min-w-[100px]"><div className="text-3xl font-bold text-emerald-900">{new Date(event.date).getDate()}</div><div className="text-sm text-emerald-700 uppercase">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}</div></div></div></div></div>))}</div>)}
            </div>
            <Footer />
        </div>
    );
};

// PAGE ACTUALITES
const ActualitesPage = () => {
    const { getActiveActualites } = useApp();
    const actualites = getActiveActualites();
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="font-editorial text-5xl md:text-6xl text-emerald-950 mb-4">Actualités</h1>
                    <p className="text-stone-600 max-w-xl mx-auto">Suivez-nous sur Instagram pour découvrir les coulisses de l'atelier et nos dernières créations.</p>
                    <a href="https://instagram.com/Greenez_vous" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition">
                        <Instagram size={20} /> Suivez-nous sur Instagram
                    </a>
                </div>
                {actualites.length === 0 ? (
                    <div className="text-center py-24">
                        <Instagram size={64} className="mx-auto text-stone-300 mb-4" />
                        <p className="text-stone-500 text-lg">Aucune actualité pour le moment</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {actualites.map(actu => (
                            <div key={actu.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg transition group">
                                <div className="aspect-square overflow-hidden">
                                    <img src={actu.image} alt={actu.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-stone-500 text-sm mb-2">
                                        <Calendar size={14} />
                                        {new Date(actu.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    <h3 className="font-editorial text-xl text-emerald-950 mb-2">{actu.title}</h3>
                                    <p className="text-stone-600 text-sm mb-4 line-clamp-3">{actu.description}</p>
                                    {actu.instagramUrl && (
                                        <a href={actu.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 text-sm font-medium transition">
                                            <Instagram size={16} /> Voir sur Instagram
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

// PAGE REINITIALISATION MOT DE PASSE
const ResetPasswordPage = () => {
    const { setPage, resetToken, showNotification } = useApp();
    const [step, setStep] = useState(resetToken ? 'reset' : 'request');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isProductionMode()) {
                await getAPI().auth.requestPasswordReset(email);
            }
            setDone(true);
        } catch (err) {
            showNotification(err.message || 'Erreur', 'error');
        }
        setLoading(false);
    };

    const handleReset = async (e) => {
        e.preventDefault();
        if (password.length < 6) { showNotification('Minimum 6 caracteres', 'error'); return; }
        if (password !== confirmPassword) { showNotification('Les mots de passe ne correspondent pas', 'error'); return; }
        setLoading(true);
        try {
            if (isProductionMode()) {
                await getAPI().auth.resetPassword(resetToken, password);
            }
            showNotification('Mot de passe reinitialise !');
            setTimeout(() => setPage('auth'), 2000);
        } catch (err) {
            showNotification(err.message || 'Lien invalide ou expire', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="max-w-md mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Mail size={32} className="text-emerald-700" /></div>
                    <h1 className="font-editorial text-3xl text-emerald-950 mb-2">{step === 'reset' ? 'Nouveau mot de passe' : 'Mot de passe oublie'}</h1>
                    <p className="text-stone-600">{step === 'reset' ? 'Choisissez votre nouveau mot de passe' : 'Entrez votre email pour recevoir un lien de reinitialisation'}</p>
                </div>
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    {done ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-emerald-600" /></div>
                            <h3 className="font-editorial text-xl text-emerald-950 mb-2">Email envoye !</h3>
                            <p className="text-stone-600 text-sm">Si un compte existe avec cet email, vous recevrez un lien de reinitialisation.</p>
                            <Button className="mt-6" onClick={() => setPage('auth')}>Retour a la connexion</Button>
                        </div>
                    ) : step === 'request' ? (
                        <form onSubmit={handleRequest}>
                            <Input type="email" label="Email" required autoComplete="email" placeholder="votre@email.fr" value={email} onChange={e => setEmail(e.target.value)} />
                            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Envoi...' : 'Envoyer le lien'}</Button>
                        </form>
                    ) : (
                        <form onSubmit={handleReset}>
                            <Input type="password" label="Nouveau mot de passe" required autoComplete="new-password" placeholder="Minimum 6 caracteres" value={password} onChange={e => setPassword(e.target.value)} />
                            <Input type="password" label="Confirmer le mot de passe" required autoComplete="new-password" placeholder="Retapez le mot de passe" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Reinitialisation...' : 'Reinitialiser'}</Button>
                        </form>
                    )}
                </div>
                <button onClick={() => setPage('auth')} className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition mx-auto mt-8"><ArrowLeft size={18} /> Retour a la connexion</button>
            </div>
            <Footer />
        </div>
    );
};

// PAGE AUTHENTIFICATION
const AuthPage = () => {
    const { setPage, registerUser, loginUser, isLoggedIn } = useApp();
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '', phone: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => { if (isLoggedIn) setPage('account'); }, [isLoggedIn]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
        if (!formData.password) newErrors.password = 'Mot de passe requis';
        else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caracteres';
        if (mode === 'register') {
            if (!formData.firstName) newErrors.firstName = 'Prénom requis';
            if (!formData.lastName) newErrors.lastName = 'Nom requis';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (mode === 'login') {
            if (await loginUser(formData.email, formData.password)) setPage('account');
        } else {
            if (await registerUser(formData)) setPage('account');
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="max-w-md mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} className="text-emerald-700" />
                    </div>
                    <h1 className="font-editorial text-3xl text-emerald-950 mb-2">
                        {mode === 'login' ? 'Connexion' : 'Creer un compte'}
                    </h1>
                    <p className="text-stone-600">
                        {mode === 'login' ? 'Connectez-vous pour acceder a votre compte' : 'Rejoignez la communaute Greenez Vous'}
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <div className="flex gap-2 mb-6">
                        <button onClick={() => setMode('login')} className={"flex-1 py-2 rounded-xl font-medium transition " + (mode === 'login' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>Connexion</button>
                        <button onClick={() => setMode('register')} className={"flex-1 py-2 rounded-xl font-medium transition " + (mode === 'register' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>Inscription</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Input label="Prénom" autoComplete="given-name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <Input label="Nom" autoComplete="family-name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                        )}
                        <div>
                            <Input type="email" label="Email" autoComplete="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <Input type="password" label="Mot de passe" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        {mode === 'register' && (
                            <>
                                <div>
                                    <Input type="password" label="Confirmer le mot de passe" autoComplete="new-password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                </div>
                                <Input type="tel" label="Téléphone (optionnel)" autoComplete="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </>
                        )}
                        <Button type="submit" className="w-full mt-6">
                            {mode === 'login' ? 'Se connecter' : 'Creer mon compte'}
                        </Button>
                    </form>

                    {mode === 'login' && (
                        <div className="text-center mt-6 space-y-2">
                            <p className="text-sm text-stone-500">Pas encore de compte ? <button onClick={() => setMode('register')} className="text-emerald-700 font-medium hover:underline">Inscrivez-vous</button></p>
                            <p className="text-sm"><button onClick={() => setPage('reset-password')} className="text-stone-400 hover:text-emerald-700 transition">Mot de passe oublie ?</button></p>
                        </div>
                    )}
                </div>

                <button onClick={() => setPage('shop')} className="flex items-center gap-2 text-stone-600 hover:text-emerald-700 transition mx-auto mt-8">
                    <ArrowLeft size={18} /> Retour a la boutique
                </button>
                <button onClick={() => setPage('login')} className="flex items-center gap-2 text-stone-300 hover:text-stone-400 transition mx-auto mt-4 text-xs opacity-30 hover:opacity-60">
                    Admin
                </button>
            </div>
            <Footer />
        </div>
    );
};

// PAGE MON COMPTE
const AccountPage = () => {
    const { currentUser, isLoggedIn, logoutUser, updateUserProfile, getUserOrders, setPage, orderStatuses, allOrderStatuses, orders } = useApp();
    const [activeTab, setActiveTab] = useState('profile');
    const [editing, setEditing] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => { if (!isLoggedIn) setPage('auth'); }, [isLoggedIn]);
    useEffect(() => { if (currentUser) setProfileData({ ...currentUser }); }, [currentUser]);
    useEffect(() => { if (currentUser) { const loadOrders = async () => { const result = await getUserOrders(); setUserOrders(result || []); }; loadOrders(); } }, [currentUser, orders]);

    if (!currentUser) return null;

    const handleSaveProfile = () => {
        updateUserProfile({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phone: profileData.phone,
            address: profileData.address,
            city: profileData.city,
            postalCode: profileData.postalCode
        });
        setEditing(false);
    };

    // Repli sur le statut lui-meme plutot que sur orderStatuses[0] : une
    // commande annulee s'affichait sinon comme "En attente"
    const getStatusInfo = (status) => allOrderStatuses.find(s => s.key === status) || { key: status, label: status, color: 'stone' };
    const statusClasses = { yellow: 'bg-yellow-100 text-yellow-700', blue: 'bg-blue-100 text-blue-700', purple: 'bg-purple-100 text-purple-700', indigo: 'bg-indigo-100 text-indigo-700', cyan: 'bg-cyan-100 text-cyan-700', orange: 'bg-orange-100 text-orange-700', green: 'bg-green-100 text-green-700', red: 'bg-red-100 text-red-700' };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-editorial text-3xl text-emerald-950">Bonjour, {currentUser.firstName} !</h1>
                        <p className="text-stone-600">Gérez votre compte et consultez vos commandes</p>
                    </div>
                    <button onClick={() => { logoutUser(); setPage('home'); }} className="flex items-center gap-2 text-red-600 hover:text-red-700 transition">
                        <LogOut size={18} /> Deconnexion
                    </button>
                </div>

                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    <button onClick={() => setActiveTab('profile')} className={"px-6 py-3 rounded-xl font-medium transition whitespace-nowrap " + (activeTab === 'profile' ? 'bg-emerald-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-50')}>
                        <User size={18} className="inline mr-2" /> Mon Profil
                    </button>
                    <button onClick={() => setActiveTab('orders')} className={"px-6 py-3 rounded-xl font-medium transition whitespace-nowrap " + (activeTab === 'orders' ? 'bg-emerald-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-50')}>
                        <Package size={18} className="inline mr-2" /> Mes Commandes ({userOrders.length})
                    </button>
                    <button onClick={() => setPage('favorites')} className="px-6 py-3 rounded-xl font-medium bg-white text-stone-600 hover:bg-stone-50 transition whitespace-nowrap">
                        <Heart size={18} className="inline mr-2" /> Mes Favoris
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <div className="bg-white rounded-3xl shadow-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-editorial text-2xl text-emerald-950">Informations personnelles</h2>
                            {!editing ? (
                                <Button variant="secondary" size="sm" onClick={() => setEditing(true)}><Edit3 size={16} className="mr-2" /> Modifier</Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={() => { setEditing(false); setProfileData({ ...currentUser }); }}>Annuler</Button>
                                    <Button size="sm" onClick={handleSaveProfile}><Check size={16} className="mr-2" /> Enregistrer</Button>
                                </div>
                            )}
                        </div>

                        {editing ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input label="Prénom" value={profileData.firstName || ''} onChange={e => setProfileData({...profileData, firstName: e.target.value})} />
                                <Input label="Nom" value={profileData.lastName || ''} onChange={e => setProfileData({...profileData, lastName: e.target.value})} />
                                <Input type="email" label="Email" value={profileData.email || ''} disabled />
                                <Input label="Téléphone" value={profileData.phone || ''} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
                                <Input label="Adresse" value={profileData.address || ''} onChange={e => setProfileData({...profileData, address: e.target.value})} className="md:col-span-2" />
                                <Input label="Ville" value={profileData.city || ''} onChange={e => setProfileData({...profileData, city: e.target.value})} />
                                <Input label="Code postal" value={profileData.postalCode || ''} onChange={e => setProfileData({...profileData, postalCode: e.target.value})} />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div><p className="text-sm text-stone-500 mb-1">Prénom</p><p className="font-medium">{currentUser.firstName}</p></div>
                                <div><p className="text-sm text-stone-500 mb-1">Nom</p><p className="font-medium">{currentUser.lastName}</p></div>
                                <div><p className="text-sm text-stone-500 mb-1">Email</p><p className="font-medium">{currentUser.email}</p></div>
                                <div><p className="text-sm text-stone-500 mb-1">Téléphone</p><p className="font-medium">{currentUser.phone || '-'}</p></div>
                                <div className="md:col-span-2"><p className="text-sm text-stone-500 mb-1">Adresse</p><p className="font-medium">{currentUser.address ? `${currentUser.address}, ${currentUser.postalCode} ${currentUser.city}` : '-'}</p></div>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-stone-100">
                            <p className="text-sm text-stone-500">Membre depuis le {new Date(currentUser.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {userOrders.length === 0 ? (
                            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                                <Package size={64} className="mx-auto text-stone-300 mb-4" />
                                <h3 className="font-editorial text-xl text-stone-800 mb-2">Aucune commande</h3>
                                <p className="text-stone-600 mb-6">Vous n'avez pas encore passe de commande</p>
                                <Button onClick={() => setPage('shop')}>Decouvrir la boutique</Button>
                            </div>
                        ) : (
                            userOrders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(order => {
                                const statusInfo = getStatusInfo(order.status);
                                return (
                                    <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6">
                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-stone-500">Commande du {new Date(order.date).toLocaleDateString('fr-FR')}</p>
                                                <p className="font-mono text-sm text-emerald-700">{order.trackingCode}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={"px-3 py-1 rounded-full text-sm font-medium " + (statusClasses[statusInfo.color] || 'bg-stone-100 text-stone-700')}>
                                                    {statusInfo.label}
                                                </span>
                                                <span className="font-bold text-emerald-900">{parseFloat(order.total).toFixed(2)} €</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 bg-stone-50 rounded-lg p-2 pr-4">
                                                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" loading="lazy" />
                                                    <div>
                                                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                                        <p className="text-xs text-stone-500">x{item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => setPage('tracking')} className="mt-4 text-sm text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1">
                                            Suivre ma commande <ArrowRight size={14} />
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

// PAGE FAVORIS
const FavoritesPage = () => {
    const { getFavoriteProducts, toggleFavorite, addToCart, setPage, setSelectedProduct, navigateToProduct } = useApp();
    const favorites = getFavoriteProducts();

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="font-editorial text-4xl md:text-5xl text-emerald-950 mb-4">Mes Favoris</h1>
                    <p className="text-stone-600">Les produits que vous avez aimes</p>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart size={64} className="mx-auto text-stone-300 mb-6" />
                        <h2 className="font-editorial text-2xl text-stone-800 mb-4">Aucun favori pour l'instant</h2>
                        <p className="text-stone-600 mb-8">Explorez notre boutique et ajoutez vos coups de coeur !</p>
                        <Button onClick={() => setPage('shop')}>Decouvrir la boutique</Button>
                    </div>
                ) : (
                    <>
                        <p className="text-stone-500 mb-8">{favorites.length} produit{favorites.length > 1 ? 's' : ''} dans vos favoris</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {favorites.map(product => (
                                <div key={product.id} className="group">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-stone-200 cursor-pointer" onClick={() => { navigateToProduct(product); }}>
                                        {product.tag && <span className="absolute top-3 left-3 bg-emerald-900 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wide">{product.tag}</span>}
                                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-red-500 text-white transition shadow-sm hover:bg-red-600">
                                            <Heart size={18} className="fill-white" />
                                        </button>
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="absolute bottom-4 left-4 right-4 bg-white text-emerald-900 py-3 rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-emerald-50 flex items-center justify-center gap-2">
                                            <ShoppingBag size={18} /> Ajouter
                                        </button>
                                    </div>
                                    <h3 className="font-medium text-stone-900 mb-1 line-clamp-1">{product.name}</h3>
                                    {product.subtitle && <p className="text-stone-500 text-sm mb-2">{product.subtitle}</p>}
                                    <p className="text-emerald-800 font-semibold">{parseFloat(product.price).toFixed(2)} €</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

// PAGE A PROPOS
const AboutPage = () => {
    const { siteContent } = useApp();
    return (
    <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16"><h1 className="font-editorial text-5xl md:text-6xl text-emerald-950 mb-4">L'Atelier</h1><p className="text-stone-600 max-w-xl mx-auto">Derriere chaque creation, une histoire d'amour pour l'artisanat et la planète.</p></div>
            <div className="aspect-video rounded-3xl overflow-hidden mb-12"><img src={siteContent.aboutImage} alt="L'atelier Greenez Vous" className="w-full h-full object-cover" loading="lazy" /></div>
            <h2 className="font-editorial text-3xl text-emerald-950 mb-4">{siteContent.aboutTitle}</h2>
            <p className="text-stone-600 mb-12">{siteContent.aboutText}</p>
            <h2 className="font-editorial text-3xl text-emerald-950 mb-6">Nos Engagements</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-2xl p-6"><Leaf size={32} className="text-emerald-700 mb-4" /><h3 className="font-editorial text-xl text-emerald-950 mb-2">Matieres Responsables</h3><p className="text-stone-600 text-sm">Coton bio certifie GOTS, lin lave europeen, tissus upcycles.</p></div>
                <div className="bg-emerald-50 rounded-2xl p-6"><Package size={32} className="text-emerald-700 mb-4" /><h3 className="font-editorial text-xl text-emerald-950 mb-2">Zéro Déchet</h3><p className="text-stone-600 text-sm">Les chutes de tissu deviennent des chouchous ou des lingettes.</p></div>
                <div className="bg-emerald-50 rounded-2xl p-6"><MapPin size={32} className="text-emerald-700 mb-4" /><h3 className="font-editorial text-xl text-emerald-950 mb-2">Made in France</h3><p className="text-stone-600 text-sm">Toutes nos créations sont confectionnees a Lyon.</p></div>
                <div className="bg-emerald-50 rounded-2xl p-6"><Truck size={32} className="text-emerald-700 mb-4" /><h3 className="font-editorial text-xl text-emerald-950 mb-2">Envoi Eco-Responsable</h3><p className="text-stone-600 text-sm">Emballages en carton recycle, zero plastique.</p></div>
            </div>
        </div>
        <Footer />
    </div>
    );
};

// PAGE CHECKOUT
const CheckoutPage = () => {
    const { cart, cartTotal, getDiscountedTotal, getFinalTotal, placeOrder, setPage, appliedPromo, getAvailableShipping, getShippingPrice, selectedShipping, setSelectedShipping, shippingOptions, showNotification, currentUser } = useApp();
    const [step, setStep] = useState(1);
    const [customerInfo, setCustomerInfo] = useState(() => {
        if (currentUser) return { firstName: currentUser.firstName || '', lastName: currentUser.lastName || '', email: currentUser.email || '', phone: currentUser.phone || '', address: currentUser.address || '', city: currentUser.city || '', postalCode: currentUser.postalCode || '', country: 'France' };
        return { firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'France' };
    });
    const [processing, setProcessing] = useState(false);
    const availableShipping = getAvailableShipping();

    if (cart.length === 0) return (<div className="min-h-screen pt-32 pb-24 flex items-center justify-center"><div className="text-center"><ShoppingBag size={64} className="mx-auto text-stone-300 mb-4" /><h2 className="font-editorial text-2xl text-stone-800 mb-4">Votre panier est vide</h2><Button onClick={() => setPage('shop')}>Retour a la boutique</Button></div></div>);

    // Aucun prestataire de paiement n'est branche : on n'affiche pas de
    // formulaire de carte bancaire. Saisir un numero de carte hors circuit
    // PCI-DSS est interdit, et laissait croire au client qu'il payait alors
    // qu'aucun encaissement n'avait lieu. La commande est enregistree en
    // "en attente de paiement" et l'atelier envoie le lien de reglement.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) { setStep(2); return; }
        if (step === 2) {
            if (!selectedShipping) { showNotification('Veuillez choisir un mode de livraison', 'error'); return; }
            setStep(3);
            return;
        }
        if (processing) return;
        setProcessing(true);
        try {
            await placeOrder(customerInfo, { method: 'A regler apres confirmation' });
        } finally {
            setProcessing(false);
        }
    };

    const shippingCost = selectedShipping ? getShippingPrice(selectedShipping) : 0;
    const subtotal = getDiscountedTotal();
    const total = subtotal + shippingCost;

    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-4">
                <button onClick={() => setPage('shop')} className="flex items-center gap-2 text-stone-600 hover:text-emerald-800 transition mb-8"><ArrowLeft size={20} /> Continuer mes achats</button>
                <h1 className="font-editorial text-4xl text-emerald-950 mb-8">Finaliser ma commande</h1>

                {/* Steps indicator */}
                <div className="flex items-center gap-2 mb-12">
                    <div className={"flex items-center gap-2 " + (step >= 1 ? 'text-emerald-700' : 'text-stone-400')}><div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold " + (step >= 1 ? 'bg-emerald-700 text-white' : 'bg-stone-200')}>1</div><span className="font-medium hidden sm:inline">Coordonnées</span></div>
                    <div className="flex-1 h-px bg-stone-200"></div>
                    <div className={"flex items-center gap-2 " + (step >= 2 ? 'text-emerald-700' : 'text-stone-400')}><div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold " + (step >= 2 ? 'bg-emerald-700 text-white' : 'bg-stone-200')}>2</div><span className="font-medium hidden sm:inline">Livraison</span></div>
                    <div className="flex-1 h-px bg-stone-200"></div>
                    <div className={"flex items-center gap-2 " + (step >= 3 ? 'text-emerald-700' : 'text-stone-400')}><div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold " + (step >= 3 ? 'bg-emerald-700 text-white' : 'bg-stone-200')}>3</div><span className="font-medium hidden sm:inline">Confirmation</span></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Customer Info */}
                            {step === 1 && (<div className="animate-fadeIn bg-white rounded-3xl p-6 shadow-sm">
                                <h2 className="font-editorial text-2xl text-emerald-950 mb-6">Vos coordonnées</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Input label="Prénom *" required autoComplete="given-name" value={customerInfo.firstName} onChange={e => setCustomerInfo({...customerInfo, firstName: e.target.value})} />
                                    <Input label="Nom *" required autoComplete="family-name" value={customerInfo.lastName} onChange={e => setCustomerInfo({...customerInfo, lastName: e.target.value})} />
                                </div>
                                <Input label="Email *" type="email" required autoComplete="email" value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} />
                                <Input label="Téléphone" type="tel" autoComplete="tel" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
                                <h2 className="font-editorial text-2xl text-emerald-950 mb-6 mt-8">Adresse de livraison</h2>
                                <Input label="Adresse *" required autoComplete="street-address" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} />
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <Input label="Ville *" required autoComplete="address-level2" value={customerInfo.city} onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})} />
                                    <Input label="Code postal *" required autoComplete="postal-code" value={customerInfo.postalCode} onChange={e => setCustomerInfo({...customerInfo, postalCode: e.target.value})} />
                                </div>
                                <Button type="submit" className="w-full mt-6">Choisir la livraison <ArrowRight size={16} /></Button>
                            </div>)}

                            {/* Step 2: Shipping */}
                            {step === 2 && (<div className="animate-fadeIn bg-white rounded-3xl p-6 shadow-sm">
                                <h2 className="font-editorial text-2xl text-emerald-950 mb-6">Mode de livraison</h2>
                                <div className="space-y-3">
                                    {availableShipping.map(option => {
                                        const isFree = option.freeAbove && cartTotal >= parseFloat(option.freeAbove);
                                        const price = isFree ? 0 : parseFloat(option.price) || 0;
                                        return (
                                            <label key={option.id} className={"flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition " + (selectedShipping === option.id ? 'border-emerald-600 bg-emerald-50' : 'border-stone-200 hover:border-stone-300')}>
                                                <input type="radio" name="shipping" checked={selectedShipping === option.id} onChange={() => setSelectedShipping(option.id)} className="w-5 h-5 text-emerald-600" />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Truck size={18} className="text-stone-500" />
                                                        <span className="font-medium text-stone-900">{option.name}</span>
                                                        {isFree && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Gratuit !</span>}
                                                    </div>
                                                    <p className="text-sm text-stone-500 mt-1">{option.description}</p>
                                                    {option.freeAbove && !isFree && <p className="text-xs text-emerald-600 mt-1">Gratuit dès {parseFloat(option.freeAbove)} € d'achat</p>}
                                                </div>
                                                <div className="text-right">
                                                    {isFree ? (
                                                        <span className="font-bold text-emerald-600">Gratuit</span>
                                                    ) : (
                                                        <span className="font-bold text-stone-900">{price.toFixed(2)} €</span>
                                                    )}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <Button type="button" variant="secondary" onClick={() => setStep(1)}><ArrowLeft size={16} /> Retour</Button>
                                    <Button type="submit" className="flex-1">Passer au paiement <ArrowRight size={16} /></Button>
                                </div>
                            </div>)}

                            {/* Step 3: Confirmation et reglement */}
                            {step === 3 && (<div className="animate-fadeIn bg-white rounded-3xl p-6 shadow-sm">
                                <h2 className="font-editorial text-2xl text-emerald-950 mb-6">Confirmer ma commande</h2>

                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 shrink-0 bg-emerald-100 rounded-full flex items-center justify-center"><Mail size={20} className="text-emerald-600" /></div>
                                        <div>
                                            <p className="text-emerald-900 font-medium mb-1">Reglement apres confirmation</p>
                                            <p className="text-emerald-700 text-sm leading-relaxed">
                                                Le paiement en ligne n'est pas encore disponible sur la boutique.
                                                Validez votre commande&nbsp;: l'atelier vous recontacte par email sous 24&nbsp;h
                                                avec le moyen de reglement, puis lance la confection.
                                                <strong className="block mt-2 font-medium">Aucun paiement ne vous est demande maintenant.</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-stone-50 rounded-2xl p-5 mb-6">
                                    <h3 className="font-medium text-emerald-950 mb-4">Recapitulatif</h3>
                                    <dl className="space-y-2 text-sm">
                                        <div className="flex justify-between gap-4"><dt className="text-stone-500">Livraison a</dt><dd className="text-stone-800 text-right">{customerInfo.firstName} {customerInfo.lastName}<br />{customerInfo.address}<br />{customerInfo.postalCode} {customerInfo.city}</dd></div>
                                        <div className="flex justify-between gap-4 pt-2 border-t border-stone-200"><dt className="text-stone-500">Email</dt><dd className="text-stone-800">{customerInfo.email}</dd></div>
                                        {customerInfo.phone && <div className="flex justify-between gap-4"><dt className="text-stone-500">Telephone</dt><dd className="text-stone-800">{customerInfo.phone}</dd></div>}
                                    </dl>
                                    <button type="button" onClick={() => setStep(1)} className="text-emerald-700 text-sm underline mt-4 hover:text-emerald-900">Modifier mes coordonnées</button>
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" variant="secondary" onClick={() => setStep(2)} disabled={processing}><ArrowLeft size={16} /> Retour</Button>
                                    <Button type="submit" className="flex-1" disabled={processing}>
                                        {processing ? (<><span className="animate-spin">⏳</span> Enregistrement...</>) : (<>Valider ma commande — {total.toFixed(2)} € <Check size={16} /></>)}
                                    </Button>
                                </div>
                            </div>)}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-32">
                            <h3 className="font-editorial text-xl text-emerald-950 mb-4">Recapitulatif</h3>
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-3">
                                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" loading="lazy" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-stone-900 text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-stone-500">x{item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-sm">{(parseFloat(item.price) * item.quantity).toFixed(2)} €</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-stone-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm text-stone-600">
                                    <span>Sous-total</span>
                                    <span>{cartTotal.toFixed(2)} €</span>
                                </div>
                                {appliedPromo && (
                                    <div className="flex justify-between text-sm text-emerald-600">
                                        <span>Réduction ({appliedPromo.code})</span>
                                        <span>-{appliedPromo.type === 'percent' ? (cartTotal * parseFloat(appliedPromo.discount) / 100).toFixed(2) : parseFloat(appliedPromo.discount).toFixed(2)} €</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm text-stone-600">
                                    <span>Livraison</span>
                                    {selectedShipping ? (
                                        <span className={shippingCost === 0 ? 'text-emerald-600 font-medium' : ''}>{shippingCost === 0 ? 'Gratuite' : shippingCost.toFixed(2) + ' €'}</span>
                                    ) : (
                                        <span className="text-stone-400 italic">A selectionner</span>
                                    )}
                                </div>
                                <div className="flex justify-between text-lg font-bold text-emerald-900 pt-3 border-t border-stone-200">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} €</span>
                                </div>
                            </div>
                            {step >= 2 && selectedShipping && (
                                <div className="mt-4 pt-4 border-t border-stone-100">
                                    <p className="text-xs text-stone-500">Livraison: {shippingOptions.find(o => o.id === selectedShipping)?.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PAGE LOGIN
const LoginPage = () => {
    const { setIsAdmin, setPage, showNotification } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('greenez_admin_token', data.token);
                localStorage.setItem('greenez_admin_user', JSON.stringify(data.admin));
                setIsAdmin(true);
                setPage('admin');
                showNotification('Connexion reussie, ' + data.admin.name + ' !');
            } else {
                showNotification(data.error || 'Identifiants incorrects', 'error');
            }
        } catch (error) {
            console.error('Erreur login:', error);
            showNotification('Erreur de connexion au serveur', 'error');
        }
        setLoading(false);
    };
    return (
        <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <div className="text-center mb-8"><div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><User size={32} className="text-emerald-700" /></div><h1 className="font-editorial text-3xl text-emerald-950">Espace Admin</h1><p className="text-stone-500 mt-2">Connectez-vous pour gerer votre boutique</p></div>
                    <form onSubmit={handleLogin}><Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="votre@email.com" /><Input label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" /><Button type="submit" className="w-full mt-4" disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'} {!loading && <ArrowRight size={16} />}</Button></form>
                </div>
            </div>
        </div>
    );
};

// ADMIN DASHBOARD
// ICONE FICHIER
const FileText = (props) => (<IconWrapper {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></IconWrapper>);
const Settings = (props) => (<IconWrapper {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></IconWrapper>);
const MessageSquare = (props) => (<IconWrapper {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></IconWrapper>);

const AdminDashboard = () => {
    const { isAdmin, setIsAdmin, setPage, products, events, promos, orders, categories, reviews, siteContent, legalPages, addProduct, updateProduct, deleteProduct, addEvent, updateEvent, deleteEvent, addPromo, updatePromo, deletePromo, updateOrderStatus, updatePaymentStatus, orderStatuses, allOrderStatuses, addMessageToOrder, markMessagesAsRead, getUnreadMessagesCount, approveReview, deleteReview, updateSiteContent, updateLegalPage, shippingOptions, updateShippingOption, addShippingOption, deleteShippingOption, newsletterSubscribers, unsubscribeNewsletter, actualites, addActualite, updateActualite, deleteActualite, emailLogs, clearEmailLogs, showNotification } = useApp();
    const [activeTab, setActiveTab] = useState('overview');
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [contentForm, setContentForm] = useState(siteContent);
    const [editingLegal, setEditingLegal] = useState(null);
    const [legalForm, setLegalForm] = useState({ title: '', content: '' });
    const [orderNotes, setOrderNotes] = useState({});
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [adminMessage, setAdminMessage] = useState({});
    const [editingShipping, setEditingShipping] = useState(null);
    const [shippingForm, setShippingForm] = useState({ name: '', description: '', price: '', minOrder: '0', maxOrder: '', freeAbove: '', active: true });
    const [editingActualite, setEditingActualite] = useState(null);
    const [actualiteForm, setActualiteForm] = useState({ title: '', description: '', image: '', instagramUrl: '', active: true });
    const [instagramImportUrl, setInstagramImportUrl] = useState('');
    const [instagramLoading, setInstagramLoading] = useState(false);

    // Redirection hors du corps de rendu si non admin
    useEffect(() => { if (!isAdmin) setPage('login'); }, [isAdmin]);

    // Reinitialiser contentForm quand siteContent change (ex: arrivee de l'API),
    // sans ecraser les modifications en cours si le formulaire a ete touche
    const siteContentRef = React.useRef(siteContent);
    useEffect(() => {
        setContentForm(prev => {
            const untouched = Object.keys(siteContentRef.current).every(k => prev[k] === siteContentRef.current[k]);
            return untouched ? { ...prev, ...siteContent } : prev;
        });
        siteContentRef.current = siteContent;
    }, [siteContent]);

    const importFromInstagram = async () => {
        if (!instagramImportUrl) return;
        setInstagramLoading(true);
        try {
            const api = getAPI();
            const data = await api.instagram.fetchPost(instagramImportUrl);
            if (data.success) {
                setActualiteForm({
                    title: data.title || '',
                    description: data.author ? 'Publication de @' + data.author : '',
                    image: data.thumbnail || '',
                    instagramUrl: data.url || instagramImportUrl,
                    active: false
                });
                setEditingActualite('new');
                setInstagramImportUrl('');
                showNotification('Post Instagram importé ! Vérifiez et approuvez.', 'success');
            }
        } catch (error) {
            showNotification('Erreur: ' + error.message, 'error');
        }
        setInstagramLoading(false);
    };
    if (!isAdmin) return null;

    // Generate invoice PDF
    const generateInvoice = (order) => {
        const invoiceNum = order.invoiceNumber || 'GV-' + order.id;
        const orderDate = new Date(order.date).toLocaleDateString('fr-FR');
        const itemsHtml = order.items.map(function(item) { return '<tr><td>' + item.name + (item.subtitle ? ' - ' + item.subtitle : '') + '</td><td style="text-align: center;">' + item.quantity + '</td><td style="text-align: right;">' + parseFloat(item.price).toFixed(2) + ' €</td><td style="text-align: right;">' + (parseFloat(item.price) * item.quantity).toFixed(2) + ' €</td></tr>'; }).join('');
        const subtotal = order.items.reduce(function(sum, item) { return sum + parseFloat(item.price) * item.quantity; }, 0).toFixed(2);
        const shippingHtml = order.shippingCost !== undefined ? '<div class="total-line"><span>Livraison (' + (order.shippingMethod || 'Standard') + '):</span><span>' + (parseFloat(order.shippingCost) === 0 ? 'Offert' : parseFloat(order.shippingCost).toFixed(2) + ' €') + '</span></div>' : '';
        const promoHtml = order.promoUsed ? '<div class="total-line"><span>Code promo (' + order.promoUsed + '):</span><span>-' + parseFloat(order.promoDiscount).toFixed(2) + ' €</span></div>' : '';
        const parts = [];
        parts.push('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Facture ');
        parts.push(invoiceNum);
        parts.push('</title><style>');
        parts.push('body{font-family:Helvetica,Arial,sans-serif;padding:40px;color:#1c1917}');
        parts.push('.header{display:flex;justify-content:space-between;align-items:start;margin-bottom:40px}');
        parts.push('.logo{font-size:28px;font-weight:bold;color:#064e3b}');
        parts.push('.invoice-title{font-size:32px;color:#064e3b;text-align:right}');
        parts.push('.invoice-number{font-size:14px;color:#78716c;margin-top:4px}');
        parts.push('.info-section{display:flex;justify-content:space-between;margin-bottom:40px}');
        parts.push('.info-block{width:45%}.info-block h3{font-size:12px;text-transform:uppercase;color:#78716c;margin-bottom:8px}');
        parts.push('.info-block p{margin:4px 0;font-size:14px}');
        parts.push('table{width:100%;border-collapse:collapse;margin-bottom:30px}');
        parts.push('th{background:#f5f5f4;text-align:left;padding:12px;font-size:12px;text-transform:uppercase;color:#78716c}');
        parts.push('td{padding:12px;border-bottom:1px solid #e7e5e4;font-size:14px}');
        parts.push('.total-section{text-align:right;margin-top:20px}');
        parts.push('.total-line{display:flex;justify-content:flex-end;gap:40px;margin:8px 0;font-size:14px}');
        parts.push('.total-line.grand{font-size:18px;font-weight:bold;color:#064e3b;border-top:2px solid #064e3b;padding-top:12px;margin-top:12px}');
        parts.push('.footer{margin-top:60px;text-align:center;font-size:12px;color:#78716c;border-top:1px solid #e7e5e4;padding-top:20px}');
        parts.push('@media print{body{padding:20px}}');
        parts.push('</style></head>');
        parts.push('<body><div class="header"><div><div class="logo">Greenez Vous</div>');
        parts.push('<p style="font-size:12px;color:#78716c">Créations artisanales zéro déchet</p></div>');
        parts.push('<div style="text-align:right"><div class="invoice-title">FACTURE</div>');
        parts.push('<div class="invoice-number">' + invoiceNum + '</div>');
        parts.push('<div class="invoice-number">Date: ' + orderDate + '</div></div></div>');
        parts.push('<div class="info-section"><div class="info-block"><h3>Facture a</h3>');
        parts.push('<p><strong>' + order.customer.firstName + ' ' + order.customer.lastName + '</strong></p>');
        parts.push('<p>' + order.customer.address + '</p>');
        parts.push('<p>' + order.customer.postalCode + ' ' + order.customer.city + '</p>');
        parts.push('<p>' + order.customer.email + '</p></div>');
        parts.push('<div class="info-block"><h3>Greenez Vous</h3><p>Lyon, France</p>');
        parts.push('<p>contact@greenez-vous.fr</p><p>SIRET: A completer</p></div></div>');
        parts.push('<table><thead><tr><th>Produit</th><th style="text-align:center">Quantité</th>');
        parts.push('<th style="text-align:right">Prix unit.</th><th style="text-align:right">Total</th></tr></thead>');
        parts.push('<tbody>' + itemsHtml + '</tbody></table>');
        parts.push('<div class="total-section"><div class="total-line"><span>Sous-total:</span><span>' + subtotal + ' €</span></div>');
        parts.push(shippingHtml + promoHtml);
        parts.push('<div class="total-line grand"><span>TOTAL TTC:</span><span>' + parseFloat(order.total).toFixed(2) + ' €</span></div></div>');
        parts.push('<div class="footer"><p>Merci pour votre achat chez Greenez Vous !</p>');
        parts.push('<p>Créations artisanales faites main en France avec amour</p></div>');
        parts.push('</' + 'body></' + 'html>');
        const invoiceHtml = parts.join('');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(invoiceHtml);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(function() { printWindow.print(); }, 500);
    };
    const openModal = (type, item = null) => { setModalType(type); setEditingItem(item); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditingItem(null); setModalType(null); };
    // Le chiffre d'affaires ne compte que les commandes reellement encaissees :
    // les commandes annulees ou en attente de reglement le gonfleraient a tort
    const stats = { totalProducts: products.length, activeProducts: products.filter(p => p.active).length, totalOrders: orders.filter(o => o.status !== 'cancelled').length, pendingOrders: orders.filter(o => o.status === 'pending').length, awaitingPayment: orders.filter(o => o.paymentStatus !== 'paid' && o.status !== 'cancelled').length, revenue: orders.filter(o => o.paymentStatus === 'paid' && o.status !== 'cancelled').reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0), activePromos: promos.filter(p => p.active).length, pendingReviews: reviews.filter(r => !r.approved).length, unreadMessages: getUnreadMessagesCount() };
    const handleContentSave = () => { updateSiteContent(contentForm); };
    const startEditLegal = (key) => { setEditingLegal(key); setLegalForm({ title: legalPages[key].title, content: legalPages[key].content }); };
    const saveLegalPage = () => { updateLegalPage(editingLegal, legalForm); setEditingLegal(null); };

    return (
        <div className="min-h-screen bg-stone-100">
            <div className="bg-emerald-900 text-white py-4 px-6 flex justify-between items-center"><div className="flex items-center gap-4"><div className="flex items-center gap-2"><Leaf size={20} /><span className="font-editorial text-xl">Greenez Vous</span></div><span className="text-emerald-300 text-sm">| Administration</span></div><div className="flex items-center gap-4"><Button variant="secondary" size="sm" className="text-white border-white/30 hover:bg-white/10" onClick={() => setPage('home')}><Eye size={16} /> Voir le site</Button><Button variant="secondary" size="sm" className="text-white border-white/30 hover:bg-white/10" onClick={() => { localStorage.removeItem('greenez_admin_token'); localStorage.removeItem('greenez_admin_user'); setIsAdmin(false); setPage('home'); }}>Deconnexion</Button></div></div>
            <div className="flex">
                <div className="w-64 bg-white min-h-[calc(100vh-64px)] shadow-sm p-4">
                    <nav className="space-y-2">
                        <button onClick={() => setActiveTab('overview')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'overview' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><BarChart size={20} /> Vue d'ensemble</button>
                        <button onClick={() => setActiveTab('products')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'products' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Package size={20} /> Produits</button>
                        <button onClick={() => setActiveTab('orders')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'orders' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><ShoppingCart size={20} /> Commandes <span className="ml-auto flex items-center gap-1">{stats.unreadMessages > 0 && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full" title="Messages non lus">{stats.unreadMessages}</span>}{stats.pendingOrders > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full" title="En attente">{stats.pendingOrders}</span>}</span></button>
                        <button onClick={() => setActiveTab('reviews')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'reviews' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><MessageSquare size={20} /> Avis clients {stats.pendingReviews > 0 && <span className="ml-auto bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.pendingReviews}</span>}</button>
                        <button onClick={() => setActiveTab('events')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'events' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Calendar size={20} /> Événements</button>
                        <button onClick={() => setActiveTab('promos')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'promos' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Tag size={20} /> Codes Promo</button>
                        <button onClick={() => setActiveTab('shipping')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'shipping' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Truck size={20} /> Livraison</button>
                        <button onClick={() => setActiveTab('newsletter')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'newsletter' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Mail size={20} /> Newsletter <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{newsletterSubscribers.length}</span></button>
                        <button onClick={() => setActiveTab('actualites')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'actualites' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Instagram size={20} /> Actualites <span className="ml-auto text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">{actualites.length}</span></button>
                        <button onClick={() => setActiveTab('emails')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'emails' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Mail size={20} /> Emails envoyés <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{emailLogs.length}</span></button>
                        <div className="border-t border-stone-100 my-4"></div>
                        <button onClick={() => setActiveTab('content')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'content' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><Settings size={20} /> Contenu du site</button>
                        <button onClick={() => setActiveTab('legal')} className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition " + (activeTab === 'legal' ? 'bg-emerald-50 text-emerald-800' : 'text-stone-600 hover:bg-stone-50')}><FileText size={20} /> Pages légales</button>
                    </nav>
                </div>
                <div className="flex-1 p-8">
                    {activeTab === 'overview' && (<div className="animate-fadeIn"><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Vue d'ensemble</h2>
                    {products.filter(p => p.active && p.stock <= 10).length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
                            <div className="flex items-center gap-3 mb-3"><AlertTriangle size={20} className="text-amber-600" /><h3 className="font-medium text-amber-800">Alertes stock bas</h3></div>
                            <div className="flex flex-wrap gap-2">
                                {products.filter(p => p.active && p.stock <= 10).sort((a, b) => a.stock - b.stock).map(p => (
                                    <div key={p.id} className={"flex items-center gap-2 px-3 py-2 rounded-xl text-sm " + (p.stock === 0 ? 'bg-red-100 text-red-800' : p.stock <= 5 ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800')}>
                                        <img src={p.image} alt={p.name} className="w-6 h-6 rounded object-cover" loading="lazy" />
                                        <span className="font-medium">{p.name.substring(0, 20)}{p.name.length > 20 ? '...' : ''}</span>
                                        <span className={"font-bold " + (p.stock === 0 ? 'text-red-600' : '')}>{p.stock === 0 ? 'Rupture' : p.stock + ' restant' + (p.stock > 1 ? 's' : '')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Package size={24} className="text-emerald-600" /><span className="text-xs text-stone-500">Produits</span></div><p className="text-3xl font-bold text-stone-900">{stats.activeProducts}</p><p className="text-sm text-stone-500">sur {stats.totalProducts} au total</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><ShoppingCart size={24} className="text-blue-600" /><span className="text-xs text-stone-500">Commandes</span></div><p className="text-3xl font-bold text-stone-900">{stats.totalOrders}</p><p className="text-sm text-stone-500">{stats.pendingOrders} en attente</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><CreditCard size={24} className="text-green-600" /><span className="text-xs text-stone-500">Encaissé</span></div><p className="text-3xl font-bold text-stone-900">{stats.revenue.toFixed(2)} €</p><p className="text-sm text-stone-500">{stats.awaitingPayment > 0 ? stats.awaitingPayment + ' commande(s) à encaisser' : 'tout est réglé'}</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Tag size={24} className="text-purple-600" /><span className="text-xs text-stone-500">Promos actives</span></div><p className="text-3xl font-bold text-stone-900">{stats.activePromos}</p><p className="text-sm text-stone-500">codes actifs</p></div></div><div className="bg-white rounded-2xl p-6 shadow-sm"><h3 className="font-editorial text-xl text-emerald-950 mb-4">Dernieres commandes</h3>{orders.length === 0 ? <p className="text-stone-500 text-center py-8">Aucune commande</p> : (<div className="space-y-4">{orders.slice(-5).reverse().map(order => (<div key={order.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl"><div><p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p><p className="text-sm text-stone-500">{new Date(order.date).toLocaleDateString('fr-FR')}</p></div><div className="text-right"><p className="font-bold text-emerald-900">{parseFloat(order.total).toFixed(2)} €</p><span className={"text-xs px-2 py-1 rounded-full " + (order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'cancelled' ? 'bg-red-100 text-red-800' : order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800')}>{allOrderStatuses.find(s => s.key === order.status)?.label || order.status}</span></div></div>))}</div>)}</div></div>)}
                    {activeTab === 'products' && (<div className="animate-fadeIn"><div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Produits</h2><Button onClick={() => openModal('product')}><Plus size={16} /> Ajouter un produit</Button></div><div className="bg-white rounded-2xl shadow-sm overflow-hidden"><table className="w-full"><thead className="bg-stone-50"><tr><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Produit</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Prix</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Stock</th><th className="text-center px-6 py-4 text-sm font-medium text-stone-600">A la une</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Statut</th><th className="text-right px-6 py-4 text-sm font-medium text-stone-600">Actions</th></tr></thead><tbody className="divide-y divide-stone-100">{products.map(product => (<tr key={product.id} className="hover:bg-stone-50"><td className="px-6 py-4"><div className="flex items-center gap-3"><img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" /><div><p className="font-medium text-stone-900">{product.name}</p><p className="text-sm text-stone-500">{product.subtitle}</p></div></div></td><td className="px-6 py-4 font-medium">{parseFloat(product.price).toFixed(2)} €</td><td className="px-6 py-4">{product.stock}</td><td className="px-6 py-4 text-center"><button onClick={() => updateProduct(product.id, { featured: !product.featured })} className={"p-2 rounded-lg transition " + (product.featured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-stone-300 hover:bg-stone-100 hover:text-amber-500')}><Star size={18} className={product.featured ? 'fill-amber-500' : ''} /></button></td><td className="px-6 py-4"><span className={"text-xs px-2 py-1 rounded-full " + (product.active ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600')}>{product.active ? 'Actif' : 'Inactif'}</span></td><td className="px-6 py-4 text-right"><button onClick={() => openModal('product', product)} className="p-2 hover:bg-stone-100 rounded-lg text-stone-600"><Edit size={18} /></button><button onClick={() => { if (window.confirm('Supprimer ce produit ?')) deleteProduct(product.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash size={18} /></button></td></tr>))}</tbody></table></div></div>)}
                    {activeTab === 'orders' && (<div className="animate-fadeIn"><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Commandes</h2>{orders.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center shadow-sm"><ShoppingCart size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Aucune commande</p></div>) : (<div className="space-y-4">{orders.slice().reverse().map(order => {
                        const statusColors = { pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800', crafting: 'bg-purple-100 text-purple-800', quality: 'bg-indigo-100 text-indigo-800', packing: 'bg-cyan-100 text-cyan-800', shipped: 'bg-orange-100 text-orange-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };
                        const isExpanded = expandedOrder === order.id;
                        const isCancelled = order.status === 'cancelled';
                        const isPaid = order.paymentStatus === 'paid';
                        return (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-sm bg-stone-100 px-2 py-1 rounded">{order.trackingCode || '#' + order.id}</span>
                                            <span className={"text-xs px-2 py-1 rounded-full font-medium " + (statusColors[order.status] || 'bg-stone-100 text-stone-800')}>{allOrderStatuses.find(s => s.key === order.status)?.label || order.status}</span>
                                            <span className={"text-xs px-2 py-1 rounded-full font-medium " + (isPaid ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800')}>{isPaid ? 'Reglee' : 'A encaisser'}</span>
                                            {order.unreadByAdmin && <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800"><MessageSquare size={12} /> Nouveau message</span>}
                                        </div>
                                        <p className="font-medium text-lg">{order.customer.firstName} {order.customer.lastName}</p>
                                        <p className="text-sm text-stone-500">{order.customer.email}</p>
                                        <p className="text-sm text-stone-400 mt-1">{new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-emerald-900">{parseFloat(order.total).toFixed(2)} €</p>
                                        {order.promoUsed && <p className="text-sm text-emerald-600">Code: {order.promoUsed}</p>}
                                        {order.shippingMethod && <p className="text-xs text-stone-500">{order.shippingMethod} {order.shippingCost === 0 ? '(offert)' : ''}</p>}
                                        <button onClick={(e) => { e.stopPropagation(); generateInvoice(order); }} className="mt-2 text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 ml-auto"><Download size={14} /> Facture</button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">{order.items.map(item => (<div key={item.id} className="flex items-center gap-2 bg-stone-50 rounded-lg p-2"><img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" loading="lazy" /><span className="text-sm">{item.name} <span className="text-stone-400">x{item.quantity}</span></span></div>))}</div>
                                <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="text-sm text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-1">{isExpanded ? 'Masquer les details' : 'Voir les details et mettre a jour'} <MoveRight size={14} className={isExpanded ? 'rotate-90' : ''} /></button>
                            </div>
                            {isExpanded && (
                                <div className="border-t border-stone-100 p-6 bg-stone-50 animate-fadeIn">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <h4 className="font-medium text-stone-900 mb-3">Mettre a jour le statut</h4>
                                            {isCancelled ? (
                                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                                                    <p className="text-red-800 text-sm font-medium mb-1">Commande annulée</p>
                                                    <p className="text-red-700 text-xs">Le stock a été remis en rayon. Une commande annulée ne peut pas être réactivée.</p>
                                                </div>
                                            ) : (
                                            <Select label="Nouveau statut" value={order.status} onChange={e => {
                                                const newStatus = e.target.value;
                                                if (newStatus === order.status) return;
                                                // L'annulation est irreversible et remet le stock en rayon
                                                if (newStatus === 'cancelled' && !window.confirm('Annuler cette commande ?\n\nLe stock sera remis en rayon et l\'utilisation du code promo liberee. Cette action est irreversible.')) return;
                                                updateOrderStatus(order.id, newStatus, orderNotes[order.id] || '');
                                                setOrderNotes(prev => ({ ...prev, [order.id]: '' }));
                                            }} options={allOrderStatuses.map(s => ({ value: s.key, label: s.label }))} />
                                            )}

                                            <div className={"rounded-xl p-4 mb-4 border " + (isPaid ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200')}>
                                                <p className={"text-sm font-medium mb-2 " + (isPaid ? 'text-green-800' : 'text-amber-900')}>Reglement : {isPaid ? 'encaisse' : 'en attente'}</p>
                                                {!isPaid && <p className="text-amber-800 text-xs mb-3">Le paiement en ligne n'est pas branche. Marquez la commande comme reglee une fois le virement ou l'especes recu.</p>}
                                                <Button size="sm" variant={isPaid ? 'secondary' : 'primary'} onClick={() => updatePaymentStatus(order.id, isPaid ? 'pending' : 'paid')}>
                                                    {isPaid ? 'Annuler l\'encaissement' : 'Marquer comme réglée'}
                                                </Button>
                                            </div>
                                            <Textarea label="Note pour le client (optionnel)" placeholder="Ex: Votre creation est en cours de confection avec amour..." value={orderNotes[order.id] || ''} onChange={e => setOrderNotes(prev => ({ ...prev, [order.id]: e.target.value }))} />
                                            <p className="text-xs text-stone-500 mb-4">Cette note sera visible dans le suivi de commande du client.</p>
                                            <div className="bg-white rounded-xl p-4 border border-stone-200">
                                                <p className="text-sm font-medium text-stone-700 mb-1">Adresse de livraison</p>
                                                <p className="text-sm text-stone-600">{order.customer.address}<br/>{order.customer.postalCode} {order.customer.city}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-stone-900 mb-3">Historique</h4>
                                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                                {(order.statusHistory || []).slice().reverse().map((entry, idx) => (
                                                    <div key={idx} className="flex gap-3">
                                                        <div className={"w-2 h-2 rounded-full mt-2 flex-shrink-0 " + (idx === 0 ? 'bg-emerald-500' : 'bg-stone-300')}></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-stone-900">{allOrderStatuses.find(s => s.key === entry.status)?.label || entry.status}</p>
                                                            <p className="text-sm text-stone-600">{entry.note}</p>
                                                            <p className="text-xs text-stone-400">{new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                                                Messages
                                                {order.unreadByAdmin && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                                            </h4>
                                            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                                                <div className="h-48 overflow-y-auto p-3">
                                                    {(!order.messages || order.messages.length === 0) ? (
                                                        <p className="text-center text-stone-400 text-sm py-8">Aucun message</p>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {order.messages.map((msg, idx) => (
                                                                <div key={msg.id || idx} className={"flex " + (msg.sender === 'admin' ? 'justify-end' : 'justify-start')}>
                                                                    <div className={"max-w-[85%] rounded-xl px-3 py-2 text-sm " + (msg.sender === 'admin' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-800')}>
                                                                        <p className={"text-xs mb-0.5 " + (msg.sender === 'admin' ? 'text-emerald-200' : 'text-stone-500')}>
                                                                            {msg.sender === 'admin' ? 'Vous' : order.customer.firstName}
                                                                        </p>
                                                                        <p>{msg.content}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="border-t border-stone-200 p-2 flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={adminMessage[order.id] || ''}
                                                        onChange={e => setAdminMessage(prev => ({ ...prev, [order.id]: e.target.value }))}
                                                        onFocus={() => { if (order.unreadByAdmin) markMessagesAsRead(order.id, 'admin'); }}
                                                        placeholder="Repondre..."
                                                        className="flex-1 px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                        onKeyDown={e => { if (e.key === 'Enter' && adminMessage[order.id]?.trim()) { addMessageToOrder(order.id, adminMessage[order.id].trim(), 'admin'); setAdminMessage(prev => ({ ...prev, [order.id]: '' })); }}}
                                                    />
                                                    <button
                                                        onClick={() => { if (adminMessage[order.id]?.trim()) { addMessageToOrder(order.id, adminMessage[order.id].trim(), 'admin'); setAdminMessage(prev => ({ ...prev, [order.id]: '' })); }}}
                                                        className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                                                    >
                                                        <MoveRight size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );})}</div>)}</div>)}
                    {activeTab === 'events' && (<div className="animate-fadeIn"><div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Événements</h2><Button onClick={() => openModal('event')}><Plus size={16} /> Ajouter</Button></div><div className="grid gap-4">{events.map(event => (<div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"><div className="flex items-start gap-4"><div className="text-center bg-emerald-50 rounded-xl p-3 min-w-[70px]"><div className="text-2xl font-bold text-emerald-900">{new Date(event.date).getDate()}</div><div className="text-xs text-emerald-700 uppercase">{new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}</div></div><div><h3 className="font-medium text-lg text-stone-900">{event.title}</h3><p className="text-stone-600 text-sm mb-1">{event.description}</p><p className="text-stone-500 text-sm flex items-center gap-1"><MapPin size={14} /> {event.location}</p></div></div><div className="flex items-center gap-2"><span className={"text-xs px-2 py-1 rounded-full " + (event.active ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600')}>{event.active ? 'Actif' : 'Inactif'}</span><button onClick={() => openModal('event', event)} className="p-2 hover:bg-stone-100 rounded-lg text-stone-600"><Edit size={18} /></button><button onClick={() => { if (window.confirm('Supprimer cet evenement ?')) deleteEvent(event.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash size={18} /></button></div></div>))}</div></div>)}
                    {activeTab === 'promos' && (<div className="animate-fadeIn"><div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Codes Promo</h2><Button onClick={() => openModal('promo')}><Plus size={16} /> Ajouter</Button></div><div className="bg-white rounded-2xl shadow-sm overflow-hidden"><table className="w-full"><thead className="bg-stone-50"><tr><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Code</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Réduction</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Min.</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Utilisations</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Statut</th><th className="text-right px-6 py-4 text-sm font-medium text-stone-600">Actions</th></tr></thead><tbody className="divide-y divide-stone-100">{promos.map(promo => (<tr key={promo.id} className="hover:bg-stone-50"><td className="px-6 py-4 font-mono font-bold text-emerald-700">{promo.code}</td><td className="px-6 py-4">{promo.discount}{promo.type === 'percent' ? '%' : ' €'}</td><td className="px-6 py-4">{promo.minOrder > 0 ? promo.minOrder + ' €' : '-'}</td><td className="px-6 py-4">{promo.usageCount} / {promo.maxUsage}</td><td className="px-6 py-4"><span className={"text-xs px-2 py-1 rounded-full " + (promo.active ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600')}>{promo.active ? 'Actif' : 'Inactif'}</span></td><td className="px-6 py-4 text-right"><button onClick={() => openModal('promo', promo)} className="p-2 hover:bg-stone-100 rounded-lg text-stone-600"><Edit size={18} /></button><button onClick={() => { if (window.confirm('Supprimer ce code promo ?')) deletePromo(promo.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash size={18} /></button></td></tr>))}</tbody></table></div></div>)}
                    {activeTab === 'reviews' && (<div className="animate-fadeIn"><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Avis clients</h2>{reviews.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center shadow-sm"><MessageSquare size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Aucun avis</p></div>) : (<div className="space-y-4">{reviews.slice().reverse().map(review => { const product = products.find(p => p.id === review.productId); return (<div key={review.id} className={"bg-white rounded-2xl p-6 shadow-sm border-l-4 " + (review.approved ? 'border-green-500' : 'border-amber-500')}><div className="flex justify-between items-start mb-4"><div className="flex items-center gap-4">{product && <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />}<div><p className="font-medium text-stone-900">{review.author}</p><p className="text-sm text-stone-500">{product?.name || 'Produit inconnu'}</p></div></div><div className="flex items-center gap-2"><div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />)}</div><span className={"text-xs px-2 py-1 rounded-full ml-2 " + (review.approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800')}>{review.approved ? 'Publié' : 'En attente'}</span></div></div><p className="text-stone-600 mb-4">{review.comment}</p><div className="flex justify-between items-center"><p className="text-sm text-stone-400">{new Date(review.date).toLocaleDateString('fr-FR')}</p><div className="flex gap-2">{!review.approved && <Button size="sm" onClick={() => approveReview(review.id)}><Check size={16} /> Approuver</Button>}<Button size="sm" variant="danger" onClick={() => { if (window.confirm('Supprimer cet avis ?')) deleteReview(review.id); }}><Trash size={16} /></Button></div></div></div>); })}</div>)}</div>)}
                    {activeTab === 'content' && (<div className="animate-fadeIn"><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Contenu du site</h2><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Page d'accueil - Hero</h3><Input label="Badge" value={contentForm.heroBadge} onChange={e => setContentForm({...contentForm, heroBadge: e.target.value})} /><Input label="Titre principal" value={contentForm.heroTitle} onChange={e => setContentForm({...contentForm, heroTitle: e.target.value})} /><Input label="Titre italique" value={contentForm.heroTitleItalic} onChange={e => setContentForm({...contentForm, heroTitleItalic: e.target.value})} /><Textarea label="Sous-titre" value={contentForm.heroSubtitle} onChange={e => setContentForm({...contentForm, heroSubtitle: e.target.value})} /></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Images</h3><Input label="Image Hero (URL)" value={contentForm.heroImage || ''} onChange={e => setContentForm({...contentForm, heroImage: e.target.value})} placeholder="https://..." /><Input label="Image A propos (URL)" value={contentForm.aboutImage || ''} onChange={e => setContentForm({...contentForm, aboutImage: e.target.value})} placeholder="https://..." /><div className="grid grid-cols-3 gap-4"><Input label="Image categorie 1 (URL)" value={contentForm.categoryImage1 || ''} onChange={e => setContentForm({...contentForm, categoryImage1: e.target.value})} /><Input label="Image categorie 2 (URL)" value={contentForm.categoryImage2 || ''} onChange={e => setContentForm({...contentForm, categoryImage2: e.target.value})} /><Input label="Image categorie 3 (URL)" value={contentForm.categoryImage3 || ''} onChange={e => setContentForm({...contentForm, categoryImage3: e.target.value})} /></div></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Categories Accueil</h3><div className="grid grid-cols-3 gap-4"><Input label="Titre categorie 1" value={contentForm.categoryTitle1 || ''} onChange={e => setContentForm({...contentForm, categoryTitle1: e.target.value})} /><Input label="Titre categorie 2" value={contentForm.categoryTitle2 || ''} onChange={e => setContentForm({...contentForm, categoryTitle2: e.target.value})} /><Input label="Titre categorie 3" value={contentForm.categoryTitle3 || ''} onChange={e => setContentForm({...contentForm, categoryTitle3: e.target.value})} /></div><Input label="Description categorie 1" value={contentForm.categoryDesc1 || ''} onChange={e => setContentForm({...contentForm, categoryDesc1: e.target.value})} /></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Bandeau defilant</h3><div className="grid grid-cols-3 gap-4"><Input label="Texte 1" value={contentForm.marquee1 || ''} onChange={e => setContentForm({...contentForm, marquee1: e.target.value})} /><Input label="Texte 2" value={contentForm.marquee2 || ''} onChange={e => setContentForm({...contentForm, marquee2: e.target.value})} /><Input label="Texte 3" value={contentForm.marquee3 || ''} onChange={e => setContentForm({...contentForm, marquee3: e.target.value})} /></div></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Section sur mesure</h3><Input label="Titre" value={contentForm.customTitle || ''} onChange={e => setContentForm({...contentForm, customTitle: e.target.value})} /><Textarea label="Texte" value={contentForm.customText || ''} onChange={e => setContentForm({...contentForm, customText: e.target.value})} /></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Section Pepites</h3><Input label="Label" value={contentForm.featuredLabel || ''} onChange={e => setContentForm({...contentForm, featuredLabel: e.target.value})} /><Input label="Titre" value={contentForm.featuredTitle || ''} onChange={e => setContentForm({...contentForm, featuredTitle: e.target.value})} /></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Hero - Citation</h3><Input label="Citation client" value={contentForm.heroQuote || ''} onChange={e => setContentForm({...contentForm, heroQuote: e.target.value})} /></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">A propos</h3><Input label="Titre" value={contentForm.aboutTitle} onChange={e => setContentForm({...contentForm, aboutTitle: e.target.value})} /><Textarea label="Texte" value={contentForm.aboutText} onChange={e => setContentForm({...contentForm, aboutText: e.target.value})} /></div><div className="bg-white rounded-2xl p-6 shadow-sm mb-6"><h3 className="font-medium text-lg text-stone-900 mb-4">Footer & Contact</h3><Textarea label="Texte footer" value={contentForm.footerText} onChange={e => setContentForm({...contentForm, footerText: e.target.value})} /><div className="grid grid-cols-2 gap-4"><Input label="Email" value={contentForm.contactEmail} onChange={e => setContentForm({...contentForm, contactEmail: e.target.value})} /><Input label="Téléphone" value={contentForm.contactPhone} onChange={e => setContentForm({...contentForm, contactPhone: e.target.value})} /></div><div className="grid grid-cols-2 gap-4"><Input label="Instagram URL" value={contentForm.instagram} onChange={e => setContentForm({...contentForm, instagram: e.target.value})} /><Input label="Facebook URL" value={contentForm.facebook} onChange={e => setContentForm({...contentForm, facebook: e.target.value})} /></div></div><Button onClick={handleContentSave}><Check size={16} /> Enregistrer les modifications</Button></div>)}
                    {activeTab === 'legal' && (<div className="animate-fadeIn"><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Pages légales</h2>{editingLegal ? (<div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex justify-between items-center mb-6"><h3 className="font-medium text-lg text-stone-900">Modifier: {legalPages[editingLegal].title}</h3><Button variant="ghost" onClick={() => setEditingLegal(null)}><XIcon size={16} /> Fermer</Button></div><Input label="Titre de la page" value={legalForm.title} onChange={e => setLegalForm({...legalForm, title: e.target.value})} /><div className="mb-4"><label className="block text-sm font-medium text-stone-700 mb-1">Contenu (HTML)</label><textarea className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm" rows={15} value={legalForm.content} onChange={e => setLegalForm({...legalForm, content: e.target.value})} /></div><div className="flex gap-4"><Button variant="secondary" onClick={() => setEditingLegal(null)}>Annuler</Button><Button onClick={saveLegalPage}><Check size={16} /> Enregistrer</Button></div></div>) : (<div className="grid gap-4">{Object.entries(legalPages).map(([key, page]) => (<div key={key} className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center"><div><h3 className="font-medium text-lg text-stone-900">{page.title}</h3><p className="text-sm text-stone-500">Cliquez pour modifier le contenu</p></div><Button variant="secondary" onClick={() => startEditLegal(key)}><Edit size={16} /> Modifier</Button></div>))}</div>)}</div>)}
                    {activeTab === 'shipping' && (<div className="animate-fadeIn"><div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Options de livraison</h2><Button onClick={() => { setEditingShipping('new'); setShippingForm({ name: '', description: '', price: '', minOrder: '0', maxOrder: '', freeAbove: '', active: true }); }}><Plus size={16} /> Ajouter</Button></div>{editingShipping ? (<div className="bg-white rounded-2xl p-6 shadow-sm"><h3 className="font-medium text-lg text-stone-900 mb-4">{editingShipping === 'new' ? 'Nouvelle option' : 'Modifier'}</h3><Input label="Nom" value={shippingForm.name} onChange={e => setShippingForm({...shippingForm, name: e.target.value})} placeholder="Ex: Colissimo" /><Input label="Description" value={shippingForm.description} onChange={e => setShippingForm({...shippingForm, description: e.target.value})} placeholder="Ex: Livraison en 2-3 jours" /><div className="grid grid-cols-2 gap-4"><Input label="Prix (€)" type="number" step="0.01" value={shippingForm.price} onChange={e => setShippingForm({...shippingForm, price: e.target.value})} /><Input label="Gratuit à partir de (€)" type="number" value={shippingForm.freeAbove} onChange={e => setShippingForm({...shippingForm, freeAbove: e.target.value})} placeholder="Laisser vide si jamais gratuit" /></div><div className="grid grid-cols-2 gap-4"><Input label="Commande min (€)" type="number" value={shippingForm.minOrder} onChange={e => setShippingForm({...shippingForm, minOrder: e.target.value})} /><Input label="Commande max (€)" type="number" value={shippingForm.maxOrder} onChange={e => setShippingForm({...shippingForm, maxOrder: e.target.value})} placeholder="Laisser vide si pas de max" /></div><label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={shippingForm.active} onChange={e => setShippingForm({...shippingForm, active: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded" /><span className="text-sm text-stone-700">Option active</span></label><div className="flex gap-4"><Button variant="secondary" onClick={() => setEditingShipping(null)}>Annuler</Button><Button onClick={() => { const data = { name: shippingForm.name, description: shippingForm.description, price: parseFloat(shippingForm.price) || 0, minOrder: parseFloat(shippingForm.minOrder) || 0, maxOrder: shippingForm.maxOrder ? parseFloat(shippingForm.maxOrder) : null, freeAbove: shippingForm.freeAbove ? parseFloat(shippingForm.freeAbove) : null, active: shippingForm.active }; if (editingShipping === 'new') { addShippingOption(data); } else { updateShippingOption(editingShipping, data); } setEditingShipping(null); }}><Check size={16} /> Enregistrer</Button></div></div>) : (<div className="bg-white rounded-2xl shadow-sm overflow-hidden"><table className="w-full"><thead className="bg-stone-50"><tr><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Option</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Prix</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Gratuit à partir de</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Statut</th><th className="text-right px-6 py-4 text-sm font-medium text-stone-600">Actions</th></tr></thead><tbody className="divide-y divide-stone-100">{shippingOptions.map(opt => (<tr key={opt.id} className="hover:bg-stone-50"><td className="px-6 py-4"><p className="font-medium text-stone-900">{opt.name}</p><p className="text-sm text-stone-500">{opt.description}</p></td><td className="px-6 py-4 font-medium">{parseFloat(opt.price).toFixed(2)} €</td><td className="px-6 py-4">{opt.freeAbove ? parseFloat(opt.freeAbove).toFixed(2) + ' €' : '-'}</td><td className="px-6 py-4"><span className={"text-xs px-2 py-1 rounded-full " + (opt.active ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600')}>{opt.active ? 'Actif' : 'Inactif'}</span></td><td className="px-6 py-4 text-right"><button onClick={() => { setEditingShipping(opt.id); setShippingForm({ name: opt.name, description: opt.description, price: String(opt.price), minOrder: String(opt.minOrder || 0), maxOrder: opt.maxOrder ? String(opt.maxOrder) : '', freeAbove: opt.freeAbove ? String(opt.freeAbove) : '', active: opt.active }); }} className="p-2 hover:bg-stone-100 rounded-lg text-stone-600"><Edit size={18} /></button><button onClick={() => { if (window.confirm('Supprimer cette option ?')) deleteShippingOption(opt.id); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash size={18} /></button></td></tr>))}</tbody></table></div>)}</div>)}
                    {activeTab === 'newsletter' && (<div className="animate-fadeIn"><h2 className="font-editorial text-3xl text-emerald-950 mb-8">Abonnes Newsletter</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Mail size={24} className="text-emerald-600" /><span className="text-xs text-stone-500">Total</span></div><p className="text-3xl font-bold text-stone-900">{newsletterSubscribers.length}</p><p className="text-sm text-stone-500">abonnes</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Users size={24} className="text-blue-600" /><span className="text-xs text-stone-500">Actifs</span></div><p className="text-3xl font-bold text-stone-900">{newsletterSubscribers.filter(s => s.active).length}</p><p className="text-sm text-stone-500">abonnes actifs</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Calendar size={24} className="text-purple-600" /><span className="text-xs text-stone-500">Ce mois</span></div><p className="text-3xl font-bold text-stone-900">{newsletterSubscribers.filter(s => new Date(s.date).getMonth() === new Date().getMonth()).length}</p><p className="text-sm text-stone-500">nouveaux</p></div></div>{newsletterSubscribers.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center shadow-sm"><Mail size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Aucun abonne pour le moment</p><p className="text-sm text-stone-400 mt-2">Les visiteurs peuvent s'inscrire via le popup ou le footer</p></div>) : (<div className="bg-white rounded-2xl shadow-sm overflow-hidden"><div className="p-4 border-b border-stone-100 flex justify-between items-center"><span className="text-sm text-stone-600">{newsletterSubscribers.length} abonne(s)</span><Button size="sm" variant="secondary" onClick={() => { const csv = 'Email,Prénom,Date inscription\\n' + newsletterSubscribers.map(s => s.email + ',' + (s.firstName || '') + ',' + new Date(s.date).toLocaleDateString('fr-FR')).join('\\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'newsletter_subscribers.csv'; a.click(); }}><Download size={16} /> Exporter CSV</Button></div><table className="w-full"><thead className="bg-stone-50"><tr><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Email</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Prénom</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Date</th><th className="text-right px-6 py-4 text-sm font-medium text-stone-600">Actions</th></tr></thead><tbody className="divide-y divide-stone-100">{newsletterSubscribers.slice().reverse().map(sub => (<tr key={sub.id} className="hover:bg-stone-50"><td className="px-6 py-4 font-medium text-stone-900">{sub.email}</td><td className="px-6 py-4 text-stone-600">{sub.firstName || '-'}</td><td className="px-6 py-4 text-stone-500 text-sm">{new Date(sub.date).toLocaleDateString('fr-FR')}</td><td className="px-6 py-4 text-right"><button onClick={() => unsubscribeNewsletter(sub.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Désabonner"><Trash size={18} /></button></td></tr>))}</tbody></table></div>)}</div>)}
                    {activeTab === 'actualites' && (<div className="animate-fadeIn"><div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Actualités Instagram</h2><Button onClick={() => { setEditingActualite('new'); setActualiteForm({ title: '', description: '', image: '', instagramUrl: '', active: true }); }}><Plus size={16} /> Ajouter manuellement</Button></div><div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border border-pink-100"><div className="flex items-center gap-3 mb-4"><Instagram size={24} className="text-pink-600" /><h3 className="font-medium text-lg text-stone-900">Importer depuis Instagram</h3></div><p className="text-stone-600 text-sm mb-4">Collez le lien d'une publication Instagram pour importer automatiquement l'image et les infos.</p><div className="flex gap-3"><input type="text" value={instagramImportUrl} onChange={e => setInstagramImportUrl(e.target.value)} placeholder="https://instagram.com/p/XXXX ou https://instagram.com/reel/XXXX" className="flex-1 px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white" /><Button onClick={importFromInstagram} disabled={instagramLoading || !instagramImportUrl} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">{instagramLoading ? <><span className="animate-spin mr-2">⏳</span> Import...</> : <><Download size={16} /> Importer</>}</Button></div></div><p className="text-stone-600 mb-6">Les publications importées sont en attente d'approbation. Activez-les pour les afficher sur le site.</p>{editingActualite ? (<div className="bg-white rounded-2xl p-6 shadow-sm"><h3 className="font-medium text-lg text-stone-900 mb-4">{editingActualite === 'new' ? 'Nouvelle actualité' : 'Modifier l\'actualité'}</h3><Input label="Titre" value={actualiteForm.title} onChange={e => setActualiteForm({...actualiteForm, title: e.target.value})} placeholder="Ex: Nouvelle collection printemps" /><Textarea label="Description" value={actualiteForm.description} onChange={e => setActualiteForm({...actualiteForm, description: e.target.value})} placeholder="Décrivez votre actualité..." /><Input label="URL de l'image" value={actualiteForm.image} onChange={e => setActualiteForm({...actualiteForm, image: e.target.value})} placeholder="https://..." /><Input label="Lien Instagram (optionnel)" value={actualiteForm.instagramUrl} onChange={e => setActualiteForm({...actualiteForm, instagramUrl: e.target.value})} placeholder="https://instagram.com/p/..." /><label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={actualiteForm.active} onChange={e => setActualiteForm({...actualiteForm, active: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded" /><span className="text-sm text-stone-700">Actualité active</span></label><div className="flex gap-4"><Button variant="secondary" onClick={() => setEditingActualite(null)}>Annuler</Button><Button onClick={() => { const data = { title: actualiteForm.title, description: actualiteForm.description, image: actualiteForm.image, instagramUrl: actualiteForm.instagramUrl, active: actualiteForm.active }; if (editingActualite === 'new') { addActualite(data); } else { updateActualite(editingActualite, data); } setEditingActualite(null); }}><Check size={16} /> Enregistrer</Button></div></div>) : actualites.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center shadow-sm"><Instagram size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Aucune actualité</p><p className="text-sm text-stone-400 mt-2">Ajoutez votre première actualité liée à Instagram</p></div>) : (<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{actualites.map(actu => (<div key={actu.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-100"><div className="aspect-square"><img src={actu.image} alt={actu.title} className="w-full h-full object-cover" loading="lazy" /></div><div className="p-4"><div className="flex items-center justify-between mb-2"><span className={"text-xs px-2 py-1 rounded-full " + (actu.active ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600')}>{actu.active ? 'Active' : 'Inactive'}</span><span className="text-xs text-stone-500">{new Date(actu.date).toLocaleDateString('fr-FR')}</span></div><h4 className="font-medium text-stone-900 mb-1">{actu.title}</h4><p className="text-sm text-stone-500 line-clamp-2 mb-3">{actu.description}</p>{actu.instagramUrl && <a href={actu.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-pink-600 hover:text-pink-700 flex items-center gap-1"><Instagram size={12} /> Voir sur Instagram</a>}<div className="flex gap-2 mt-3 pt-3 border-t border-stone-100"><button onClick={() => { setEditingActualite(actu.id); setActualiteForm({ title: actu.title, description: actu.description, image: actu.image, instagramUrl: actu.instagramUrl || '', active: actu.active }); }} className="flex-1 py-2 text-sm text-stone-600 hover:bg-stone-50 rounded-lg"><Edit size={14} className="inline mr-1" /> Modifier</button><button onClick={() => { if (window.confirm('Supprimer cette actualite ?')) deleteActualite(actu.id); }} className="py-2 px-3 text-sm text-red-500 hover:bg-red-50 rounded-lg"><Trash size={14} /></button></div></div></div>))}</div>)}</div>)}
                    {activeTab === 'emails' && (<div className="animate-fadeIn"><div className="flex justify-between items-center mb-8"><h2 className="font-editorial text-3xl text-emerald-950">Emails envoyés (simulation)</h2>{emailLogs.length > 0 && <Button variant="secondary" onClick={clearEmailLogs}><Trash size={16} /> Vider l'historique</Button>}</div><p className="text-stone-600 mb-6">Historique des emails envoyés automatiquement par le systeme. Note : il s'agit d'une simulation, les emails ne sont pas reellement envoyés.</p><div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Mail size={24} className="text-blue-600" /><span className="text-xs text-stone-500">Total</span></div><p className="text-3xl font-bold text-stone-900">{emailLogs.length}</p><p className="text-sm text-stone-500">emails envoyés</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><ShoppingCart size={24} className="text-emerald-600" /><span className="text-xs text-stone-500">Commandes</span></div><p className="text-3xl font-bold text-stone-900">{emailLogs.filter(e => e.type.startsWith('order')).length}</p><p className="text-sm text-stone-500">confirmations</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Users size={24} className="text-purple-600" /><span className="text-xs text-stone-500">Comptes</span></div><p className="text-3xl font-bold text-stone-900">{emailLogs.filter(e => e.type === 'account_created').length}</p><p className="text-sm text-stone-500">inscriptions</p></div><div className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex items-center justify-between mb-4"><Mail size={24} className="text-pink-600" /><span className="text-xs text-stone-500">Newsletter</span></div><p className="text-3xl font-bold text-stone-900">{emailLogs.filter(e => e.type === 'newsletter_welcome').length}</p><p className="text-sm text-stone-500">abonnements</p></div></div>{emailLogs.length === 0 ? (<div className="bg-white rounded-2xl p-12 text-center shadow-sm"><Mail size={48} className="mx-auto text-stone-300 mb-4" /><p className="text-stone-500">Aucun email envoyé</p><p className="text-sm text-stone-400 mt-2">Les emails seront affiches ici lorsque des actions declencheront des notifications</p></div>) : (<div className="bg-white rounded-2xl shadow-sm overflow-hidden"><table className="w-full"><thead className="bg-stone-50"><tr><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Type</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Destinataire</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Sujet</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Date</th><th className="text-left px-6 py-4 text-sm font-medium text-stone-600">Statut</th></tr></thead><tbody className="divide-y divide-stone-100">{emailLogs.slice(0, 50).map(email => (<tr key={email.id} className="hover:bg-stone-50"><td className="px-6 py-4"><span className={"text-xs px-2 py-1 rounded-full " + (email.type === 'order_confirmation' ? 'bg-emerald-100 text-emerald-700' : email.type === 'order_shipped' ? 'bg-orange-100 text-orange-700' : email.type === 'account_created' ? 'bg-purple-100 text-purple-700' : email.type === 'newsletter_welcome' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700')}>{email.type === 'order_confirmation' ? 'Confirmation' : email.type === 'order_shipped' ? 'Expédition' : email.type === 'account_created' ? 'Inscription' : email.type === 'newsletter_welcome' ? 'Newsletter' : 'Mise à jour'}</span></td><td className="px-6 py-4 text-sm text-stone-900">{email.recipient}</td><td className="px-6 py-4 text-sm text-stone-600">{email.subject}</td><td className="px-6 py-4 text-sm text-stone-500">{new Date(email.sentAt).toLocaleString('fr-FR')}</td><td className="px-6 py-4"><span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Envoyé</span></td></tr>))}</tbody></table>{emailLogs.length > 50 && <div className="p-4 text-center text-sm text-stone-500">Affichage des 50 derniers emails</div>}</div>)}</div>)}
                </div>
            </div>
            <Modal isOpen={showModal && modalType === 'product'} onClose={closeModal} title={editingItem ? 'Modifier le produit' : 'Nouveau produit'}><ProductForm product={editingItem} onSave={editingItem ? (data) => { updateProduct(editingItem.id, data); closeModal(); } : (data) => { addProduct(data); closeModal(); }} categories={categories} onCancel={closeModal} /></Modal>
            <Modal isOpen={showModal && modalType === 'event'} onClose={closeModal} title={editingItem ? "Modifier l'événement" : 'Nouvel événement'}><EventForm event={editingItem} onSave={editingItem ? (data) => { updateEvent(editingItem.id, data); closeModal(); } : (data) => { addEvent(data); closeModal(); }} onCancel={closeModal} /></Modal>
            <Modal isOpen={showModal && modalType === 'promo'} onClose={closeModal} title={editingItem ? 'Modifier le code promo' : 'Nouveau code promo'}><PromoForm promo={editingItem} onSave={editingItem ? (data) => { updatePromo(editingItem.id, data); closeModal(); } : (data) => { addPromo(data); closeModal(); }} onCancel={closeModal} /></Modal>
        </div>
    );
};

// FORMULAIRES ADMIN
const ProductForm = ({ product, onSave, categories, onCancel }) => {
    const [form, setForm] = useState(product ? { ...product, categoryId: product.categoryId ?? product.category_id, price: String(product.price), stock: String(product.stock), sort_order: String(product.sort_order || product.sortOrder || 0) } : { name: '', subtitle: '', description: '', price: '', stock: '', categoryId: categories[0]?.id || '', image: '', tag: '', active: true, featured: false, sort_order: '0' });
    const handleSubmit = (e) => { e.preventDefault(); const data = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), categoryId: parseInt(form.categoryId), sort_order: parseInt(form.sort_order || 0) }; if (isProductionMode()) { data.category_id = data.categoryId; delete data.categoryId; } onSave(data); };
    return (<form onSubmit={handleSubmit}><Input label="Nom" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /><Input label="Sous-titre" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} /><Textarea label="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /><div className="grid grid-cols-2 gap-4"><Input label="Prix (€)" type="number" step="0.01" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} /><Input label="Stock" type="number" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} /></div><Select label="Catégorie" value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} options={categories.map(c => ({ value: c.id, label: c.name }))} /><Input label="URL Image" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." /><Input label="Tag (optionnel)" value={form.tag || ''} onChange={e => setForm({...form, tag: e.target.value})} placeholder="Best-seller, Nouveau..." /><div className="flex gap-4 mb-4"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded" /><span className="text-sm text-stone-700">Produit actif</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured || false} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 text-amber-500 rounded" /><span className="text-sm text-stone-700">A la une</span></label></div>{form.featured && <Input label="Ordre d'affichage (0 = premier)" type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: e.target.value})} />}<div className="flex gap-4"><Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button><Button type="submit" className="flex-1">{product ? 'Enregistrer' : 'Ajouter'}</Button></div></form>);
};
const EventForm = ({ event, onSave, onCancel }) => {
    const [form, setForm] = useState(event || { title: '', description: '', date: '', location: '', active: true });
    const handleSubmit = (e) => { e.preventDefault(); onSave(form); };
    return (<form onSubmit={handleSubmit}><Input label="Titre" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} /><Textarea label="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /><Input label="Date" type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} /><Input label="Lieu" required value={form.location} onChange={e => setForm({...form, location: e.target.value})} /><label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded" /><span className="text-sm text-stone-700">Événement actif</span></label><div className="flex gap-4"><Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button><Button type="submit" className="flex-1">{event ? 'Enregistrer' : 'Ajouter'}</Button></div></form>);
};
const PromoForm = ({ promo, onSave, onCancel }) => {
    const [form, setForm] = useState(promo ? { ...promo, discount: String(promo.discount), minOrder: String(promo.minOrder), maxUsage: String(promo.maxUsage) } : { code: '', discount: '', type: 'percent', minOrder: '0', maxUsage: '100', active: true });
    const handleSubmit = (e) => { e.preventDefault(); onSave({ ...form, code: form.code.toUpperCase(), discount: parseFloat(form.discount), minOrder: parseFloat(form.minOrder), maxUsage: parseInt(form.maxUsage) }); };
    return (<form onSubmit={handleSubmit}><Input label="Code" required value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="PROMO2024" /><div className="grid grid-cols-2 gap-4"><Input label="Réduction" type="number" step="0.01" required value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} /><Select label="Type" value={form.type} onChange={e => setForm({...form, type: e.target.value})} options={[{ value: 'percent', label: 'Pourcentage (%)' }, { value: 'fixed', label: 'Montant fixe (EUR)' }]} /></div><div className="grid grid-cols-2 gap-4"><Input label="Commande min. (€)" type="number" value={form.minOrder} onChange={e => setForm({...form, minOrder: e.target.value})} /><Input label="Utilisations max." type="number" required value={form.maxUsage} onChange={e => setForm({...form, maxUsage: e.target.value})} /></div><label className="flex items-center gap-2 mb-4 cursor-pointer"><input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="w-4 h-4 text-emerald-600 rounded" /><span className="text-sm text-stone-700">Code actif</span></label><div className="flex gap-4"><Button type="button" variant="secondary" onClick={onCancel}>Annuler</Button><Button type="submit" className="flex-1">{promo ? 'Enregistrer' : 'Ajouter'}</Button></div></form>);
};

// PAGE CONFIRMATION COMMANDE
const OrderConfirmationPage = () => {
    const { lastOrder, setPage, siteContent } = useApp();
    if (!lastOrder) return (<div className="min-h-screen pt-32 pb-24 flex items-center justify-center"><div className="text-center"><h2 className="font-editorial text-2xl text-stone-800 mb-4">Aucune commande recente</h2><Button onClick={() => setPage('home')}>Retour a l'accueil</Button></div></div>);
    return (
        <div className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-emerald-50/50 to-white">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-emerald-600" />
                    </div>
                    <h1 className="font-editorial text-4xl text-emerald-950 mb-3">Merci pour votre commande !</h1>
                    <p className="text-stone-600 text-lg">Votre commande a bien ete enregistree</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 flex items-start gap-3">
                    <Clock size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-amber-900 font-medium mb-1">En attente de reglement</p>
                        <p className="text-amber-800 text-sm leading-relaxed">L'atelier vous recontacte par email sous 24&nbsp;h avec le moyen de paiement. La confection demarre des reception du reglement.</p>
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-stone-100">
                        <div><p className="text-sm text-stone-500 mb-1">Code de suivi</p><p className="text-2xl font-mono font-bold text-emerald-700">{lastOrder.trackingCode || lastOrder.tracking_code}</p></div>
                        <div className="text-right"><p className="text-sm text-stone-500 mb-1">Total</p><p className="text-2xl font-bold text-emerald-900">{parseFloat(lastOrder.total).toFixed(2)} €</p></div>
                    </div>
                    {lastOrder.items && lastOrder.items.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-medium text-stone-900 mb-3">Articles commandes</h3>
                            <div className="space-y-3">{lastOrder.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
                                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />}
                                    <div className="flex-1"><p className="font-medium text-stone-900">{item.name}</p>{item.subtitle && <p className="text-sm text-stone-500">{item.subtitle}</p>}</div>
                                    <div className="text-right"><p className="text-sm text-stone-500">x{item.quantity}</p><p className="font-medium">{(parseFloat(item.price) * item.quantity).toFixed(2)} €</p></div>
                                </div>
                            ))}</div>
                        </div>
                    )}
                    {lastOrder.customer && (
                        <div className="mb-6 pb-6 border-b border-stone-100">
                            <h3 className="font-medium text-stone-900 mb-2">Livraison</h3>
                            <p className="text-stone-600">{lastOrder.customer.firstName} {lastOrder.customer.lastName}</p>
                            <p className="text-stone-600">{lastOrder.customer.address}</p>
                            <p className="text-stone-600">{lastOrder.customer.postalCode} {lastOrder.customer.city}</p>
                            {lastOrder.shippingMethod && <p className="text-sm text-stone-500 mt-2">Mode : {lastOrder.shippingMethod}</p>}
                        </div>
                    )}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                            <Truck size={20} className="text-emerald-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-emerald-800">Suivez votre commande</p>
                                <p className="text-sm text-emerald-600 mt-1">Utilisez votre code de suivi <strong>{lastOrder.trackingCode || lastOrder.tracking_code}</strong> et votre email pour suivre l'avancement de votre commande.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => setPage('tracking')}>Suivre ma commande</Button>
                    <Button variant="secondary" onClick={() => setPage('shop')}>Continuer mes achats</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

// APP
const App = () => {
    const { page, apiLoading, apiError } = useApp();
    const renderPage = () => { switch(page) { case 'shop': return <ShopPage />; case 'product': return <ProductPage />; case 'events': return <EventsPage />; case 'actualites': return <ActualitesPage />; case 'favorites': return <FavoritesPage />; case 'auth': return <AuthPage />; case 'account': return <AccountPage />; case 'about': return <AboutPage />; case 'checkout': return <CheckoutPage />; case 'confirmation': return <OrderConfirmationPage />; case 'login': return <LoginPage />; case 'admin': return <AdminDashboard />; case 'legal': return <LegalPage />; case 'tracking': return <TrackingPage />; case 'reset-password': return <ResetPasswordPage />; default: return <HomePage />; } };
    if (apiLoading) {
        return (<div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]" role="status" aria-label="Chargement"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div><p className="text-emerald-800 font-medium">Chargement...</p></div></div>);
    }
    if (apiError) {
        return (<div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]"><div className="text-center max-w-md px-4"><div className="text-red-500 text-5xl mb-4">!</div><h2 className="text-xl font-bold text-stone-800 mb-2">Erreur de connexion</h2><p className="text-stone-600 mb-4">{apiError}</p><button onClick={() => window.location.reload()} className="px-6 py-2 bg-emerald-700 text-white rounded-full hover:bg-emerald-800">Reessayer</button></div></div>);
    }
    return (<div className="min-h-screen overflow-x-hidden"><a href="#main-content" className="absolute -top-10 left-4 bg-emerald-900 text-white px-4 py-2 rounded-b-lg z-[110] focus:top-0 transition-all">Aller au contenu</a>{page !== 'admin' && <Navigation />}<main id="main-content">{renderPage()}</main><CartSidebar /><SearchModal /><CookieBanner /><NewsletterPopup /><Notification /></div>);
};
const AppWrapper = () => (<AppProvider><App /></AppProvider>);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWrapper />);
