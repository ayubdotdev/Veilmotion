import { BlinkingDotsComponent, DotNetworkComponent, DotNetworkComponentv2, FadeDotComponent, MovingDotsComponent ,WavyDots} from "@/bgs/Dots";
import  {    CyberpunkHologramComponent, DesertMirageComponent, FireflyForestComponent,  NightSakuraComponent, OceanGlowComponent, SmoothRainComponent, SnowAuroraComponent, VolcanicEmberStormComponent } from "@/bgs/Effects";
import {  FloatingParticles, GlowingParticles, ParticlesBackgroundComponent,  } from "@/bgs/Dots";
import { AnimatedBlackGridBackground, CoolBlueGrid, CyanBurstGrid, DarkBg, GreenPunchGrid, LimeFadeGrid, MagentaFlame, MagentaGrid, NeonShock, ToxicPulse, VioletMistGrid, WarmAmberGrid } from "@/bgs/Geometrics";
import { CyanGradient, CyanGradientBlack, CyanGradientBlackTop, CyanGradientTop, FuchsiaGradient, FuchsiaGradientBlack, FuchsiaGradientBlackTop, FuchsiaGradientTop, PurpleGradient, PurpleGradientBlack, PurpleGradientBlackTop, PurpleGradientTop, RedGradient, RedGradientBlack, RedGradientBlackTop, RedGradientTop, TealGradient, TealGradientBlack, TealGradientBlackTop, TealGradientTop, } from "@/bgs/Gradients";


export const PatternComponents: Record<string, React.FC> = {


  //gradientrs
  "indigo-gradient-v1": PurpleGradient,
  "indigo-gradient-v2": PurpleGradientTop,
  "indigo-gradient-black-v1": PurpleGradientBlackTop,
  "indigo-gradient-black-v2": PurpleGradientBlack,

  "teal-gradient-v1": TealGradient,
  "teal-gradient-v2": TealGradientTop,
  "teal-gradient-black-v1": TealGradientBlackTop,
  "teal-gradient-black-v2": TealGradientBlack,

  "cyan-gradient-v1": CyanGradient,
  "cyan-gradient-v2": CyanGradientTop,
  "cyan-gradient-black-v1": CyanGradientBlackTop,
  "cyan-gradient-black-v2": CyanGradientBlack,

  "fuchsia-gradient-v1": FuchsiaGradient,
  "fuchsia-gradient-v2": FuchsiaGradientTop,
  "fuchsia-gradient-black-v1": FuchsiaGradientBlackTop,
  "fuchsia-gradient-black-v2": FuchsiaGradientBlack,

  "red-gradient-v1": RedGradient,
  "red-gradient-v2": RedGradientTop,
  "red-gradient-black-v1": RedGradientBlackTop,
  "red-gradient-black-v2": RedGradientBlack,






  //effects
  "smooth-rain":SmoothRainComponent,
  "smooth-snow":SnowAuroraComponent,
  "cheryy-blossom":NightSakuraComponent,
  "firefly-forest":FireflyForestComponent,
  "desert-mirage":DesertMirageComponent,
  "cyberpunk-cityscape":CyberpunkHologramComponent,
  "ocean-vibes":OceanGlowComponent,
  "volcanic-embers":VolcanicEmberStormComponent,




  //floatings
  "glowing-particles": GlowingParticles,
  "moving-particles": ParticlesBackgroundComponent,
  "floating-particles-v1": FloatingParticles,
  "dots-soft-network": DotNetworkComponent,
  "dots-soft-network-v2": DotNetworkComponentv2,
  "moving-dots": MovingDotsComponent,
  "blinking-dots": BlinkingDotsComponent,
  "fade-dot":FadeDotComponent,
  "wavy-dots":WavyDots,

  //geometrics
  "black-grid": AnimatedBlackGridBackground,
  "dark-grid": DarkBg,
  "magenta-grid":MagentaGrid,
  "warmamber-grid":WarmAmberGrid,
  "coolblue-grid":CoolBlueGrid,
  "cyanburst-grid":CyanBurstGrid,
  "greenpunch-grid":GreenPunchGrid,
  "limefade-grid":LimeFadeGrid,

  "diagonal-grid":VioletMistGrid,
  "magenta-flame-grid":MagentaFlame,
  "neon-lime-grid":NeonShock,
  "toxicpulse-grid":ToxicPulse
 

};
