export interface DevoteeWish {
  id: string;
  name: string;
  village: string;
  message: string;
  category: "wishes" | "prayer" | "navas" | "gratitude";
  timestamp: string;
  flowersCount: number;
  isOfficial?: boolean;
}

export const INITIAL_WISHES: DevoteeWish[] = [
  {
    id: "wish-1",
    name: "मिलिंद चौधरी व परिवार",
    village: "डांगरवाडा, असोदा",
    message: "हे जगदंबे, श्री छिन्नमस्ता माते, संपूर्ण असोदा गावाला व सर्व भाविकांना सुख, आरोग्य आणि भरभराट लाभू दे. नवरात्रोत्सव २०२६ मंगलमय होवो!",
    category: "wishes",
    timestamp: "१५ ऑक्टोबर २०२६",
    flowersCount: 148,
    isOfficial: true,
  },
];
