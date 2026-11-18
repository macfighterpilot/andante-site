import type { StaticImageData } from "next/image";

// Andante's own photos, taken from their public Instagram (@andante.horseriding). Low resolution:
// TODO(andante): replace with the original files from Guia & Zoe.
import beachLunch from "@/assets/images/andante-beach-lunch.jpg";
import starlitDinner from "@/assets/images/andante-starlit-dinner.jpg";
import oliveGroveLunch from "@/assets/images/andante-olive-grove-lunch.jpg";

// PLACEHOLDERS: free-licence photos from Wikimedia Commons (credited in the footer).
// TODO(andante): replace every `placeholder: true` image with Andante's own photography.
import beachGallop from "@/assets/images/ph-beach-gallop-sunset.jpg";
import beachRiders from "@/assets/images/ph-beach-riders.jpg";
import beachSilhouette from "@/assets/images/ph-beach-silhouette.jpg";
import cypressHills from "@/assets/images/ph-cypress-hills.jpg";
import hillsDusk from "@/assets/images/ph-hills-dusk.jpg";
import loneTree from "@/assets/images/ph-lone-tree-sunset.jpg";
import monteriggioni from "@/assets/images/ph-monteriggioni.jpg";
import valDOrcia from "@/assets/images/ph-val-d-orcia-road.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  placeholder: boolean;
  credit: { author: string; license: string; url: string };
};

const andante = (url: string) => ({ author: "Andante · Horseback Experience Designer", license: "© Andante", url });

export const images = {
  beachLunch: {
    src: beachLunch,
    alt: "Guests at a long lunch table on the beach, horses resting behind them",
    placeholder: false,
    credit: andante("https://www.instagram.com/p/DeeY4mHDee9/"),
  },
  starlitDinner: {
    src: starlitDinner,
    alt: "A candlelit dinner table in the countryside at dusk, a horse standing beside it",
    placeholder: false,
    credit: andante("https://www.instagram.com/p/Db_FZ2djOQe/"),
  },
  oliveGroveLunch: {
    src: oliveGroveLunch,
    alt: "A lunch table set under shade sails in an olive grove, a saddled horse waiting",
    placeholder: false,
    credit: andante("https://www.instagram.com/reel/Dc1umtdMcCH/"),
  },
  beachGallop: {
    src: beachGallop,
    alt: "A rider cantering along the Tuscan shore at sunset",
    placeholder: true,
    credit: { author: "Anna.Massini", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Riding_in_winter_on_the_Tuscan_beach_in_Italy.jpg" },
  },
  beachRiders: {
    src: beachRiders,
    alt: "Riders on a wide sandy beach in soft evening light",
    placeholder: true,
    credit: { author: "Anna.Massini", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Cavalcata_di_inizio_anno_sulla_spiaggia_di_Torre_del_Lago_-_Toscana.jpg" },
  },
  beachSilhouette: {
    src: beachSilhouette,
    alt: "Silhouette of a horse and rider on the beach at sunset",
    placeholder: true,
    credit: { author: "Anna.Massini", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Horse_riding_on_the_beach.jpg" },
  },
  cypressHills: {
    src: cypressHills,
    alt: "A grove of cypress trees on rolling Tuscan hills",
    placeholder: true,
    credit: { author: "Carlo Cattaneo", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:I_cipressi_della_Val_D%27Orcia.jpg" },
  },
  hillsDusk: {
    src: hillsDusk,
    alt: "Green Tuscan hills under a pink dusk sky",
    placeholder: true,
    credit: { author: "Fabrizio Lunardi", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Over_The_Hills_And_Far_Away_(229284627).jpeg" },
  },
  loneTree: {
    src: loneTree,
    alt: "A country track leading to a lone tree at sunset",
    placeholder: true,
    credit: { author: "Fabrizio Lunardi", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Alone_In_The_Light_(239104541).jpeg" },
  },
  monteriggioni: {
    src: monteriggioni,
    alt: "The walled hilltop village of Monteriggioni above green fields",
    placeholder: true,
    credit: { author: "WikiRomaWiki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Panorama_of_Monteriggioni.jpg" },
  },
  valDOrcia: {
    src: valDOrcia,
    alt: "A white gravel road winding between cypresses in autumn",
    placeholder: true,
    credit: { author: "Fabrizio Lunardi", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Val_D_Orcia_In_Autumn_(179351679).jpeg" },
  },
} satisfies Record<string, Photo>;

export type ImageKey = keyof typeof images;
