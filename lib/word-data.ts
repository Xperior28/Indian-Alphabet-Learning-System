export interface Word {
  id: string
  word: string
  meaning: string
  characters: string[]
}

export const words: Record<string, Word[]> = {
  hindi: [
    {
      id: "h1",
      word: "कमल",
      meaning: "Lotus",
      characters: ["क", "म", "ल"],
    },
    {
      id: "h2",
      word: "पुस्तक",
      meaning: "Book",
      characters: ["प", "ु", "स", "त", "क"],
    },
    {
      id: "h3",
      word: "स्कूल",
      meaning: "School",
      characters: ["स", "्", "क", "ू", "ल"],
    },
    {
      id: "h4",
      word: "मित्र",
      meaning: "Friend",
      characters: ["म", "ि", "त", "्", "र"],
    },
    {
      id: "h5",
      word: "विद्यालय",
      meaning: "School",
      characters: ["व", "ि", "द", "्", "य", "ा", "ल", "य"],
    },
    {
      id: "h6",
      word: "स्वागत",
      meaning: "Welcome",
      characters: ["स", "्", "व", "ा", "ग", "त"],
    },
    {
      id: "h7",
      word: "प्रकाश",
      meaning: "Light",
      characters: ["प", "्", "र", "क", "ा", "श"],
    },
    {
      id: "h8",
      word: "सुंदर",
      meaning: "Beautiful",
      characters: ["स", "ु", "ं", "द", "र"],
    },
  ],
  tamil: [
    {
      id: "t1",
      word: "மலர்",
      meaning: "Flower",
      characters: ["ம", "ல", "ர"],
    },
    {
      id: "t2",
      word: "புத்தகம்",
      meaning: "Book",
      characters: ["ப", "ு", "த்", "த", "க", "ம்"],
    },
    {
      id: "t3",
      word: "பள்ளி",
      meaning: "School",
      characters: ["ப", "ள்", "ள", "ி"],
    },
    {
      id: "t4",
      word: "நண்பர்",
      meaning: "Friend",
      characters: ["ந", "ண", "்", "ப", "ர்"],
    },
    {
      id: "t5",
      word: "விளக்கு",
      meaning: "Light",
      characters: ["வ", "ி", "ள", "க்", "க", "ு"],
    },
    {
      id: "t6",
      word: "வரவேற்பு",
      meaning: "Welcome",
      characters: ["வ", "ர", "வ", "ே", "ற", "்", "ப", "ு"],
    },
    {
      id: "t7",
      word: "அழகு",
      meaning: "Beautiful",
      characters: ["அ", "ழ", "க", "ு"],
    },
    {
      id: "t8",
      word: "கல்வி",
      meaning: "Education",
      characters: ["க", "ல்", "்", "வ", "ி"],
    },
  ],
  bengali: [
    {
      id: "b1",
      word: "ফুল",
      meaning: "Flower",
      characters: ["ফ", "ু", "ল"],
    },
    {
      id: "b2",
      word: "বই",
      meaning: "Book",
      characters: ["ব", "ই"],
    },
    {
      id: "b3",
      word: "স্কুল",
      meaning: "School",
      characters: ["স", "্", "ক", "ু", "ল"],
    },
    {
      id: "b4",
      word: "বন্ধু",
      meaning: "Friend",
      characters: ["ব", "ন", "্", "ধ", "ু"],
    },
    {
      id: "b5",
      word: "বিদ্যালয়",
      meaning: "School",
      characters: ["ব", "ি", "দ", "্", "য", "া", "ল", "য়"],
    },
    {
      id: "b6",
      word: "স্বাগত",
      meaning: "Welcome",
      characters: ["স", "্", "ব", "া", "গ", "ত"],
    },
    {
      id: "b7",
      word: "আলো",
      meaning: "Light",
      characters: ["আ", "ল", "ো"],
    },
    {
      id: "b8",
      word: "সুন্দর",
      meaning: "Beautiful",
      characters: ["স", "ু", "ন", "্", "দ", "র"],
    },
  ],
  telugu: [
    {
      id: "te1",
      word: "పువ్వు",
      meaning: "Flower",
      characters: ["ప", "ు", "వ", "్", "వ", "ు"],
    },
    {
      id: "te2",
      word: "పుస్తకం",
      meaning: "Book",
      characters: ["ప", "ు", "స", "్", "త", "క", "ం"],
    },
    {
      id: "te3",
      word: "బడి",
      meaning: "School",
      characters: ["బ", "డ", "ి"],
    },
    {
      id: "te4",
      word: "స్నేహితుడు",
      meaning: "Friend",
      characters: ["స", "్", "న", "ే", "హ", "ి", "త", "ు", "డ", "ు"],
    },
    {
      id: "te5",
      word: "విద్యాలయం",
      meaning: "School",
      characters: ["వ", "ి", "ద", "్", "య", "ా", "ల", "య", "ం"],
    },
    {
      id: "te6",
      word: "స్వాగతం",
      meaning: "Welcome",
      characters: ["స", "్", "వ", "ా", "గ", "త", "ం"],
    },
    {
      id: "te7",
      word: "కాంతి",
      meaning: "Light",
      characters: ["క", "ా", "ం", "త", "ి"],
    },
    {
      id: "te8",
      word: "అందమైన",
      meaning: "Beautiful",
      characters: ["అ", "ం", "ద", "మ", "ై", "న"],
    },
  ],
  kannada: [
    {
      id: "k1",
      word: "ಹೂವು",
      meaning: "Flower",
      characters: ["ಹ", "ೂ", "ವ", "ು"],
    },
    {
      id: "k2",
      word: "ಪುಸ್ತಕ",
      meaning: "Book",
      characters: ["ಪ", "ು", "ಸ", "್", "ತ", "ಕ"],
    },
    {
      id: "k3",
      word: "ಶಾಲೆ",
      meaning: "School",
      characters: ["ಶ", "ಾ", "ಲ", "ೆ"],
    },
    {
      id: "k4",
      word: "ಸ್ನೇಹಿತ",
      meaning: "Friend",
      characters: ["ಸ", "್", "ನ", "ೇ", "ಹ", "ಿ", "ತ"],
    },
    {
      id: "k5",
      word: "ವಿದ್ಯಾಲಯ",
      meaning: "School",
      characters: ["ವ", "ಿ", "ದ", "್", "ಯ", "ಾ", "ಲ", "ಯ"],
    },
    {
      id: "k6",
      word: "ಸ್ವಾಗತ",
      meaning: "Welcome",
      characters: ["ಸ", "್", "ವ", "ಾ", "ಗ", "ತ"],
    },
    {
      id: "k7",
      word: "ಬೆಳಕು",
      meaning: "Light",
      characters: ["ಬ", "ೆ", "ಳ", "ಕ", "ು"],
    },
    {
      id: "k8",
      word: "ಸುಂದರ",
      meaning: "Beautiful",
      characters: ["ಸ", "ು", "ಂ", "ದ", "ರ"],
    },
  ],
  malayalam: [
    {
      id: "m1",
      word: "പൂവ്",
      meaning: "Flower",
      characters: ["പ", "ൂ", "വ", "്"],
    },
    {
      id: "m2",
      word: "പുസ്തകം",
      meaning: "Book",
      characters: ["പ", "ു", "സ", "്", "ത", "ക", "ം"],
    },
    {
      id: "m3",
      word: "വിദ്യാലയം",
      meaning: "School",
      characters: ["വ", "ി", "ദ", "്", "യ", "ാ", "ല", "യ", "ം"],
    },
    {
      id: "m4",
      word: "സുഹൃത്ത്",
      meaning: "Friend",
      characters: ["സ", "ു", "ഹ", "ൃ", "ത", "്", "ത", "്"],
    },
    {
      id: "m5",
      word: "സ്വാഗതം",
      meaning: "Welcome",
      characters: ["സ", "്", "വ", "ാ", "ഗ", "ത", "ം"],
    },
    {
      id: "m6",
      word: "വെളിച്ചം",
      meaning: "Light",
      characters: ["വ", "െ", "ള", "ി", "ച", "്", "ച", "ം"],
    },
    {
      id: "m7",
      word: "സുന്ദരം",
      meaning: "Beautiful",
      characters: ["സ", "ു", "ം", "ദ", "ര", "ം"],
    },
    {
      id: "m8",
      word: "പാഠശാല",
      meaning: "School",
      characters: ["പ", "ാ", "ഠ", "ശ", "ാ", "ല"],
    },
  ],
} 