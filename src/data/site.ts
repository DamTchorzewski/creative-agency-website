// All texts of the site in one place. Nord Studio is a fictional agency: the people, clients, numbers and contact
// details are made up (example.com, a 111 111 111 phone number).
import type { ImageMetadata } from "astro";

import member1 from "@/assets/team/member-1.jpg";
import member2 from "@/assets/team/member-2.jpg";
import member3 from "@/assets/team/member-3.jpg";
import member4 from "@/assets/team/member-4.jpg";
import project1 from "@/assets/projects/project-1.jpg";
import project2 from "@/assets/projects/project-2.jpg";
import project3 from "@/assets/projects/project-3.jpg";
import project4 from "@/assets/projects/project-4.jpg";
import project5 from "@/assets/projects/project-5.jpg";
import project6 from "@/assets/projects/project-6.jpg";
import project7 from "@/assets/projects/project-7.jpg";
import project8 from "@/assets/projects/project-8.jpg";
import project9 from "@/assets/projects/project-9.jpg";

export const brand = {
  name: "Nord Studio",
  claim: "Efektywne rozwiązania dla Waszego biznesu",
  description:
    "Nord Studio to niezależna agencja kreatywna z Warszawy. Projektujemy i budujemy strony, aplikacje i marki, które pracują na wynik.",
};

export const contact = {
  email: "info@example.com",
  phone: "+48 111 111 111",
  phoneHref: "tel:+48111111111",
  street: "Aleje Jerozolimskie 21",
  city: "00‑001 Warszawa",
  hours: "pon.–pt. 9:00–17:00",
};

export const nav = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#proces", label: "Proces" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#zespol", label: "Zespół" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "X (Twitter)", href: "https://x.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
] as const;

export const clients = [
  "Nordwave",
  "Kaskada",
  "Polar Bank",
  "Vertica",
  "Lumen Labs",
  "Mosty",
  "Orbita",
  "Sienna",
] as const;

export const manifesto =
  "Jesteśmy zespołem projektantów, programistów i marketerów. Od pierwszego warsztatu po wdrożenie łączymy strategię, design i technologię, żeby Wasza marka wyglądała lepiej, działała szybciej i sprzedawała więcej.";

export type ServiceArt = "code" | "mobile" | "brand";

export const services: {
  title: string;
  lead: string;
  deliverables: string[];
  art: ServiceArt;
}[] = [
  {
    title: "Aplikacje komputerowe",
    lead: "Strony firmowe, sklepy i systemy webowe szyte na miarę. Szybkie, dostępne i gotowe na wzrost ruchu.",
    deliverables: ["Strony i sklepy", "Panele i systemy", "Integracje API", "Wydajność i SEO"],
    art: "code",
  },
  {
    title: "Aplikacje mobilne",
    lead: "Aplikacje na iOS i Androida, które klienci chcą mieć na ekranie głównym. Od prototypu po publikację w sklepach.",
    deliverables: ["iOS i Android", "Prototypy", "Testy z użytkownikami", "Publikacja w sklepach"],
    art: "mobile",
  },
  {
    title: "Rozwiązania graficzne",
    lead: "Identyfikacja wizualna, design system i materiały, które sprawiają, że marka jest rozpoznawalna w każdym kanale.",
    deliverables: ["Logo i identyfikacja", "Design system", "Kampanie", "Opakowania i druk"],
    art: "brand",
  },
];

export const processSteps = [
  {
    title: "Strategia",
    text: "Warsztaty z Waszym zespołem, analiza rynku i konkurencji. Ustalamy cele, mierniki i zakres, zanim powstanie pierwszy piksel.",
    tags: ["Warsztaty", "Analiza", "Cele i KPI"],
  },
  {
    title: "Projekt",
    text: "Architektura informacji, makiety i prototyp, który można kliknąć. Testujemy go z użytkownikami i dopracowujemy szczegóły.",
    tags: ["UX", "Prototyp", "Design system"],
  },
  {
    title: "Development",
    text: "Czysty kod, testy automatyczne i wdrożenia co tydzień. Widzicie postęp na żywo, a nie dopiero na końcu projektu.",
    tags: ["Front-end", "Back-end", "Testy"],
  },
  {
    title: "Rozwój",
    text: "Po starcie mierzymy, optymalizujemy i rozwijamy produkt. Opiekujemy się nim tak, jakby był nasz.",
    tags: ["Analityka", "Optymalizacja", "Opieka"],
  },
] as const;

export const stats = [
  { value: 12, suffix: "", label: "lat na rynku" },
  { value: 140, suffix: "+", label: "zrealizowanych projektów" },
  { value: 96, suffix: "%", label: "klientów wraca z kolejnym zleceniem" },
  { value: 24, suffix: " h", label: "na odpowiedź na każde zapytanie" },
] as const;

