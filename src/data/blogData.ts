import blogImg1 from "@/assets/chigagoexpo.jpg";
import blogImg2 from "@/assets/award1.jpg";
import blogImg3 from "@/assets/annualevent.jpg";
import blogImg4 from "@/assets/dubai1.jpg";
import blogImg5 from "@/assets/importandexport.jpg";
import blogImg6 from "@/assets/blog-page/lasquality-CVtmSdYv.svg";
import blogImg7 from "@/assets/blog-page/vs-C68xEDJ1.svg";
import blogImg8 from "@/assets/blog-page/Ethcof-CWnx5UW2.svg";
import blogImg9 from "@/assets/blog-page/value-BY-PtGiN.svg";

// Gallery photos
import photoBirthplace from "@/assets/chigago1.jpg";
import photoCafeShow from "@/assets/chigago2.jpg";
import photoHome from "@/assets/chigago3.jpg";
import photoSpeciality from "@/assets/chigago4.jpg";
import award from "@/assets/award2.jpg";
import award2 from "@/assets/award3.jpg"
import award1 from "@/assets/award1.jpg";
import annual1 from "@/assets/annual1.jpg";
import annual2 from "@/assets/annual2.jpg";
import annual3 from "@/assets/annualevent.jpg";
import dubai1 from "@/assets/dubai1.jpg";
import dubai2 from "@/assets/dubai2.jpg";
import dubai3 from "@/assets/dubai3.jpg";
import dubai4 from "@/assets/dubai4.jpg";
import import1 from "@/assets/import1.jpg";
import import2  from "@/assets/import2.jpg";
import import3 from "@/assets/import3.jpg";
import import4 from "@/assets/import4.jpg";


