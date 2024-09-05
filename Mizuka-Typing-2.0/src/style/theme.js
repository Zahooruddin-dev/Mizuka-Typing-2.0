const lightTheme = {
  label: "Light",
  background: "#F5F5F5",
  text: "#000000",
  gradient: "linear-gradient(315deg, #74ebd5 0%, #ACB6E5 94%)",
  title: "#2979ff",
  textTypeBox: "#9E9E9E",
  stats: "#3D5AFE",
  fontFamily: "sans-serif",
};

const Retro = {
  label: "Retro",
  background: "#011628",
  text: "#CBE0F0",
  gradient: "linear-gradient(315deg, #F7971E 0%, #FFD200 94%)",
  title: "#ff9e64",
  textTypeBox: "#547998",
  stats: "#B4D0E9",
  fontFamily: "sans-serif",
};

const darkTheme = {
  label: "Dark",
  background: "#121212",
  text: "#FAFAFA",
  gradient: "linear-gradient(315deg, #F7971E 0%, #FFD200 94%)",
  title: "#1dbfba",
  textTypeBox: "#148c89",
  stats: "#148c89",
  fontFamily: "sans-serif",
};


const cyberTheme = {
  label: "Cyber",
  background: "#272932",
  text: "#CB1DCD",
  gradient: "linear-gradient(315deg, #FDF500 0%, #CB1DCD 94%)",
  title: "#FDF500",
  textTypeBox: "#D1C5C0",
  stats: "#00ff9f",
  fontFamily: "Tomorrow",
};

const elegant = {
  label: "Araki Nobuyoshi",
  background: "#232335",
  text: "#086063",
  gradient: "linear-gradient(90deg, 	#232335 0%, #0a4951 100%)",
  title: "#B42D2C",
  textTypeBox: "#CCB1B0",
  stats: "#1a5426",
  fontFamily: "sans-serif",
};

const bloodTheme = {
  label: "blood",
  background: "#440402",
  text: "#3A3E47",
  gradient: "linear-gradient(90deg, 	#70A960 0%, #76C9A5 100%)",
  title: "#B80100",
  textTypeBox: "#CD6A5A",
  stats: "#6A839D",
  fontFamily: "sans-serif",
};

const metalic = {
  label: "metalic",
  background: "linear-gradient(to left top, rgba(0, 0, 0, 0.25),  #888B8D)",
  text: "#353535",
  gradient: "linear-gradient(90deg, #888B8D 0%, #FAF9F6 100%)",
  title: "#2f2f2f",
  textTypeBox: "#FAF9F6",
  stats: "#2D3436",
  fontFamily: "Rufina",
  textShadow: "0px -1px 0px rgba(0,0,0,0.3)",
};

const pianoTheme = {
  label: "Piano",
  background: "linear-gradient(to bottom,  #000, #222)",
  text: "#FAF9F6",
  gradient: "linear-gradient(90deg, #000 0%, #222 100%)",
  title: "#f5f2e7",
  textTypeBox: "#555",
  stats: "#FAF9F6",
  fontFamily: "Rufina",
  textShadow: "0px -1px 0px rgba(0,0,0,0.3)",
};



const defaultTheme = darkTheme;

const themesOptions = [
  { value: darkTheme, label: "Dark" },
  { value: Retro, label: "Retro" },
  { value: metalic, label: "Metalic" },
  { value: pianoTheme, label: "Piano" },
  { value: cyberTheme, label: "Cyber" },
  { value: elegant, label: "Elegant" },
  { value: bloodTheme, label: "blood" },
  { value: lightTheme, label: "Bright" },
];

export {
  lightTheme,
  darkTheme,
  cyberTheme,
  elegant,
  bloodTheme,
  metalic,
  pianoTheme,
  defaultTheme,
  themesOptions,
  Retro,
};