export const categories = [
  { id: "strony", label: "Strony" },
  { id: "aplikacje", label: "Aplikacje" },
  { id: "dizajn", label: "Dizajn" },
  { id: "marketing", label: "Marketing" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  year: number;
  client: string;
  scope: string[];
  lead: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  image: ImageMetadata;
  imageAlt: string;
  /** One of the nine panel tints defined in global.css (data-tone). */
  tone: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export const projects: Project[] = [
  {
    slug: "technocrack",
    title: "Technocrack",
    category: "strony",
    year: 2025,
    client: "Technocrack sp. z o.o.",
    scope: ["Strategia", "UX/UI", "Development"],
    lead: "Nowa strona firmy technologicznej, która w końcu mówi językiem klientów, a nie inżynierów.",
    challenge:
      "Stara strona była katalogiem funkcji: długie listy, brak ścieżki do kontaktu i czas ładowania powyżej sześciu sekund na telefonie.",
    solution:
      "Przebudowaliśmy architekturę wokół trzech problemów klientów, zaprojektowaliśmy sekcję zespołu budującą zaufanie i postawiliśmy stronę na statycznym hostingu.",
    results: [
      { value: "+68%", label: "zapytań ofertowych" },
      { value: "1,1 s", label: "ładowania na telefonie" },
      { value: "100", label: "w Lighthouse Accessibility" },
    ],
    image: project1,
    imageAlt: "Strona Technocrack z sekcją zespołu otwarta na laptopie",
    tone: 1,
  },
  {
    slug: "new-orlean-vs-golden-star",
    title: "New Orlean vs Golden Star",
    category: "dizajn",
    year: 2024,
    client: "Liga Miejska",
    scope: ["Ilustracja", "Kampania", "Social media"],
    lead: "Plakat i kampania meczu, które sprzedały halę w trzy dni.",
    challenge:
      "Mecz w środku tygodnia, mały budżet i konkurencja transmisji telewizyjnych. Trzeba było zatrzymać kciuk w feedzie.",
    solution:
      "Dynamiczna ilustracja z farbą w barwach obu drużyn, rozpisana na plakat, okładki wydarzeń i animowane formaty do relacji.",
    results: [
      { value: "3 dni", label: "do wyprzedania biletów" },
      { value: "2,4 mln", label: "wyświetleń kampanii" },
      { value: "×5", label: "zaangażowania w social media" },
    ],
    image: project2,
    imageAlt: "Ilustracja dwóch koszykarzy w barwach New Orlean i Golden Star",
    tone: 2,
  },
  {
    slug: "restauracja-seafood",
    title: "Restauracja Seafood",
    category: "aplikacje",
    year: 2025,
    client: "The Seafood Restaurant",
    scope: ["Aplikacja mobilna", "Branding", "Rezerwacje"],
    lead: "Aplikacja do rezerwacji i zamówień dla restauracji z trzydziestoletnią tradycją.",
    challenge:
      "Rezerwacje przez telefon w godzinach szczytu i brak danych o stałych gościach. Restauracja traciła stoliki i nie znała swoich klientów.",
    solution:
      "Aplikacja z rezerwacją w trzech dotknięciach, programem lojalnościowym i odświeżonym logo z rybą, które stało się ikoną aplikacji.",
    results: [
      { value: "72%", label: "rezerwacji przez aplikację" },
      { value: "4,8", label: "ocena w App Store" },
      { value: "−40%", label: "telefonów w godzinach szczytu" },
    ],
    image: project3,
    imageAlt: "Logo The Seafood Restaurant z rysunkiem ryby",
    tone: 3,
  },
  {
    slug: "projekt-prime",
    title: "Projekt Prime",
    category: "marketing",
    year: 2024,
    client: "Prime Audio",
    scope: ["Kampania", "Fotografia produktowa", "Performance"],
    lead: "Premiera słuchawek, w której produkt gra pierwsze skrzypce.",
    challenge:
      "Nowa marka audio na rynku zdominowanym przez gigantów. Bez rozpoznawalności i z budżetem jednej kampanii.",
    solution:
      "Minimalistyczna kampania oparta na ciszy i bieli, krótkie formaty wideo i precyzyjnie targetowane reklamy dla miłośników muzyki.",
    results: [
      { value: "ROAS 6,2", label: "zwrot z wydatków reklamowych" },
      { value: "18 tys.", label: "sprzedanych sztuk w kwartał" },
      { value: "+210%", label: "ruchu w sklepie" },
    ],
    image: project4,
    imageAlt: "Czarne słuchawki nauszne Prime na jasnym tle",
    tone: 4,
  },
  {
    slug: "projekt-boxes",
    title: "Projekt Boxes",
    category: "aplikacje",
    year: 2023,
    client: "Giftica",
    scope: ["Konfigurator", "Sklep internetowy", "Opakowania"],
    lead: "Konfigurator pudełek prezentowych, w którym klient projektuje opakowanie w przeglądarce.",
    challenge:
      "Zamówienia spływały mailem z odręcznymi szkicami, a każda wycena zajmowała zespołowi pół dnia.",
    solution:
      "Konfigurator z podglądem na żywo, automatyczną wyceną i plikiem do druku generowanym po złożeniu zamówienia.",
    results: [
      { value: "4 min", label: "zamiast pół dnia na wycenę" },
      { value: "+150%", label: "zamówień B2B" },
      { value: "0", label: "błędów w plikach do druku" },
    ],
    image: project5,
    imageAlt: "Dwa pudełka Giftica: białe i z szarej tektury",
    tone: 5,
  },
  {
    slug: "inspiration-has-no-borders",
    title: "Inspiration has no Borders",
    category: "strony",
    year: 2025,
    client: "Borders Travel",
    scope: ["UX/UI", "Development", "Mapy"],
    lead: "Strona biura podróży z interaktywną mapą kierunków i ciemnym, kinowym klimatem.",
    challenge:
      "Oferta setek kierunków bez dobrego sposobu na ich przeglądanie. Klienci gubili się w filtrach i wychodzili ze strony.",
    solution:
      "Interaktywna mapa świata jako główna nawigacja, krótkie opisy kierunków i ścieżka do kontaktu z doradcą z każdego miejsca strony.",
    results: [
      { value: "+3:20", label: "minuty średniego czasu wizyty" },
      { value: "−35%", label: "współczynnika odrzuceń" },
      { value: "+48%", label: "rozmów z doradcami" },
    ],
    image: project6,
    imageAlt: "Ciemna strona Inspiration has no Borders z mapą świata na monitorze",
    tone: 6,
  },
  {
    slug: "magazyn-limited-edition",
    title: "Magazyn Limited Edition",
    category: "dizajn",
    year: 2023,
    client: "Limited Edition",
    scope: ["Layout", "Typografia", "Druk"],
    lead: "Makieta i system typograficzny magazynu lifestyle'owego wydawanego w nakładzie kolekcjonerskim.",
    challenge:
      "Każdy numer składany od zera, przez co wydania nie wyglądały jak jeden tytuł, a skład trwał tygodniami.",
    solution:
      "Siatka, style i biblioteka modułów, które redakcja składa jak klocki. Szeryfowe nagłówki nadają tytułowi charakter.",
    results: [
      { value: "−60%", label: "czasu składu numeru" },
      { value: "12", label: "wydań w jednym systemie" },
      { value: "100%", label: "nakładu sprzedanego w przedsprzedaży" },
    ],
    image: project7,
    imageAlt: "Rozkładówka magazynu Limited Edition ze zdjęciami i dużym szeryfowym nagłówkiem",
    tone: 7,
  },
  {
    slug: "projekt-lab",
    title: "Projekt LAB",
    category: "marketing",
    year: 2024,
    client: "LAB Concept Store",
    scope: ["Identyfikacja", "Kampania otwarcia", "Social media"],
    lead: "Otwarcie concept store'u z identyfikacją zbudowaną na samych literach.",
    challenge:
      "Nowy sklep w zatłoczonej galerii. Trzeba było zbudować rozpoznawalność, zanim drzwi się otworzą.",
    solution:
      "Typograficzna identyfikacja z rozstrzelonym napisem LAB, metki i kampania odliczająca do otwarcia w mediach społecznościowych.",
    results: [
      { value: "11 tys.", label: "obserwujących przed otwarciem" },
      { value: "1 200", label: "gości pierwszego dnia" },
      { value: "+32%", label: "sprzedaży ponad plan" },
    ],
    image: project8,
    imageAlt: "Biała metka z napisem LAB na sznurku",
    tone: 8,
  },
  {
    slug: "growing-business",
    title: "Growing Business",
    category: "aplikacje",
    year: 2025,
    client: "Growing Business",
    scope: ["Aplikacja webowa", "Dashboard", "Integracje"],
    lead: "Panel dla małych firm, który zbiera sprzedaż, faktury i kampanie w jednym miejscu.",
    challenge:
      "Właściciele firm przełączali się między pięcioma narzędziami, żeby odpowiedzieć na proste pytanie: jak idzie ten miesiąc?",
    solution:
      "Jeden dashboard z integracjami sklepów i systemów księgowych, czytelnymi wykresami i cotygodniowym podsumowaniem na maila.",
    results: [
      { value: "5 → 1", label: "narzędzi w codziennej pracy" },
      { value: "3 tys.", label: "firm w pierwszym roku" },
      { value: "NPS 64", label: "zadowolenia użytkowników" },
    ],
    image: project9,
    imageAlt: "Strona Growing Business na ekranie laptopa",
    tone: 9,
  },
];

export const team: { name: string; role: string; photo: ImageMetadata; alt: string }[] = [
  {
    name: "Marek Wiśniewski",
    role: "Product Designer",
    photo: member1,
    alt: "Marek Wiśniewski, mężczyzna z brodą w okularach",
  },
  {
    name: "Anna Kowalczyk",
    role: "Frontend Developer",
    photo: member2,
    alt: "Anna Kowalczyk, kobieta w okularach i czarnej marynarce",
  },
  {
    name: "Tomasz Lewandowski",
    role: "Marketing",
    photo: member3,
    alt: "Tomasz Lewandowski, uśmiechnięty mężczyzna w błękitnej koszuli",
  },
  {
    name: "Piotr Zieliński",
    role: "UI Designer",
    photo: member4,
    alt: "Piotr Zieliński, mężczyzna w okularach i czarnej koszulce",
  },
];