export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tag: string;
  image: string;
  featured: boolean;
  readTime: string;
  body: { heading?: string; text: string }[];
  gallery: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: " Calling all Coffee Connoisseurs!",
    excerpt:
      "Ema Coffee, Ethiopia's finest export, is excited to announce our participation in the Speciality Coffee Expo 2024 in Chicago! 🌍☕️ Join us to experience the rich heritage and exquisite flavors of Ethiopian coffee. From the birthplace of coffee to your cup, let's celebrate the artistry and passion behind every sip. ",
    author: "Admin",
    date: "April 12-14, 2024",
    category: "Exports",
    tag: "LinkedIn",
    image: blogImg1,
    featured: true,
    readTime: "5 min read",
    body: [
      {
        text: "Ethiopia sits at the heart of global agricultural trade. With its diverse climate zones — from the cool highlands of Sidama to the sun-drenched lowlands of the Rift Valley — the country produces a remarkable range of commodities that are in high demand across Asia, Europe, and the Americas.",
      },
      {
        heading: "Green Coffee: Ethiopia's Crown Jewel",
        text: "Ethiopian green coffee is widely regarded as the finest in the world. The country is the birthplace of Arabica coffee, and its wild-grown and garden varieties carry flavor profiles that no other origin can replicate. Floral, fruity, and complex — Ethiopian coffee commands premium prices on international markets.",
      },
      {
        heading: "Sesame Seeds & Pulses",
        text: "Beyond coffee, Ethiopia is one of Africa's largest exporters of sesame seeds, Niger seeds, and a variety of pulses including chickpeas, lentils, and haricot beans. These commodities are essential ingredients in food industries worldwide, from tahini production in the Middle East to health food markets in Europe.",
      },
      {
        heading: "EMA's Role in the Supply Chain",
        text: "EMA Ethiopia acts as a trusted bridge between Ethiopian farmers and global buyers. We handle sourcing, quality control, processing, and logistics — ensuring every shipment meets international standards. Our relationships with local cooperatives and the Ethiopian Commodity Exchange (ECX) give us unmatched access to the best produce the country has to offer.",
      },
      {
        text: "As global demand for ethically sourced, traceable agricultural products grows, Ethiopia's position as a premier exporter only strengthens. EMA is proud to be at the forefront of this story — connecting the world to the richness of Ethiopian soil.",
      },
    ],
    gallery: [photoBirthplace, photoHome, photoSpeciality, photoCafeShow],
  },
  {
    id: 2,
    title: "Appreciation Certificate from Addis International Bank",
    excerpt:
      "Appreciation of our exceptional contribution to the success of the Bank in generating foreign currency through Export.",
    author: "Admin",
    date: "March 07, 2024",
    category: "Events",
    tag: "LinkedIn",
    image: blogImg2,
    featured: false,
    readTime: "4 min read",
    body: [
      {
        text: "The International Cafe Show in Seoul is one of the most prestigious coffee events in the world. Every year, thousands of industry professionals, roasters, baristas, and buyers gather to celebrate the art and science of coffee. EMA Ethiopia was proud to participate in the 2024 edition.",
      },
      {
        heading: "Showcasing Ethiopian Excellence",
        text: "Our booth featured a curated selection of single-origin green coffees from Yirgacheffe, Guji, and Sidama. Visitors had the opportunity to taste freshly brewed samples and learn about the unique terroir that gives Ethiopian coffee its legendary character.",
      },
      {
        heading: "Connecting with Global Buyers",
        text: "The Cafe Show is more than a showcase — it's a marketplace. We held productive meetings with roasters and importers from Japan, South Korea, Germany, and the United States. These connections translate directly into long-term partnerships that benefit Ethiopian farmers and the broader supply chain.",
      },
      {
        heading: "The Future of Specialty Coffee",
        text: "One of the most exciting themes at this year's show was the growing consumer demand for transparency and traceability. Buyers want to know exactly where their coffee comes from, how it was processed, and who grew it. EMA's farm-to-port documentation and direct sourcing model positions us perfectly to meet this demand.",
      },
      {
        text: "We left Seoul energized and inspired. The global coffee community's passion for quality and sustainability aligns perfectly with EMA's mission. We look forward to returning next year with even more to share.",
      },
    ],
    gallery: [award, award2, award1,],
  },
  {
    id: 3,
    title: "The World Biggest Annual F&B Event",
    excerpt:
      "We are pleased to inform you that we will be participating in Gulfood Feb 19-Feb 23, 2024 the world's leading food and beverage trade ,offering a prime opportunity to showcase our products and connect with industry leaders from around the world.",
    author: "Admin",
    date: "Feburary 19-23, 2024",
    category: "Company",
    tag: "LinkedIn",
    image: blogImg3,
    featured: false,
    readTime: "3 min read",
    body: [
      {
        text: "When we founded EMA Ethiopia, we had a simple but powerful vision: to build a company that creates real value — for our customers, our partners, and the communities we work with. Over the years, that vision has grown into something much larger than we imagined.",
      },
      {
        heading: "A Community of Excellence",
        text: "Today, EMA serves over 300 loyal customers across multiple continents. Our portfolio spans more than 70 high-quality products — from agricultural exports like green coffee and sesame seeds to pharmaceutical and medical equipment imports. Each product line reflects our commitment to quality and reliability.",
      },
      {
        heading: "People at the Core",
        text: "Behind every shipment is a team of dedicated professionals — agronomists, logistics specialists, quality control experts, and customer service representatives — all working together to ensure your experience with EMA is seamless. We invest heavily in our people because we know that's where true excellence begins.",
      },
      {
        heading: "Building for the Long Term",
        text: "We don't chase short-term gains. Our business model is built on long-term relationships, transparent communication, and consistent delivery. When you partner with EMA, you're not just getting a supplier — you're gaining a partner who is invested in your success.",
      },
      {
        text: "We're proud of what we've built, and we're just getting started. Thank you to every customer, partner, and team member who has been part of this journey.",
      },
    ],
    gallery: [annual1, annual2, annual3],
  },
  {
    id: 4,
    title: "World of Coffee Dubai",
    excerpt:
      "Excited to immerse our in the rich world of coffee at the Dubai World of Coffee 2024 exhibition! ☕️ Join us as we explore the latest trends, innovations, and indulge in the aromatic journey of all things coffee. Let's sip, savor, and share the brewtiful experience together!",
    author: "Admin",
    date: "January 21-23, 2024",
    category: "Imports",
    tag: "LinkedIn",
    image: blogImg4,
    featured: false,
    readTime: "5 min read",
    body: [
      {
        text: "Ethiopia's healthcare sector is undergoing a significant transformation. With a growing population, expanding urban centers, and increased government investment in public health infrastructure, the demand for quality pharmaceutical products and medical equipment has never been higher.",
      },
      {
        heading: "EMA's Import Division",
        text: "Recognizing this opportunity, EMA Ethiopia established a dedicated import division focused on sourcing and distributing pharmaceutical products and medical equipment from leading global manufacturers. Our partnerships with certified suppliers in Europe and Asia ensure that the products we bring to Ethiopia meet the highest international standards.",
      },
      {
        heading: "What We Import",
        text: "Our import portfolio includes diagnostic equipment, surgical instruments, laboratory supplies, and a range of pharmaceutical products. Each item is carefully vetted for quality, regulatory compliance, and suitability for the Ethiopian healthcare environment.",
      },
      {
        heading: "Navigating Regulatory Requirements",
        text: "Importing medical products into Ethiopia requires navigating a complex regulatory landscape. EMA's experienced compliance team works closely with the Ethiopian Food and Drug Authority (EFDA) to ensure all imports are properly registered, documented, and cleared for distribution.",
      },
      {
        text: "By bridging the gap between global medical innovation and local healthcare needs, EMA is contributing to a healthier Ethiopia. We believe that access to quality healthcare products is a fundamental right, and we're committed to making that a reality.",
      },
    ],
    gallery: [dubai2, dubai1, dubai3, dubai4],
  },
  {
    id: 5,
    title: "EMA Import Export We believe in quality!",
    excerpt:
      "From the picturesque coffee farms to your cup, we are committed to bringing you the finest quality coffee beans sourced directly from passionate farmers around Ethiopia. ✅✨ Why choose our coffee? 🌿 We carefully select only the highest quality beans that are sustainably grown, hand-picked, and expertly processed. 🌍 Our direct trade relationships ensure fair prices for farmers and support local communities. 🌱 We prioritize organic and ethically sourced coffee, so you can enjoy your cup with a clear conscience. ",
    author: "Admin",
    date: "August 20, 2024",
    category: "Coffee Origins",
    tag: "LinkedIn",
    image: blogImg5,
    featured: false,
    readTime: "4 min read",
    body: [
      {
        text: "There's a reason coffee lovers around the world seek out Ethiopian beans above all others. It's not just the flavor — though that is extraordinary — it's the story. Every cup of Ethiopian coffee carries thousands of years of history, culture, and tradition.",
      },
      {
        heading: "The Highlands That Make the Difference",
        text: "Ethiopian coffee is grown at elevations between 1,500 and 2,200 meters above sea level. This altitude, combined with rich volcanic soil and a perfect balance of rainfall and sunshine, creates growing conditions that are simply unmatched anywhere else on earth. The result is a bean with natural complexity that roasters love to work with.",
      },
      {
        heading: "Flavor Profiles Worth Waking Up For",
        text: "Yirgacheffe coffees are known for their bright acidity and floral notes — jasmine, bergamot, and lemon zest. Sidama beans offer a fuller body with stone fruit and chocolate undertones. Guji coffees are prized for their winey, berry-forward character. Each region tells a different story in the cup.",
      },
      {
        heading: "From Farm to Your Roastery",
        text: "EMA sources directly from smallholder farmers and cooperatives across Ethiopia's premier coffee-growing regions. Our green beans are carefully sorted, processed — either washed or natural — and packed to preserve freshness during transit. We provide full traceability documentation so your customers know exactly where their coffee comes from.",
      },
      {
        text: "Whether you're a specialty roaster looking for your next single-origin offering or a large-scale buyer seeking consistent supply, EMA has the Ethiopian coffee you're looking for. Wake up and taste the difference.",
      },
    ],
    gallery: [import1,import2,import3,import4],
  },
  {
    id: 6,
    title: "How Technology Is Changing the Workplace",
    excerpt:
      "The impact of technology on the workplace continues to evolve — how EMA Ethiopia leverages digital tools, quality tracking systems, and data-driven logistics for a smarter supply chain.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Industry",
    tag: "LinkedIn",
    image: blogImg6,
    featured: false,
    readTime: "4 min read",
    body: [
      {
        text: "The agricultural export industry has traditionally been slow to adopt technology. But that's changing rapidly, and EMA Ethiopia is leading the charge in our sector. From digital quality tracking to data-driven logistics, technology is transforming how we operate — and the results speak for themselves.",
      },
      {
        heading: "Digital Quality Control",
        text: "We've implemented a digital quality management system that tracks every lot of coffee and agricultural produce from the point of purchase through processing, grading, and export. This system generates real-time data on moisture content, defect rates, and cup quality scores — giving our buyers unprecedented visibility into the products they're purchasing.",
      },
      {
        heading: "Smarter Logistics",
        text: "Our logistics team uses data analytics to optimize shipping routes, container utilization, and delivery timelines. By analyzing historical shipping data and market conditions, we can anticipate bottlenecks and proactively manage our supply chain to ensure on-time delivery.",
      },
      {
        heading: "Communication and Collaboration",
        text: "Technology has also transformed how we communicate with our global network of buyers and suppliers. Digital platforms enable real-time communication, document sharing, and contract management — reducing the friction that used to slow down international trade.",
      },
      {
        text: "The future of agricultural trade is digital, and EMA is building the infrastructure to thrive in that future. We're investing in technology not just to improve our own operations, but to create better outcomes for everyone in our supply chain.",
      },
    ],
    gallery: [photoHome, photoCafeShow, photoBirthplace, photoSpeciality],
  },
  {
    id: 7,
    title: "Arabica vs. Robusta: What's the Difference?",
    excerpt:
      "Arabica vs. Robusta: the two titans of the coffee world. We break down the key differences in flavor, growing conditions, caffeine content, and why Ethiopian Arabica stands apart.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Coffee Origins",
    tag: "LinkedIn",
    image: blogImg7,
    featured: false,
    readTime: "5 min read",
    body: [
      {
        text: "If you've spent any time in the coffee world, you've heard the debate: Arabica vs. Robusta. These two species dominate global coffee production, but they couldn't be more different. Understanding the distinction is key to appreciating why Ethiopian Arabica is so highly prized.",
      },
      {
        heading: "Arabica: The Refined Choice",
        text: "Coffea arabica accounts for about 60% of global coffee production. It grows best at high altitudes in tropical climates and is known for its nuanced flavor profiles — floral, fruity, and acidic with a smooth finish. Arabica beans contain less caffeine than Robusta, which contributes to their more delicate taste.",
      },
      {
        heading: "Robusta: The Bold Alternative",
        text: "Coffea canephora, commonly known as Robusta, is hardier and more disease-resistant than Arabica. It grows at lower altitudes and produces a higher yield. Robusta beans have nearly twice the caffeine content of Arabica and deliver a stronger, more bitter flavor with an earthy, woody character. It's widely used in espresso blends and instant coffee.",
      },
      {
        heading: "Why Ethiopian Arabica Stands Apart",
        text: "Ethiopia is the genetic homeland of Arabica coffee. The country's wild coffee forests contain thousands of naturally occurring varieties that have evolved over millennia. This genetic diversity gives Ethiopian Arabica a complexity and range of flavors that cultivated varieties elsewhere simply cannot match. When you drink Ethiopian coffee, you're tasting the original.",
      },
      {
        text: "At EMA, we work exclusively with Ethiopian Arabica. Our sourcing focuses on the regions and processing methods that best express the unique character of each origin — because we believe the world deserves to experience coffee at its finest.",
      },
    ],
    gallery: [photoBirthplace, photoSpeciality, photoCafeShow, photoHome],
  },
  {
    id: 8,
    title: "Ethiopia, the Birthplace of Coffee",
    excerpt:
      "Ethiopia, the birthplace of coffee, offers beans with rich flavors and unique profiles unlike anywhere else on earth. From Yirgacheffe to Sidama, every cup tells a story of ancient tradition.",
    author: "EMA Ethiopia",
    date: "August 20, 2022",
    category: "Coffee Origins",
    tag: "LinkedIn",
    image: blogImg8,
    featured: false,
    readTime: "6 min read",
    body: [
      {
        text: "The story of coffee begins in Ethiopia. According to legend, a goat herder named Kaldi first noticed the energizing effects of coffee when his goats ate berries from a certain tree and became so lively they didn't sleep at night. Whether or not the legend is true, the science is clear: Ethiopia is the genetic origin of Coffea arabica, the species that produces the world's finest coffee.",
      },
      {
        heading: "A Land of Coffee Diversity",
        text: "Ethiopia's coffee-growing regions are extraordinarily diverse. The country is home to thousands of wild and semi-wild coffee varieties, many of which have never been formally catalogued. This genetic richness is a global treasure — it's the foundation upon which the entire specialty coffee industry is built.",
      },
      {
        heading: "Yirgacheffe: The Jewel of Ethiopian Coffee",
        text: "Yirgacheffe is perhaps the most famous coffee-growing region in the world. Located in the Gedeo Zone of southern Ethiopia, it produces coffees with an unmistakable brightness and floral complexity. Washed Yirgacheffe coffees are celebrated for their jasmine and bergamot notes, while natural-processed beans offer intense blueberry and tropical fruit flavors.",
      },
      {
        heading: "Sidama and Guji: Rising Stars",
        text: "Sidama and Guji have emerged as premier origins in their own right. Sidama coffees are known for their full body and stone fruit character, while Guji beans — grown in the forests of the Oromia region — offer a winey, berry-forward profile that has captivated specialty roasters worldwide.",
      },
      {
        heading: "Preserving the Heritage",
        text: "EMA Ethiopia is committed to preserving and celebrating this extraordinary coffee heritage. We work with farmers who practice traditional cultivation methods, maintaining the biodiversity of Ethiopia's coffee forests while ensuring fair compensation for their labor.",
      },
      {
        text: "When you source Ethiopian coffee through EMA, you're not just buying a commodity — you're participating in a story that stretches back thousands of years. That's a responsibility we take seriously, and a privilege we're grateful for every day.",
      },
    ],
    gallery: [photoBirthplace, photoHome, photoCafeShow, photoSpeciality],
  },
  {
    id: 9,
    title: "Adding Value to Every Bean",
    excerpt:
      "We don't just export coffee — we ensure each bean is handled with care, from farm to container. EMA's rigorous quality control process guarantees consistency and excellence across every shipment.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Quality",
    tag: "LinkedIn",
    image: blogImg9,
    featured: false,
    readTime: "4 min read",
    body: [
      {
        text: "In the coffee export business, quality is everything. A single substandard shipment can damage a relationship that took years to build. That's why EMA Ethiopia has invested heavily in building a quality control infrastructure that is second to none in the Ethiopian market.",
      },
      {
        heading: "The Journey of a Bean",
        text: "Every lot of coffee that passes through EMA's hands goes through a rigorous multi-stage quality control process. It begins at the farm level, where our agronomists assess the health of the crop and the quality of the harvest. From there, the coffee moves to our processing facility, where it is sorted, graded, and cupped by our team of certified Q Graders.",
      },
      {
        heading: "Cupping: The Art of Quality Assessment",
        text: "Cupping is the industry-standard method for evaluating coffee quality. Our Q Graders assess each lot on a range of parameters — fragrance, aroma, flavor, aftertaste, acidity, body, balance, and overall impression. Only lots that meet our minimum score threshold are approved for export.",
      },
      {
        heading: "Packaging and Preservation",
        text: "Once approved, coffee is packed in GrainPro or vacuum-sealed bags to preserve freshness during transit. We use only food-grade, moisture-resistant packaging materials, and every bag is clearly labeled with origin, processing method, grade, and lot number for full traceability.",
      },
      {
        text: "Quality is not a department at EMA — it's a culture. Every member of our team, from the warehouse staff to the logistics coordinators, understands that their work directly impacts the quality of the product that reaches our customers. That shared commitment is what sets EMA apart.",
      },
    ],
    gallery: [photoSpeciality, photoBirthplace, photoHome, photoCafeShow],
  },
];

export const categories = [
  "All",
  "Coffee Origins",
  "Events",
  "Company",
  "Imports",
  "Exports",
  "Quality",
  "Industry",
];
